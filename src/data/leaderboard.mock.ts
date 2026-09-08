import type { PlayerPrediction, ResolvedOutcome } from './types'

// Fixed "what happened" used only to score rivals' mock predictions, so the
// leaderboard stays stable across replays instead of being tied to the live
// randomized outcome from resolveGameWeek.
export const leaderboardOutcomes: ResolvedOutcome[] = [
  { playerId: 'p-casemiro', fixtureId: 'f-mun-ars', wasBooked: true },
  { playerId: 'p-bissouma', fixtureId: 'f-che-tot', wasBooked: true },
  { playerId: 'p-konate', fixtureId: 'f-mci-liv', wasBooked: false },
  { playerId: 'p-rice', fixtureId: 'f-mun-ars', wasBooked: true },
  { playerId: 'p-gvardiol', fixtureId: 'f-mci-liv', wasBooked: false },
  { playerId: 'p-colwill', fixtureId: 'f-che-tot', wasBooked: false },
  { playerId: 'p-vvd', fixtureId: 'f-mci-liv', wasBooked: false },
]

export interface LeaderboardEntry {
  id: string
  name: string
  predictions: PlayerPrediction[]
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
  },
]
