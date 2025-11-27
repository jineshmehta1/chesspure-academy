

'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { 
  Play, Trash2, MousePointer2, Save, RotateCcw,
  Copy, CheckCircle, Search, Trophy, Mail, Calendar
} from 'lucide-react'

type Piece = { type: string; color: 'w' | 'b' }
type Tool = Piece | 'trash' | null

const PIECE_TYPES = ['p', 'n', 'b', 'r', 'q', 'k'] as const

const UNICODE_PIECES: Record<'w' | 'b', Record<string, string>> = {
  w: { k: '♔', q: '♕', r: '♖', b: '♗', n: '♘', p: '♙' },
  b: { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' },
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const gameRef = useRef(new Chess())
  const [boardFen, setBoardFen] = useState(gameRef.current.fen())
  const [mode, setMode] = useState<'SETUP' | 'RECORD'>('SETUP')
  const [selectedTool, setSelectedTool] = useState<Tool>(null)
  const [solutionMoves, setSolutionMoves] = useState<string[]>([])
  const [initialFen, setInitialFen] = useState<string | null>(null)
  const [fenInput, setFenInput] = useState(boardFen)
  const [fenError, setFenError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  const [users, setUsers] = useState<any[]>([])
  const [puzzles, setPuzzles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [userSearch, setUserSearch] = useState('')

  const [newPuzzle, setNewPuzzle] = useState({
    title: '',
    stage: 'BEGINNER' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED',
    category: '',
  })

  // Auth + Data Fetch
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      if ((session?.user as any)?.role !== 'ADMIN') {
        router.push('/learn')
      } else {
        fetchData()
      }
    }
  }, [status, session, router])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [usersRes, puzzlesRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/puzzles')
      ])
      
      if (usersRes.ok) setUsers(await usersRes.json())
      if (puzzlesRes.ok) setPuzzles(await puzzlesRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  // === CHESS LOGIC ===
  const toggleMode = (toRecord: boolean) => {
    if (toRecord && (!boardFen.includes('K') || !boardFen.includes('k'))) {
      alert('Both kings must be on the board!')
      return
    }
    if (toRecord) {
      setInitialFen(gameRef.current.fen())
      setSolutionMoves([])
    } else {
      setInitialFen(null)
      setSolutionMoves([])
    }
    setMode(toRecord ? 'RECORD' : 'SETUP')
    setSelectedTool(null)
  }

  const placePiece = (piece: Piece, square: string) => {
    const game = gameRef.current
    if (piece.type === 'k') {
      const board = game.board()
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          const p = board[r][c]
          if (p?.type === 'k' && p.color === piece.color) {
            const sq = String.fromCharCode(97 + c) + (8 - r)
            game.remove(sq)
          }
        }
      }
    }
    game.remove(square)
    game.put({ type: piece.type as any, color: piece.color }, square)
    syncBoard()
  }

  const syncBoard = () => {
    const fen = gameRef.current.fen()
    setBoardFen(fen)
    setFenInput(fen)
    setFenError('')
  }

  const onDrop = (source: string, target: string, pieceStr: string) => {
    const color = pieceStr[0] === 'w' ? 'w' : 'b'
    const type = pieceStr[1].toLowerCase()

    if (mode === 'SETUP') {
      gameRef.current.remove(source)
      gameRef.current.remove(target)
      gameRef.current.put({ type: type as any, color }, target)
      syncBoard()
      return true
    }

    if (mode === 'RECORD') {
      try {
        const move = gameRef.current.move({ from: source, to: target, promotion: 'q' })
        if (move) {
          setSolutionMoves(prev => [...prev, move.from + move.to + (move.promotion || '')])
          syncBoard()
          return true
        }
      } catch { }
      return false
    }
    return false
  }

  const onSquareClick = (square: string) => {
    if (mode !== 'SETUP' || !selectedTool) return
    if (selectedTool === 'trash') gameRef.current.remove(square)
    else placePiece(selectedTool, square)
    syncBoard()
  }

  const applyFen = (fen: string) => {
    try {
      gameRef.current = new Chess(fen.trim())
      syncBoard()
    } catch {
      setFenError('Invalid FEN')
    }
  }

  const clearBoard = () => { gameRef.current.clear(); syncBoard() }
  const resetBoard = () => { gameRef.current.reset(); syncBoard(); setSolutionMoves([]) }

  const savePuzzle = async () => {
    if (!initialFen || solutionMoves.length === 0) {
      alert('Please record at least one move!')
      return
    }

    const payload = {
      ...newPuzzle,
      fen: initialFen.split(' ')[0] + ' w - - 0 1',
      solution: solutionMoves.join(' '),
    }

    const res = await fetch('/api/puzzles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (res.ok) {
      alert('Puzzle created successfully!')
      setNewPuzzle({ title: '', stage: 'BEGINNER', category: '' })
      setSolutionMoves([])
      toggleMode(false)
      fetchData()
    } else {
      alert('Failed to create puzzle')
    }
  }

  // === USER STAGE UPDATE (exactly like your code) ===
  const updateUserStage = async (userId: string, stage: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/stage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage })
      })

      if (response.ok) {
        fetchData() // Refresh list
      } else {
        alert('Failed to update stage')
      }
    } catch (error) {
      console.error('Error updating user stage:', error)
      alert('Failed to update stage')
    }
  }

  const copyFen = () => {
    navigator.clipboard.writeText(boardFen)
    setCopySuccess(true)
    setTimeout(() => setCopySuccess(false), 2000)
  }

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  )

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-[#769656]"></div>
      </div>
    )
  }

  if (!session || (session?.user as any)?.role !== 'ADMIN') return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button variant="outline" size="lg" onClick={() => router.push('/learn')}>
            Exit to App
          </Button>
        </div>

        <Tabs defaultValue="create" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 h-14 text-lg">
            <TabsTrigger value="create">Create Puzzle</TabsTrigger>
            <TabsTrigger value="puzzles">Puzzles ({puzzles.length})</TabsTrigger>
            <TabsTrigger value="users">Students ({users.length})</TabsTrigger>
          </TabsList>

          {/* CREATE PUZZLE WITH BOARD */}
          <TabsContent value="create" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-6">
                <Card className={`overflow-hidden shadow-xl ${mode === 'RECORD' ? 'ring-4 ring-green-500' : ''}`}>
                  <Chessboard
                    position={boardFen}
                    onPieceDrop={onDrop}
                    onSquareClick={onSquareClick}
                    arePiecesDraggable={mode === 'RECORD' || !selectedTool}
                    customBoardStyle={{ borderRadius: '12px' }}
                  />
                </Card>

                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <span className={`text-lg font-bold ${mode === 'SETUP' ? 'text-blue-600' : 'text-gray-400'}`}>Editor Mode</span>
                    <Switch checked={mode === 'RECORD'} onCheckedChange={toggleMode} />
                    <span className={`text-lg font-bold ${mode === 'RECORD' ? 'text-green-600' : 'text-gray-400'}`}>Record Mode</span>
                  </div>
                </Card>

                {mode === 'RECORD' && (
                  <Card className="p-5 bg-green-50 border-2 border-green-300">
                    <div className="flex items-center gap-3 mb-3">
                      <Play className="w-6 h-6 text-green-700" />
                      <h3 className="font-bold text-green-800">Recording Solution</h3>
                    </div>
                    <div className="font-mono text-sm bg-white p-3 rounded border break-all">
                      {solutionMoves.length > 0 ? solutionMoves.join(' ') : 'Make moves...'}
                    </div>
                    <Button size="sm" variant="outline" className="mt-3" disabled={solutionMoves.length === 0}
                      onClick={() => { gameRef.current.undo(); setSolutionMoves(m => m.slice(0, -1)); syncBoard() }}>
                      <RotateCcw className="w-4 h-4 mr-1" /> Undo
                    </Button>
                  </Card>
                )}
              </div>

              <div className="lg:col-span-7 space-y-6">
                {mode === 'SETUP' && (
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <MousePointer2 className="w-6 h-6" /> Piece Palette
                      </h3>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={clearBoard}>Clear</Button>
                        <Button size="sm" variant="outline" onClick={resetBoard}>Start Position</Button>
                      </div>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <p className="font-medium mb-3">White Pieces</p>
                        <div className="flex flex-wrap gap-4">
                          {PIECE_TYPES.map(t => (
                            <PaletteButton key={'w'+t} piece={{type: t, color: 'w'}} active={selectedTool?.type === t && selectedTool?.color === 'w'} onClick={setSelectedTool} label={UNICODE_PIECES.w[t]} />
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium mb-3">Black Pieces</p>
                        <div className="flex flex-wrap gap-4">
                          {PIECE_TYPES.map(t => (
                            <PaletteButton key={'b'+t} piece={{type: t, color: 'b'}} active={selectedTool?.type === t && selectedTool?.color === 'b'} onClick={setSelectedTool} label={UNICODE_PIECES.b[t]} className="bg-gray-900 text-white hover:bg-gray-800" />
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-3 items-end">
                        <Button variant={selectedTool === 'trash' ? 'destructive' : 'outline'}
                          onClick={() => setSelectedTool(selectedTool === 'trash' ? null : 'trash')}>
                          <Trash2 className="w-4 h-4 mr-2" /> Eraser
                        </Button>
                        <div className="flex-1">
                          <div className="flex gap-2">
                            <Input value={fenInput} onChange={e => setFenInput(e.target.value)} onBlur={e => applyFen(e.target.value)}
                              placeholder="Paste FEN..." className={`font-mono text-xs ${fenError ? 'border-red-500' : ''}`} />
                            <Button size="icon" variant="ghost" onClick={copyFen}>
                              {copySuccess ? <CheckCircle className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                            </Button>
                          </div>
                          {fenError && <p className="text-xs text-red-600 mt-1">{fenError}</p>}
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-6">Save Puzzle</h3>
                  <div className="space-y-5">
                    <div>
                      <Label>Title</Label>
                      <Input placeholder="Mate in 3 - Queen Sacrifice" value={newPuzzle.title}
                        onChange={e => setNewPuzzle({ ...newPuzzle, title: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Stage</Label>
                        <Select value={newPuzzle.stage} onValueChange={v => setNewPuzzle({ ...newPuzzle, stage: v as any })}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="BEGINNER">Beginner</SelectItem>
                            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                            <SelectItem value="ADVANCED">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Category (optional)</Label>
                        <Input placeholder="Fork, Pin, Endgame..." value={newPuzzle.category}
                          onChange={e => setNewPuzzle({ ...newPuzzle, category: e.target.value })} />
                      </div>
                    </div>
                    <Button size="lg" className="w-full h-14" onClick={savePuzzle}
                      disabled={mode === 'SETUP' || solutionMoves.length === 0}>
                      <Save className="w-6 h-6 mr-3" />
                      Save Puzzle ({solutionMoves.length} moves)
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* PUZZLES LIST */}
          <TabsContent value="puzzles">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">All Puzzles ({puzzles.length})</h2>
              <div className="space-y-4">
                {puzzles.map(p => (
                  <div key={p.id} className="flex justify-between items-center p-5 bg-gray-50 rounded-xl hover:bg-gray-100">
                    <div>
                      <div className="font-bold text-lg">{p.title || 'Untitled'}</div>
                      <div className="text-sm text-gray-600">Stage: <Badge>{p.stage}</Badge> • Solution: {p.solution}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* USERS WITH STAGE EDITING */}
          <TabsContent value="users">
            <Card className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Students ({users.length})</h2>
                <div className="relative w-80">
                  <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input placeholder="Search by name or email..." value={userSearch} onChange={e => setUserSearch(e.target.value)} className="pl-10" />
                </div>
              </div>

              <div className="space-y-4">
                {filteredUsers.map(user => (
                  <div key={user.id} className="flex items-center justify-between p-6 bg-white rounded-xl border hover:shadow-md transition">
                    <div className="flex items-center gap-5">
                      <Avatar className="w-14 h-14">
                        <AvatarFallback className="text-xl font-bold bg-gradient-to-br from-teal-500 to-blue-600 text-white">
                          {user.name?.[0]?.toUpperCase() || 'S'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold text-xl">{user.name || 'Student'}</div>
                        <div className="text-sm text-gray-600 mt-1 flex items-center gap-4">
                          <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {user.email}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> Joined {new Date(user.createdAt || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-600">{user._count?.progress || 0}</div>
                        <div className="text-sm text-gray-500">Solved</div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-yellow-600" />
                        <Select
                          value={user.stage || 'NONE'}
                          onValueChange={(value) => updateUserStage(user.id, value)}
                        >
                          <SelectTrigger className="w-44">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="NONE">None</SelectItem>
                            <SelectItem value="BEGINNER">Beginner</SelectItem>
                            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                            <SelectItem value="ADVANCED">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function PaletteButton({ piece, active, onClick, label, className = '' }: {
  piece: Piece, active: boolean, onClick: (t: Tool) => void, label: string, className?: string
}) {
  return (
    <button
      onClick={() => onClick(active ? null : piece)}
      className={`
        w-16 h-16 text-6xl rounded-xl border-2 flex items-center justify-center transition-all
        ${active ? 'ring-4 ring-blue-500 ring-offset-4 scale-110 border-blue-600 shadow-xl' : 'border-gray-300 hover:border-gray-500 hover:scale-105'}
        ${className}
      `}
    >
      {label}
    </button>
  )
}