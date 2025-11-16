import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { puzzleId, completed } = await req.json()

    const progress = await prisma.progress.upsert({
      where: {
        userId_puzzleId: {
          userId: session.user.id,
          puzzleId
        }
      },
      update: {
        completed,
        attempts: { increment: 1 },
        lastAttempt: new Date()
      },
      create: {
        userId: session.user.id,
        puzzleId,
        completed,
        attempts: 1,
        lastAttempt: new Date()
      }
    })

    return NextResponse.json(progress)
  } catch (error) {
    console.error('Error updating progress:', error)
    return NextResponse.json(
      { error: 'Failed to update progress' },
      { status: 500 }
    )
  }
}
