import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const puzzle = await prisma.puzzle.findUnique({
      where: { id: params.id }
    })

    if (!puzzle) {
      return NextResponse.json(
        { error: 'Puzzle not found' },
        { status: 404 }
      )
    }

    const userStage = session.user.stage
    const accessibleStages = []
    if (userStage === 'BEGINNER') accessibleStages.push('BEGINNER')
    if (userStage === 'INTERMEDIATE') accessibleStages.push('BEGINNER', 'INTERMEDIATE')
    if (userStage === 'ADVANCED') accessibleStages.push('BEGINNER', 'INTERMEDIATE', 'ADVANCED')

    if (!accessibleStages.includes(puzzle.stage)) {
      return NextResponse.json(
        { error: 'Access denied. Upgrade your stage to access this puzzle.' },
        { status: 403 }
      )
    }

    return NextResponse.json(puzzle)
  } catch (error) {
    console.error('Error fetching puzzle:', error)
    return NextResponse.json(
      { error: 'Failed to fetch puzzle' },
      { status: 500 }
    )
  }
}
