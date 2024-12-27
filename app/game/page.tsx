'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Clock } from 'lucide-react'
import { useScore } from '@/lib/context/score'

const GRID_SIZE = 8
const CANDY_TYPES = ['🍬', '🍭', '🍫', '🍪', '🧁', '🍩']
const CANDY_SIZE = 50 // Size of each candy in pixels

export default function Game() {
  const { score, setScore } = useScore();
  const [grid, setGrid] = useState<string[][]>([])
  // const [score, setScore] = useState(0)
  const [lives, setLives] = useState(3)
  const [timeToNextLife, setTimeToNextLife] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [selectedCandy, setSelectedCandy] = useState<[number, number] | null>(null)
  const [comboMultiplier, setComboMultiplier] = useState(1)

  useEffect(() => {
    initializeGrid()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeToNextLife > 0) {
        setTimeToNextLife(prev => prev - 1)
      } else if (lives < 3) {
        setLives(prev => prev + 1)
        setTimeToNextLife(3600) // 1 hour
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [timeToNextLife, lives])

  function initializeGrid() {
    let newGrid: string[][] = []
    do {
      newGrid = Array(GRID_SIZE).fill(null).map(() =>
        Array(GRID_SIZE).fill(null).map(() => CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)])
      )
    } while (findMatches(newGrid).length > 0)
    setGrid(newGrid)
  }

  function handleCandyClick(row: number, col: number) {
    if (isAnimating) return

    if (selectedCandy === null) {
      setSelectedCandy([row, col])
    } else {
      const [selectedRow, selectedCol] = selectedCandy
      if (isAdjacent(selectedRow, selectedCol, row, col)) {
        swapCandies(selectedRow, selectedCol, row, col)
      } else {
        setSelectedCandy([row, col])
      }
    }
  }

  function isAdjacent(row1: number, col1: number, row2: number, col2: number) {
    return (Math.abs(row1 - row2) === 1 && col1 === col2) || (Math.abs(col1 - col2) === 1 && row1 === row2)
  }

  function swapCandies(row1: number, col1: number, row2: number, col2: number) {
    setIsAnimating(true)
    const newGrid = [...grid]
    const temp = newGrid[row1][col1]
    newGrid[row1][col1] = newGrid[row2][col2]
    newGrid[row2][col2] = temp
    setGrid(newGrid)

    setTimeout(() => {
      const matches = findMatches(newGrid)
      if (matches.length > 0) {
        handleMatches(matches)
      } else {
        // Swap back if no matches
        newGrid[row2][col2] = newGrid[row1][col1]
        newGrid[row1][col1] = temp
        setGrid(newGrid)
        setIsAnimating(false)
        setComboMultiplier(1) // Reset combo multiplier if no match
      }
      setSelectedCandy(null)
    }, 300)
  }

  function findMatches(board: string[][]) {
    const matches: [number, number][] = []

    // Check horizontal matches
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        if (
          board[row][col] === board[row][col + 1] &&
          board[row][col] === board[row][col + 2]
        ) {
          matches.push([row, col], [row, col + 1], [row, col + 2])
          // Check for matches of 4 or 5
          if (col < GRID_SIZE - 3 && board[row][col] === board[row][col + 3]) {
            matches.push([row, col + 3])
            if (col < GRID_SIZE - 4 && board[row][col] === board[row][col + 4]) {
              matches.push([row, col + 4])
            }
          }
        }
      }
    }

    // Check vertical matches
    for (let row = 0; row < GRID_SIZE - 2; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (
          board[row][col] === board[row + 1][col] &&
          board[row][col] === board[row + 2][col]
        ) {
          matches.push([row, col], [row + 1, col], [row + 2, col])
          // Check for matches of 4 or 5
          if (row < GRID_SIZE - 3 && board[row][col] === board[row + 3][col]) {
            matches.push([row + 3, col])
            if (row < GRID_SIZE - 4 && board[row][col] === board[row + 4][col]) {
              matches.push([row + 4, col])
            }
          }
        }
      }
    }

    return matches
  }

  function handleMatches(matches: [number, number][]) {
    const newGrid = [...grid]
    const uniqueMatches = Array.from(new Set(matches.map(match => JSON.stringify(match))))
      .map(match => JSON.parse(match) as [number, number])

    // Remove matched candies
    uniqueMatches.forEach(([row, col]) => {
      newGrid[row][col] = ''
    })

    setGrid(newGrid)
    const matchScore = uniqueMatches.length * 10 * comboMultiplier
    setScore(score + matchScore)
    setComboMultiplier(prev => Math.min(prev + 0.1, 3)) // Increase combo multiplier, max 3x

    // Animate falling candies
    setTimeout(() => {
      const fallenGrid = makeCandiesFall(newGrid)
      setGrid(fallenGrid)

      // Fill empty spaces with new candies
      setTimeout(() => {
        const filledGrid = fillEmptySpaces(fallenGrid)
        setGrid(filledGrid)

        // Check for new matches
        const newMatches = findMatches(filledGrid)
        if (newMatches.length > 0) {
          handleMatches(newMatches)
        } else {
          setIsAnimating(false)
          setComboMultiplier(1) // Reset combo multiplier when chain reaction ends
        }
      }, 300)
    }, 300)
  }

  function makeCandiesFall(board: string[][]) {
    const newBoard = [...board]
    for (let col = 0; col < GRID_SIZE; col++) {
      let emptyRow = GRID_SIZE - 1
      for (let row = GRID_SIZE - 1; row >= 0; row--) {
        if (newBoard[row][col] !== '') {
          if (row !== emptyRow) {
            newBoard[emptyRow][col] = newBoard[row][col]
            newBoard[row][col] = ''
          }
          emptyRow--
        }
      }
    }
    return newBoard
  }

  function fillEmptySpaces(board: string[][]) {
    return board.map(row =>
      row.map(candy => candy === '' ? CANDY_TYPES[Math.floor(Math.random() * CANDY_TYPES.length)] : candy)
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">Candy Crush Game</h2>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-6 px-5">
          <div className="text-white">
            <p className="text-xl font-bold">Score: {score}</p>
            <p className="text-xs pt-1">Combo: x{comboMultiplier.toFixed(1)}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-red-500">
              {Array.from({ length: lives }).map((_, i) => (
                <Heart key={i} className="w-6 h-6 fill-current" />
              ))}
            </div>
            {timeToNextLife > 0 && (
              <div className="flex items-center text-yellow-300">
                <Clock className="w-6 h-6 mr-2" />
                <span>{Math.floor(timeToNextLife / 60)}:{(timeToNextLife % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>
        </div>
        <div 
          className="w-full grid grid-cols-8 gap-1 bg-purple-800 p-2 rounded-lg"
          style={{ width: `${GRID_SIZE * CANDY_SIZE}px`, height: `${GRID_SIZE * CANDY_SIZE}px` }}
        >
          <AnimatePresence>
            {grid.map((row, rowIndex) =>
              row.map((candy, colIndex) => (
                <motion.div
                  key={`${rowIndex}-${colIndex}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Candy
                    candy={candy}
                    isSelected={selectedCandy?.[0] === rowIndex && selectedCandy?.[1] === colIndex}
                    onClick={() => handleCandyClick(rowIndex, colIndex)}
                  />
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
      <Link href="/" className="mt-8 bg-white text-purple-600 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-colors shadow-md">
        Back to Home
      </Link>
    </div>
  )
}

interface CandyProps {
  candy: string
  isSelected: boolean
  onClick: () => void
}

function Candy({ candy, isSelected, onClick }: CandyProps) {
  return (
    <motion.div
      className={`w-12 h-12 bg-white rounded shadow flex items-center justify-center cursor-pointer ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-2xl">{candy}</span>
    </motion.div>
  )
}

