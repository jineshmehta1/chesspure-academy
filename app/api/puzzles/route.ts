import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Chess } from 'chess.js'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user)
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const requestedStage = searchParams.get('stage')
  const userStage = (session.user as any).stage || 'BEGINNER'

  const access = {
    BEGINNER: ['BEGINNER'],
    INTERMEDIATE: ['BEGINNER', 'INTERMEDIATE'],
    ADVANCED: ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
  }

  const allowed = access[userStage] || ['BEGINNER']

  if (requestedStage && !allowed.includes(requestedStage))
    return NextResponse.json({ error: 'Access denied' }, { status: 403 })

  const puzzles = await prisma.puzzle.findMany({
    where: requestedStage ? { stage: requestedStage } : { stage: { in: allowed } },
    orderBy: [{ stage: 'asc' }, { order: 'asc' }]
  })

  const progress = await prisma.progress.findMany({
    where: { userId: (session.user as any).id }
  })

  // ✅ Return long-algebraic moves (e2e4 e7e5 ...)
  const result = puzzles.map(puzzle => {
    const moves = puzzle.solution?.trim()
      ? puzzle.solution.trim().split(/\s+/).filter(Boolean)
      : []

    return {
      ...puzzle,
      moves, // always consistent format
      userProgress: progress.find(p => p.puzzleId === puzzle.id) || null
    }
  })

  return NextResponse.json(result)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session || (session.user as any).role !== 'ADMIN')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })

  const { title, fen, solution, stage, category = null } = await req.json()

  if (!title || !fen || !solution || !stage)
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })

  // Validate moves, convert SAN → long algebraic
  const game = new Chess(fen)
  const moves = solution.trim().split(/\s+/).filter(Boolean)
  const validMoves: string[] = []

  for (const move of moves) {
    const m = game.move(move, { sloppy: true })
    if (!m)
      return NextResponse.json({ error: `Illegal move: ${move}` }, { status: 400 })

    // Store long-algebraic moves: "e2e4", "g8f6", including promotion if any
    validMoves.push(m.from + m.to + (m.promotion || ''))
  }

  if (validMoves.length === 0)
    return NextResponse.json({ error: 'Solution empty' }, { status: 400 })

  const puzzle = await prisma.puzzle.create({
    data: {
      title: title.trim(),
      fen: fen.trim(),
      solution: validMoves.join(' '), // store long algebraic
      stage,
      category
    }
  })

  return NextResponse.json({ ...puzzle, moves: validMoves }, { status: 201 })
}
