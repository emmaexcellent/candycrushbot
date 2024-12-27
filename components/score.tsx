"use client"
import { useScore } from '@/lib/context/score';
import React from 'react'

const Score = () => {
  const { score } = useScore();
  return (
    <p className="text-2xl mb-6 text-center text-white">
      Current Points: <span className="font-bold">{score}</span>
    </p>
  );
}

export default Score