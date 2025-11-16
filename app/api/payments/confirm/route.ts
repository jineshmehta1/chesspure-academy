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

    const { paymentId, stage } = await req.json()

    await prisma.$transaction(async (tx: any) => {
      await tx.payment.update({
        where: { id: paymentId },
        data: { status: 'COMPLETED' }
      })

      await tx.enrollment.upsert({
        where: {
          userId_stage: {
            userId: session.user.id,
            stage
          }
        },
        update: {},
        create: {
          userId: session.user.id,
          stage
        }
      })

      if (stage === 'BEGINNER') {
        await tx.user.update({
          where: { id: session.user.id },
          data: { stage: 'BEGINNER' }
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error confirming payment:', error)
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}
