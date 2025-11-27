"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { toast } from "sonner";

interface Puzzle {
  id: string;
  fen: string;
  solution: string; // space-separated: "e2e4 e7e5 d2d4 d7d5"
  stage: string;
  title: string;
  description?: string;
}

export default function PuzzlePage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams();
  const puzzleId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [game, setGame] = useState<Chess | null>(null);
  const [currentFen, setCurrentFen] = useState("");
  const [result, setResult] = useState<"correct" | "incorrect" | null>(null);
  const [hint, setHint] = useState("");
  const [loading, setLoading] = useState(true);

  // NEW — index of next expected solution move
  const [solutionIndex, setSolutionIndex] = useState(0);
  const [isSolving, setIsSolving] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated" && puzzleId) {
      fetchPuzzle(puzzleId);
    }
  }, [status, router, puzzleId]);

  const fetchPuzzle = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const res = await fetch(`/api/puzzles/${id}/details`);
        if (!res.ok) {
          toast.error("You do not have access to this puzzle.");
          router.push("/learn");
          return;
        }

        const data: Puzzle = await res.json();
        setPuzzle(data);

        const g = new Chess(data.fen);
        setGame(g);
        setCurrentFen(data.fen);
        setSolutionIndex(0); // RESET PROGRESS

      } catch (err) {
        toast.error("Failed to load puzzle.");
        router.push("/learn");
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  const updateProgress = async (completed: boolean) => {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          puzzleId,
          completed,
        }),
      });
    } catch (err) {
      toast.error("Failed to save progress.");
    }
  };

  // ⭐⭐⭐ — FULL SEQUENTIAL SOLUTION LOGIC HERE
  const onDrop = useCallback(
    (source: string, target: string) => {
      if (!game || result || isSolving) return false;

      const solutionMoves = puzzle?.solution.split(" ") || [];
      const expectedMove = solutionMoves[solutionIndex]; // ← expected next user move

      const userMove = `${source}${target}`;

      // Check if user's move equals expected solution move
      if (userMove !== expectedMove) {
        toast.error("Incorrect move. Try again!");
        setResult("incorrect");
        updateProgress(false);
        return false;
      }

      // ============================
      // USER PLAYED CORRECT MOVE
      // ============================
      game.move({ from: source, to: target, promotion: "q" });
      setCurrentFen(game.fen());

      const nextIndex = solutionIndex + 1;

      // If puzzle still expects engine reply move at odd index
      const engineMove = solutionMoves[nextIndex];
      const isEngineTurn = nextIndex < solutionMoves.length;

      if (isEngineTurn) {
        // Engine moves automatically
        const engineFrom = engineMove.slice(0, 2);
        const engineTo = engineMove.slice(2, 4);

        game.move({ from: engineFrom, to: engineTo, promotion: "q" });
        setCurrentFen(game.fen());
      }

      const newIndex = solutionIndex + 2; // player + engine
      setSolutionIndex(newIndex);

      // Check if puzzle is completed
      if (newIndex >= solutionMoves.length) {
        setResult("correct");
        toast.success("🎉 Puzzle Completed!");
        updateProgress(true);
      }

      return true;
    },
    [game, puzzle, solutionIndex, result, isSolving]
  );

  const resetPuzzle = () => {
    if (!game || !puzzle) return;
    game.load(puzzle.fen);
    setCurrentFen(puzzle.fen);
    setResult(null);
    setHint("");
    setSolutionIndex(0);
  };

  const showHint = () => {
    if (!puzzle) return;
    const moves = puzzle.solution.split(" ");
    const nextMove = moves[solutionIndex];
    if (!nextMove) {
      toast.info("Puzzle is already completed.");
      return;
    }
    toast.info(`Hint: Move ${nextMove.slice(0, 2)} → ${nextMove.slice(2, 4)}`);
    setHint(`Try moving from ${nextMove.slice(0, 2)} to ${nextMove.slice(2, 4)}`);
  };

  const boardWidth = useMemo(() => {
    if (!mounted) return 600;
    return Math.min(600, window.innerWidth - 40);
  }, [mounted]);

  if (loading || status === "loading")
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  if (!puzzle)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Button onClick={() => router.push("/learn")}>Back</Button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <Button onClick={() => router.push("/learn")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Learning
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            {mounted && (
              <Chessboard
                position={currentFen}
                onPieceDrop={onDrop}
                boardWidth={boardWidth}
                customDarkSquareStyle={{ backgroundColor: "#769656" }}
                customLightSquareStyle={{ backgroundColor: "#eeeed2" }}
                arePiecesDraggable={result !== "correct"}
              />
            )}

            <div className="mt-6 flex gap-4 w-full max-w-[600px]">
              <Button className="flex-1" variant="outline" onClick={resetPuzzle}>
                Reset
              </Button>
              <Button className="flex-1" variant="outline" onClick={showHint}>
                <Lightbulb className="mr-2" /> Hint
              </Button>
            </div>
          </div>

          {/* DETAILS */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <span className="bg-[#769656] text-white px-3 py-1 rounded-full text-sm">
              {puzzle.stage}
            </span>

            <h1 className="text-3xl font-bold mt-4">{puzzle.title}</h1>

            {puzzle.description && (
              <p className="mt-3 text-gray-700">{puzzle.description}</p>
            )}

            {hint && (
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mt-6">
                <Lightbulb className="inline-block mr-2 text-blue-600" />
                {hint}
              </div>
            )}

            {result === "correct" && (
              <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-6 flex items-center gap-3">
                <CheckCircle className="text-green-600" />
                Puzzle Completed!
              </div>
            )}

            {result === "incorrect" && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-lg mt-6 flex items-center gap-3">
                <XCircle className="text-red-600" />
                Incorrect move. Try again!
              </div>
            )}

            {result === "correct" && (
              <Button className="mt-4 w-full bg-[#769656]">
                Next Puzzle
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
