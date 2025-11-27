'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Lock, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Puzzle {
  id: string
  title: string
  description: string | null
  stage: string
  difficulty: number
  category: string | null
  userProgress?: {
    completed: boolean
    attempts: number
  }
}

export default function LearnPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [puzzles, setPuzzles] = useState<Puzzle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    }
  }, [status, router])

  useEffect(() => {
    fetchPuzzles()
  }, [])

  const fetchPuzzles = async () => {
    try {
      const response = await fetch('/api/puzzles')
      const data = await response.json()
      setPuzzles(data)
    } catch (error) {
      console.error('Error fetching puzzles:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#769656] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const userStage = session.user.stage
  const stages = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED']
  
  const stageData = stages.map(stage => {
    const stagePuzzles = puzzles.filter(p => p.stage === stage)
    
    let hasAccess = false
    if (userStage === 'BEGINNER' && stage === 'BEGINNER') hasAccess = true
    if (userStage === 'INTERMEDIATE' && (stage === 'BEGINNER' || stage === 'INTERMEDIATE')) hasAccess = true
    if (userStage === 'ADVANCED') hasAccess = true
    
    return {
      name: stage.charAt(0) + stage.slice(1).toLowerCase(),
      stage,
      puzzles: stagePuzzles,
      hasAccess,
      locked: !hasAccess
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-30 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Learning Journey</h1>
          <p className="text-lg text-gray-600">
            Current Stage: <span className="font-semibold text-[#769656]">{userStage === 'NONE' ? 'Not Enrolled' : userStage.charAt(0) + userStage.slice(1).toLowerCase()}</span>
          </p>
        </div>

        {userStage === 'NONE' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Ready to Start Learning?</h3>
            <p className="text-yellow-700 mb-4">
              Enroll in the Beginner course to access your first lessons and puzzles.
            </p>
            <Link href="/payment/beginner">
              <Button className="bg-[#769656] hover:bg-[#5C1F1C]">
                Enroll in Beginner Course
              </Button>
            </Link>
          </div>
        )}

        {stageData.map((stageInfo) => (
          <div key={stageInfo.stage} className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                {stageInfo.name}
                {stageInfo.locked && <Lock className="h-5 w-5 text-gray-400" />}
              </h2>
              <Link href={`/payment/${stageInfo.stage.toLowerCase()}`}>
                <Button 
                  variant={stageInfo.hasAccess ? "outline" : "default"}
                  className={!stageInfo.hasAccess ? "bg-[#769656] hover:bg-[#5C1F1C]" : ""}
                  disabled={stageInfo.hasAccess}
                >
                  {stageInfo.hasAccess ? 'Enrolled' : `Enroll in ${stageInfo.name}`}
                </Button>
              </Link>
            </div>

            {stageInfo.puzzles.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center text-gray-500">
                No puzzles available in this stage yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {stageInfo.puzzles.map((puzzle) => (
                  <div
                    key={puzzle.id}
                    className={`bg-white rounded-lg overflow-hidden shadow-md transition-all ${
                      stageInfo.locked 
                        ? 'opacity-60 cursor-not-allowed' 
                        : 'hover:shadow-lg cursor-pointer'
                    }`}
                  >
                    <div className="relative h-48 bg-gradient-to-br from-[#769656] to-[#eeeed2]">
                      <div className="absolute inset-0 flex items-center justify-center">
                        {stageInfo.locked ? (
                          <Lock className="h-16 w-16 text-white opacity-50" />
                        ) : puzzle.userProgress?.completed ? (
                          <CheckCircle className="h-16 w-16 text-green-500" />
                        ) : (
                          <div className="text-white text-6xl">♟</div>
                        )}
                      </div>
                      {puzzle.category && (
                        <div className="absolute top-2 left-2 bg-white/90 px-3 py-1 rounded-full text-xs font-semibold">
                          {puzzle.category}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2">{puzzle.title}</h3>
                      {puzzle.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {puzzle.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          Difficulty: {puzzle.difficulty}/10
                        </span>
                        {puzzle.userProgress && (
                          <span className="text-xs text-gray-500">
                            Attempts: {puzzle.userProgress.attempts}
                          </span>
                        )}
                      </div>
                      {stageInfo.hasAccess && (
                        <Link href={`/puzzle/${puzzle.id}`}>
                          <Button className="w-full mt-4 bg-[#769656] hover:bg-[#5C1F1C]">
                            {puzzle.userProgress?.completed ? 'Review' : 'Start'}
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
