import Link from 'next/link'
import { Star, Trophy, Users, User } from 'lucide-react'
import Score from '@/components/score'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <h2 className="text-4xl font-bold mb-8 text-white text-center">Welcome to Telegram Candy Crush Game</h2>
      <div className="bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md">
        <Score/>
        <div className="space-y-4">
          <Link href="/game" className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-md">
            Play
          </Link>
          <Link href="/tasks" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-md flex items-center justify-center">
            <Star className="mr-2" />
            Tasks
          </Link>
          <Link href="/leaderboard" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-md flex items-center justify-center">
            <Trophy className="mr-2" />
            Leaderboard
          </Link>
          <Link href="/invite" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-md flex items-center justify-center">
            <Users className="mr-2" />
            Invite Friends
          </Link>
          <Link href="/profile" className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded-lg text-center transition-colors shadow-md flex items-center justify-center">
            <User className="mr-2" />
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

