import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-10-29.clover'
})

const DEMO_MODE = process.env.DEMO_MODE === 'true'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { paymentId } = await req.json()

    const payment = await prisma.payment.findUnique({
      where: { id: paymentId }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    if (payment.userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Unauthorized - payment belongs to different user' },
        { status: 403 }
      )
    }

    if (payment.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Payment already processed' },
        { status: 400 }
      )
    }

    if (!payment.stripePaymentId) {
      return NextResponse.json(
        { error: 'Invalid payment - no Stripe reference' },
        { status: 400 }
      )
    }

    if (!DEMO_MODE) {
      try {
        const paymentIntent = await stripe.paymentIntents.retrieve(
          payment.stripePaymentId
        )

        if (paymentIntent.status !== 'succeeded') {
          return NextResponse.json(
            { error: 'Payment not completed. Please complete the payment before accessing content.' },
            { status: 400 }
          )
        }

        if (paymentIntent.metadata.userId !== session.user.id) {
          return NextResponse.json(
            { error: 'Payment user mismatch' },
            { status: 403 }
          )
        }
      } catch (error) {
        console.error('Error verifying payment with Stripe:', error)
        return NextResponse.json(
          { error: 'Failed to verify payment with Stripe' },
          { status: 500 }
        )
      }
    }

    const purchasedStage = payment.stage

    await prisma.$transaction(async (tx: any) => {
      await tx.payment.update({
        where: { id: paymentId },
        data: { status: 'COMPLETED' }
      })

      await tx.enrollment.upsert({
        where: {
          userId_stage: {
            userId: session.user.id,
            stage: purchasedStage
          }
        },
        update: {},
        create: {
          userId: session.user.id,
          stage: purchasedStage
        }
      })

      let newUserStage = session.user.stage
      if (purchasedStage === 'BEGINNER' && newUserStage === 'NONE') {
        newUserStage = 'BEGINNER'
      } else if (purchasedStage === 'INTERMEDIATE' && (newUserStage === 'NONE' || newUserStage === 'BEGINNER')) {
        newUserStage = 'INTERMEDIATE'
      } else if (purchasedStage === 'ADVANCED') {
        newUserStage = 'ADVANCED'
      }

      await tx.user.update({
        where: { id: session.user.id },
        data: { stage: newUserStage }
      })
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
