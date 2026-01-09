/**
 * Color Race Game Store
 * 
 * Manages Color Race game state using Zustand.
 */

import { create } from 'zustand';
import type { Color } from '../shared/types';

export type GamePhase = 'waiting' | 'countdown' | 'playing' | 'round_result' | 'finished';

interface ColorRaceState {
  // Game state
  phase: GamePhase;
  currentColor: Color | null;
  round: number;
  totalRounds: number;
  scores: Record<string, number>;
  
  // Round result
  roundWinner: {
    playerId: string;
    displayName: string;
  } | null;
  
  // Final result
  gameWinner: {
    playerId: string;
    displayName: string;
    score: number;
  } | null;
  
  // Player's answer status
  hasAnswered: boolean;
  
  // Actions
  setCountdown: (count: number) => void;
  setCurrentColor: (color: Color, round: number, totalRounds: number) => void;
  setRoundResult: (winnerId: string | null, winnerName: string | null, scores: Record<string, number>) => void;
  setGameFinished: (winnerId: string, winnerName: string, scores: Record<string, number>) => void;
  markAnswered: () => void;
  resetGame: () => void;
}

export const useColorRaceStore = create<ColorRaceState>((set) => ({
  // Initial state
  phase: 'waiting',
  currentColor: null,
  round: 1,
  totalRounds: 5,
  scores: {},
  roundWinner: null,
  gameWinner: null,
  hasAnswered: false,
  
  // Set countdown
  setCountdown: (count) => set({
    phase: count > 0 ? 'countdown' : 'waiting',
  }),
  
  // Set new round
  setCurrentColor: (color, round, totalRounds) => set({
    phase: 'playing',
    currentColor: color,
    round,
    totalRounds,
    hasAnswered: false,
    roundWinner: null,
  }),
  
  // Set round result
  setRoundResult: (winnerId, winnerName, scores) => set({
    phase: 'round_result',
    roundWinner: winnerId && winnerName ? { playerId: winnerId, displayName: winnerName } : null,
    scores,
  }),
  
  // Set game finished
  setGameFinished: (winnerId, winnerName, scores) => set({
    phase: 'finished',
    gameWinner: { playerId: winnerId, displayName: winnerName, score: scores[winnerId] },
    scores,
  }),
  
  // Mark that player answered
  markAnswered: () => set({ hasAnswered: true }),
  
  // Reset for new game
  resetGame: () => set({
    phase: 'waiting',
    currentColor: null,
    round: 1,
    totalRounds: 5,
    scores: {},
    roundWinner: null,
    gameWinner: null,
    hasAnswered: false,
  }),
}));
