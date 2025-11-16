'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function PaymentPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const stage = (params.stage as string).toUpperCase()
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  const stageInfo: { [key: string]: { name: string; price: number; features: string[] } } = {
    BEGINNER: {
      name: 'Beginner',
      price: 49.99,
      features: [
        'Access to 50+ beginner puzzles',
        'Learn fundamental chess concepts',
        'Opening principles and tactics',
        'Endgame basics',
        'Progress tracking'
      ]
    },
    INTERMEDIATE: {
      name: 'Intermediate',
      price: 99.99,
      features: [
        'Access to 100+ intermediate puzzles',
        'Advanced tactical patterns',
        'Positional understanding',
        'Middlegame strategies',
        'All beginner content included'
      ]
    },
    ADVANCED: {
      name: 'Advanced',
      price: 149.99,
      features: [
        'Access to 150+ advanced puzzles',
        'Master-level tactics',
        'Complex endgames',
        'Opening repertoire building',
        'All previous content included',
        'Priority support'
      ]
    }
  }

  const currentStage = stageInfo[stage] || stageInfo.BEGINNER

  const handlePayment = async () => {
    setProcessing(true)

    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          stage,
          amount: currentStage.price
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error('Payment failed')
      }

      await fetch('/api/payments/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: data.paymentId,
          stage
        })
      })

      setSuccess(true)
      setTimeout(() => {
        router.push('/learn')
      }, 2000)
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#769656]"></div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600">
            You now have access to {currentStage.name} level content. Redirecting to your learning page...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enroll in {currentStage.name} Course
          </h1>
          <p className="text-lg text-gray-600">
            Take your chess skills to the next level
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#769656] to-[#5C1F1C] p-8 text-white">
            <h2 className="text-3xl font-bold mb-2">{currentStage.name} Level</h2>
            <div className="text-5xl font-bold">
              ${currentStage.price}
              <span className="text-xl font-normal"> / one-time</span>
            </div>
          </div>

          <div className="p-8">
            <h3 className="text-xl font-semibold mb-4">What's included:</h3>
            <ul className="space-y-3 mb-8">
              {currentStage.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="border-t pt-6">
              <Button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-[#769656] hover:bg-[#5C1F1C] text-white py-6 text-lg"
              >
                {processing ? 'Processing...' : `Enroll Now for $${currentStage.price}`}
              </Button>
              <p className="text-center text-sm text-gray-500 mt-4">
                * This is a demo. Payment processing is simulated.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
