import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized. Please sign in to access puzzles.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const requestedStage = searchParams.get('stage')
    const userStage = session.user.stage

    const accessibleStages = []
    if (userStage === 'BEGINNER') accessibleStages.push('BEGINNER')
    if (userStage === 'INTERMEDIATE') accessibleStages.push('BEGINNER', 'INTERMEDIATE')
    if (userStage === 'ADVANCED') accessibleStages.push('BEGINNER', 'INTERMEDIATE', 'ADVANCED')

    if (requestedStage && !accessibleStages.includes(requestedStage)) {
      return NextResponse.json(
        { error: 'Access denied. Upgrade your stage to access this content.' },
        { status: 403 }
      )
    }

    const where = requestedStage 
      ? { stage: requestedStage as any }
      : { stage: { in: accessibleStages } }

    const puzzles = await prisma.puzzle.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        stage: true,
        difficulty: true,
        category: true,
        order: true,
        fen: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: [{ stage: 'asc' }, { order: 'asc' }]
    })

    const progress = await prisma.progress.findMany({
      where: { userId: session.user.id }
    })

    const puzzlesWithProgress = puzzles.map((puzzle: any) => ({
      ...puzzle,
      userProgress: progress.find((p: any) => p.puzzleId === puzzle.id)
    }))

    return NextResponse.json(puzzlesWithProgress)
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
