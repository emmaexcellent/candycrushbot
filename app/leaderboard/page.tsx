"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";

interface Player {
  id: number;
  name: string;
  points: number;
}

const PLAYERS_PER_PAGE = 10;

export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);

  // Mock data for the leaderboard
  const players: Player[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    points: Math.floor(Math.random() * 10000),
  })).sort((a, b) => b.points - a.points);

  const totalPages = Math.ceil(players.length / PLAYERS_PER_PAGE);
  const displayedPlayers = players.slice(
    (currentPage - 1) * PLAYERS_PER_PAGE,
    currentPage * PLAYERS_PER_PAGE
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-8 text-white text-center flex items-center">
        <Trophy className="mr-2" />
        Leaderboard
      </h2>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg overflow-hidden w-full max-w-2xl">
        <table className="w-full">
          <thead>
            <tr className="bg-purple-700 text-white">
              <th className="px-4 py-2 text-left">Rank</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {displayedPlayers.map((player, index) => (
              <tr
                key={player.id}
                className={
                  index % 2 === 0
                    ? "bg-white bg-opacity-10"
                    : "bg-white bg-opacity-5"
                }
              >
                <td className="px-4 py-2 text-white">
                  {(currentPage - 1) * PLAYERS_PER_PAGE + index + 1}
                </td>
                <td className="px-4 py-2 text-white">{player.name}</td>
                <td className="px-4 py-2 text-right text-yellow-300 font-bold">
                  {player.points.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center w-full max-w-2xl">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition-colors shadow-md flex items-center"
        >
          <ChevronLeft className="mr-1" /> Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full disabled:opacity-50 transition-colors shadow-md flex items-center"
        >
          Next <ChevronRight className="ml-1" />
        </button>
      </div>
      <Link
        href="/"
        className="mt-8 bg-white text-purple-600 hover:bg-purple-100 font-bold py-2 px-4 rounded-full transition-colors shadow-md"
      >
        Back to Home
      </Link>
    </div>
  );
}
