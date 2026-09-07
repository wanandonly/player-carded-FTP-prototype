import type { Referee } from './types'

export const referees: Referee[] = [
  { id: 'r-taylor', name: 'A. Taylor', avgCardsPerGame: 5.2 },
  { id: 'r-oliver', name: 'M. Oliver', avgCardsPerGame: 3.4 },
  { id: 'r-pawson', name: 'C. Pawson', avgCardsPerGame: 4.1 },
]

export const refereesById: Record<string, Referee> = Object.fromEntries(
  referees.map((referee) => [referee.id, referee]),
)

export const LEAGUE_AVG_CARDS_PER_GAME = 3.8
