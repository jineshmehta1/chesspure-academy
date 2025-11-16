'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<any[]>([])
  const [puzzles, setPuzzles] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      if (session.user.role !== 'ADMIN') {
        router.push('/learn')
      } else {
        fetchData()
      }
    }
  }, [status, session, router])

  const fetchData = async () => {
    try {
      const [usersRes, puzzlesRes] = await Promise.all([
        fetch('/api/admin/users'),
        fetch('/api/puzzles')
      ])
      
      const usersData = await usersRes.json()
      const puzzlesData = await puzzlesRes.json()
      
      setUsers(usersData)
      setPuzzles(puzzlesData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const [newPuzzle, setNewPuzzle] = useState({
    title: '',
    description: '',
    fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
    solution: '',
    stage: 'BEGINNER',
    difficulty: 1,
    category: ''
  })

  const createPuzzle = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/puzzles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPuzzle)
      })

      if (response.ok) {
        alert('Puzzle created successfully!')
        setNewPuzzle({
          title: '',
          description: '',
          fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
          solution: '',
          stage: 'BEGINNER',
          difficulty: 1,
          category: ''
        })
        fetchData()
      }
    } catch (error) {
      console.error('Error creating puzzle:', error)
      alert('Failed to create puzzle')
    }
  }

  const updateUserStage = async (userId: string, stage: string) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/stage`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage })
      })

      if (response.ok) {
        alert('User stage updated successfully!')
        fetchData()
      }
    } catch (error) {
      console.error('Error updating user stage:', error)
      alert('Failed to update user stage')
    }
  }

  const deletePuzzle = async (puzzleId: string) => {
    if (!confirm('Are you sure you want to delete this puzzle?')) return

    try {
      const response = await fetch(`/api/puzzles/${puzzleId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        alert('Puzzle deleted successfully!')
        fetchData()
      }
    } catch (error) {
      console.error('Error deleting puzzle:', error)
      alert('Failed to delete puzzle')
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#769656]"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="puzzles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="puzzles">Puzzles</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="create">Create Puzzle</TabsTrigger>
          </TabsList>

          <TabsContent value="puzzles" className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">All Puzzles ({puzzles.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Title</th>
                      <th className="text-left p-2">Stage</th>
                      <th className="text-left p-2">Difficulty</th>
                      <th className="text-left p-2">Category</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {puzzles.map((puzzle) => (
                      <tr key={puzzle.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{puzzle.title}</td>
                        <td className="p-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                            {puzzle.stage}
                          </span>
                        </td>
                        <td className="p-2">{puzzle.difficulty}/10</td>
                        <td className="p-2">{puzzle.category || '-'}</td>
                        <td className="p-2">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePuzzle(puzzle.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">All Users ({users.length})</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Name</th>
                      <th className="text-left p-2">Email</th>
                      <th className="text-left p-2">Role</th>
                      <th className="text-left p-2">Current Stage</th>
                      <th className="text-left p-2">Puzzles Solved</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="p-2">{user.name || 'N/A'}</td>
                        <td className="p-2">{user.email}</td>
                        <td className="p-2">
                          <span className={`px-2 py-1 rounded text-xs ${
                            user.role === 'ADMIN' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="p-2">{user.stage}</td>
                        <td className="p-2">{user._count?.progress || 0}</td>
                        <td className="p-2">
                          <Select
                            value={user.stage}
                            onValueChange={(value) => updateUserStage(user.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="NONE">None</SelectItem>
                              <SelectItem value="BEGINNER">Beginner</SelectItem>
                              <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                              <SelectItem value="ADVANCED">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-4">Create New Puzzle</h2>
              <form onSubmit={createPuzzle} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newPuzzle.title}
                    onChange={(e) => setNewPuzzle({ ...newPuzzle, title: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newPuzzle.description}
                    onChange={(e) => setNewPuzzle({ ...newPuzzle, description: e.target.value })}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="fen">FEN Position</Label>
                  <Input
                    id="fen"
                    value={newPuzzle.fen}
                    onChange={(e) => setNewPuzzle({ ...newPuzzle, fen: e.target.value })}
                    required
                    placeholder="rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
                  />
                </div>

                <div>
                  <Label htmlFor="solution">Solution (e.g., e2e4 e7e5)</Label>
                  <Input
                    id="solution"
                    value={newPuzzle.solution}
                    onChange={(e) => setNewPuzzle({ ...newPuzzle, solution: e.target.value })}
                    required
                    placeholder="e2e4"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="stage">Stage</Label>
                    <Select
                      value={newPuzzle.stage}
                      onValueChange={(value) => setNewPuzzle({ ...newPuzzle, stage: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="BEGINNER">Beginner</SelectItem>
                        <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                        <SelectItem value="ADVANCED">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="difficulty">Difficulty (1-10)</Label>
                    <Input
                      id="difficulty"
                      type="number"
                      min="1"
                      max="10"
                      value={newPuzzle.difficulty}
                      onChange={(e) => setNewPuzzle({ ...newPuzzle, difficulty: parseInt(e.target.value) })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newPuzzle.category}
                      onChange={(e) => setNewPuzzle({ ...newPuzzle, category: e.target.value })}
                      placeholder="e.g., Tactics"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#769656] hover:bg-[#5C1F1C]">
                  Create Puzzle
                </Button>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
