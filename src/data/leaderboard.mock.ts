import type { PlayerPrediction, ResolvedOutcome } from './types'

// Fixed "what happened" used only to score rivals' mock predictions, so the
// leaderboard stays stable across replays instead of being tied to the live
// randomized outcome from resolveGameWeek.
export const leaderboardOutcomes: ResolvedOutcome[] = [
  { playerId: 'p-casemiro', fixtureId: 'f-mun-ars', wasBooked: true, cardType: 'yellow', cardMinute: 34 },
  { playerId: 'p-bissouma', fixtureId: 'f-che-tot', wasBooked: true, cardType: 'yellow', cardMinute: 61 },
  { playerId: 'p-konate', fixtureId: 'f-mci-liv', wasBooked: false },
  { playerId: 'p-rice', fixtureId: 'f-mun-ars', wasBooked: true, cardType: 'yellow', cardMinute: 12 },
  { playerId: 'p-gvardiol', fixtureId: 'f-mci-liv', wasBooked: false },
  { playerId: 'p-colwill', fixtureId: 'f-che-tot', wasBooked: false },
  { playerId: 'p-vvd', fixtureId: 'f-mci-liv', wasBooked: false },
]

export interface LeaderboardEntry {
  id: string
  name: string
  predictions: PlayerPrediction[]
  tiebreakerGuessMinute: number
  submittedAt: string
}

export const leaderboard: LeaderboardEntry[] = [
  {
    id: 'l-1',
    name: 'CardCollector92',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: true },
      { playerId: 'p-bissouma', willBeBooked: true },
      { playerId: 'p-konate', willBeBooked: true },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: false },
      { playerId: 'p-colwill', willBeBooked: false },
      { playerId: 'p-vvd', willBeBooked: false },
    ],
    tiebreakerGuessMinute: 10,
    submittedAt: '2026-09-05T17:50:00.000Z',
  },
  {
    id: 'l-2',
    name: 'RefWatcher',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: true },
      { playerId: 'p-bissouma', willBeBooked: false },
      { playerId: 'p-konate', willBeBooked: false },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: false },
      { playerId: 'p-colwill', willBeBooked: false },
      { playerId: 'p-vvd', willBeBooked: true },
    ],
    tiebreakerGuessMinute: 20,
    submittedAt: '2026-09-05T18:05:00.000Z',
  },
  {
    id: 'l-3',
    name: 'BookedIt',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: false },
      { playerId: 'p-bissouma', willBeBooked: true },
      { playerId: 'p-konate', willBeBooked: false },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: false },
      { playerId: 'p-colwill', willBeBooked: true },
      { playerId: 'p-vvd', willBeBooked: false },
    ],
    tiebreakerGuessMinute: 15,
    submittedAt: '2026-09-05T17:58:00.000Z',
  },
  {
    id: 'l-4',
    name: 'YellowPeril',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: true },
      { playerId: 'p-bissouma', willBeBooked: true },
      { playerId: 'p-konate', willBeBooked: false },
      { playerId: 'p-rice', willBeBooked: false },
      { playerId: 'p-gvardiol', willBeBooked: true },
      { playerId: 'p-colwill', willBeBooked: true },
      { playerId: 'p-vvd', willBeBooked: false },
    ],
    tiebreakerGuessMinute: 30,
    submittedAt: '2026-09-05T18:00:00.000Z',
  },
  {
    id: 'l-5',
    name: 'TacticalFoul',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: false },
      { playerId: 'p-bissouma', willBeBooked: false },
      { playerId: 'p-konate', willBeBooked: false },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: false },
      { playerId: 'p-colwill', willBeBooked: false },
      { playerId: 'p-vvd', willBeBooked: true },
    ],
    tiebreakerGuessMinute: 30,
    submittedAt: '2026-09-05T18:03:00.000Z',
  },
  {
    id: 'l-6',
    name: 'DirtyDuelist',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: false },
      { playerId: 'p-bissouma', willBeBooked: true },
      { playerId: 'p-konate', willBeBooked: true },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: true },
      { playerId: 'p-colwill', willBeBooked: true },
      { playerId: 'p-vvd', willBeBooked: false },
    ],
    tiebreakerGuessMinute: 50,
    submittedAt: '2026-09-05T18:10:00.000Z',
  },
  {
    id: 'l-7',
    name: 'CleanSheetSam',
    predictions: [
      { playerId: 'p-casemiro', willBeBooked: true },
      { playerId: 'p-bissouma', willBeBooked: false },
      { playerId: 'p-konate', willBeBooked: true },
      { playerId: 'p-rice', willBeBooked: true },
      { playerId: 'p-gvardiol', willBeBooked: true },
      { playerId: 'p-colwill', willBeBooked: true },
      { playerId: 'p-vvd', willBeBooked: true },
    ],
    tiebreakerGuessMinute: 5,
    submittedAt: '2026-09-05T18:12:00.000Z',
  },
]
