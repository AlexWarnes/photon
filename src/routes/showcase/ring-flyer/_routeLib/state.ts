import { derived, get, writable, type Writable } from 'svelte/store';

/**
 * COLLISION GROUPS:
 * 0 - Env things (walls, projectile)
 * 1 - Player
 * 9 - FinishSensor
 */
export type GameStatus = 'READY' | 'PLAY' | 'LOSE' | 'LEVEL_WIN' | 'GAME_WIN';
export type Difficulty = "EASY" | "MEDIUM" | "HARD";
export type Level = "ONE" | "TWO" | "THREE";
export interface LevelStats {
  time: number;
  fuelRemaining: number;
}
const difficultyToFuelMap = {
  EASY: 5000,
  MEDIUM: 2500,
  HARD: 1000,
}
export const difficultyToROFMap = {
  EASY: 750,
  MEDIUM: 500,
  HARD: 100,
}

export const level = writable<number>(1);
export const gameStatus = writable<GameStatus>('READY');
export const playerRBInteger = writable<number>();
export const difficulty = writable<Difficulty>("EASY");
export const fuel = writable(0);
export const fuelCapacity = derived(difficulty, $d => difficultyToFuelMap[$d]);
export const pctFuel = derived([fuel, fuelCapacity], ([$f, $fc]) => $f / $fc);
export const stats = writable<LevelStats[]>([])
export function setInitialFuel(d: Difficulty){
  fuel.set(difficultyToFuelMap[d]);
}

export function handleLevelChange(l: number): void {
  // any global thing that needs to be changed between levels
  if (l === 1) {
    resetGame();
  }
  level.set(l);
  gameStatus.set("READY");
  setInitialFuel(get(difficulty));
}

export function resetGame(): void {
  // any global thing that needs to be changed for a full reset
  stats.set([])
}

export function addStats(t: number, f: number): void {
  stats.update((current: LevelStats[]) => {
    current.push({time: t, fuelRemaining: f})
    return current;
  })
}