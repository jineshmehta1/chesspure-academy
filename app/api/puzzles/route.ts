import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { searchParams } = new URL(req.url)
    const stage = searchParams.get('stage')

    const where = stage ? { stage: stage as any } : {}

    const puzzles = await prisma.puzzle.findMany({
      where,
      orderBy: [{ stage: 'asc' }, { order: 'asc' }]
    })

    if (session?.user) {
      const progress = await prisma.progress.findMany({
        where: { userId: session.user.id }
      })

      const puzzlesWithProgress = puzzles.map((puzzle: any) => ({
        ...puzzle,
        userProgress: progress.find((p: any) => p.puzzleId === puzzle.id)
      }))

      return NextResponse.json(puzzlesWithProgress)
    }

    return NextResponse.json(puzzles)
  } catch (error) {
    console.error('Error fetching puzzles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch puzzles' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      )
    }

    const data = await req.json()
    const { title, description, fen, solution, stage, difficulty, category, order } = data

    const puzzle = await prisma.puzzle.create({
      data: {
        title,
        description,
        fen,
        solution,
        stage,
        difficulty: difficulty || 1,
        category,
        order: order || 0
      }
    })

    return NextResponse.json(puzzle, { status: 201 })
  } catch (error) {
    console.error('Error creating puzzle:', error)
    return NextResponse.json(
      { error: 'Failed to create puzzle' },
      { status: 500 }
    )
  }
}
