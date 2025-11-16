'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { Button } from '@/components/ui/button'
import { ArrowLeft, CheckCircle, XCircle } from 'lucide-react'

export default function PuzzlePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const [puzzle, setPuzzle] = useState<any>(null)
  const [game, setGame] = useState<Chess | null>(null)
  const [fen, setFen] = useState('')
  const [result, setResult] = useState<'correct' | 'incorrect' | null>(null)
  const [hint, setHint] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchPuzzle()
    }
  }, [status])

  const fetchPuzzle = async () => {
    try {
      const response = await fetch(`/api/puzzles/${params.id}/details`)
      
      if (!response.ok) {
        if (response.status === 403) {
          alert('You do not have access to this puzzle. Please upgrade your stage.')
          router.push('/learn')
          return
        }
        throw new Error('Failed to fetch puzzle')
      }
      
      const currentPuzzle = await response.json()
      
      setPuzzle(currentPuzzle)
      const chessGame = new Chess(currentPuzzle.fen)
      setGame(chessGame)
      setFen(currentPuzzle.fen)
    } catch (error) {
      console.error('Error fetching puzzle:', error)
    } finally {
      setLoading(false)
    }
  }

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (!game || result) return false

    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })

      if (move === null) return false

      const newFen = game.fen()
      setFen(newFen)

      const moveNotation = `${sourceSquare}${targetSquare}`
      if (puzzle.solution.includes(moveNotation)) {
        setResult('correct')
        updateProgress(true)
      } else {
        setResult('incorrect')
        updateProgress(false)
      }

      return true
    } catch (error) {
      return false
    }
  }

  const updateProgress = async (completed: boolean) => {
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          puzzleId: params.id,
          completed
        })
      })
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const resetPuzzle = () => {
    if (puzzle && game) {
      game.load(puzzle.fen)
      setFen(puzzle.fen)
      setResult(null)
      setHint('')
    }
  }

  const showHint = () => {
    if (puzzle.solution) {
      const moves = puzzle.solution.split(' ')
      if (moves.length > 0) {
        setHint(`Try moving from ${moves[0].substring(0, 2)} to ${moves[0].substring(2, 4)}`)
      }
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#769656]"></div>
      </div>
    )
  }

  if (!puzzle) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Puzzle not found</h2>
          <Button onClick={() => router.push('/learn')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Learning
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => router.push('/learn')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learning
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <Chessboard
                position={fen}
                onPieceDrop={onDrop}
                boardWidth={Math.min(600, window.innerWidth - 100)}
                customBoardStyle={{
                  borderRadius: '4px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
                customDarkSquareStyle={{ backgroundColor: '#769656' }}
                customLightSquareStyle={{ backgroundColor: '#eeeed2' }}
              />

              <div className="mt-6 flex gap-4">
                <Button onClick={resetPuzzle} variant="outline" className="flex-1">
                  Reset
                </Button>
                <Button onClick={showHint} variant="outline" className="flex-1">
                  Hint
                </Button>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="mb-4">
                <span className="inline-block bg-[#769656] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {puzzle.stage}
                </span>
                {puzzle.category && (
                  <span className="inline-block ml-2 bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm">
                    {puzzle.category}
                  </span>
                )}
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{puzzle.title}</h1>
              
              {puzzle.description && (
                <p className="text-gray-600 mb-6">{puzzle.description}</p>
              )}

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Task:</h3>
                <p className="text-gray-700">Find the best move for White/Black in this position.</p>
              </div>

              {hint && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold text-blue-900 mb-1">Hint:</h4>
                  <p className="text-blue-700">{hint}</p>
                </div>
              )}

              {result === 'correct' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Correct!</h4>
                    <p className="text-green-700">
                      Well done! You found the right move. This puzzle is now marked as completed.
                    </p>
                  </div>
                </div>
              )}

              {result === 'incorrect' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <XCircle className="h-6 w-6 text-red-500 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-red-900 mb-1">Not quite!</h4>
                    <p className="text-red-700">
                      That's not the best move. Try again or use the hint button.
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Puzzle Stats</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Difficulty:</span>
                    <span className="font-semibold">{puzzle.difficulty}/10</span>
                  </div>
                  {puzzle.userProgress && (
                    <div className="flex justify-between">
                      <span>Your Attempts:</span>
                      <span className="font-semibold">{puzzle.userProgress.attempts}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
