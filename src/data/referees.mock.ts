import type { Referee } from './types'

export const referees: Referee[] = [
  {
    id: 'r-taylor',
    name: 'A. Taylor',
    avgCardsPerGame: 5.2,
    gamesOfficiatedSeason: 14,
    yellowCardsIssuedSeason: 68,
    redCardsIssuedSeason: 4,
  },
  {
    id: 'r-oliver',
    name: 'M. Oliver',
    avgCardsPerGame: 3.4,
    gamesOfficiatedSeason: 15,
    yellowCardsIssuedSeason: 48,
    redCardsIssuedSeason: 2,
  },
  {
    id: 'r-pawson',
    name: 'C. Pawson',
    avgCardsPerGame: 4.1,
    gamesOfficiatedSeason: 13,
    yellowCardsIssuedSeason: 50,
    redCardsIssuedSeason: 3,
  },
]

export const refereesById: Record<string, Referee> = Object.fromEntries(
  referees.map((referee) => [referee.id, referee]),
)

export const LEAGUE_AVG_CARDS_PER_GAME = 3.8
