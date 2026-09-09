import { gameWeek } from './gameWeeks.mock'
import { buildShortlist } from '../game/buildShortlist'
import { computeScoreResult } from '../game/scoring'
import type { HistoryEntry } from './types'
import { leaderboardOutcomes } from './leaderboard.mock'

const riskPercentByPlayerId = new Map(
  buildShortlist(gameWeek).map((entry) => [entry.player.id, entry.risk.riskPercent]),
)

function daysAgo(days: number): string {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

function buildMockEntry(
  id: string,
  playedAt: string,
  willBeBookedByPlayerId: Record<string, boolean>,
  tiebreakerGuessMinute: number,
): HistoryEntry {
  const predictions = leaderboardOutcomes.map((outcome) => ({
    playerId: outcome.playerId,
    willBeBooked: willBeBookedByPlayerId[outcome.playerId],
  }))
  const score = computeScoreResult(
    { gameWeekId: 'gw-4', predictions, tiebreakerGuessMinute },
    leaderboardOutcomes,
    riskPercentByPlayerId,
  )
  return { id, playedAt, gameWeekId: 'gw-4', predictions, outcomes: leaderboardOutcomes, score }
}

// Flavor-only past results, so the Results tab has something to show without
// needing real persistence — a prototype doesn't need localStorage for this.
// Scored against the same fixed outcome set as the leaderboard rivals via
// computeScoreResult, so these numbers are always derived, never hand-typed.
export const mockPastResults: HistoryEntry[] = [
  buildMockEntry(
    'mock-3',
    daysAgo(7),
    {
      'p-casemiro': true,
      'p-bissouma': true,
      'p-konate': false,
      'p-rice': true,
      'p-gvardiol': false,
      'p-colwill': false,
      'p-vvd': false,
    },
    18,
  ),
  buildMockEntry(
    'mock-2',
    daysAgo(14),
    {
      'p-casemiro': false,
      'p-bissouma': true,
      'p-konate': true,
      'p-rice': true,
      'p-gvardiol': true,
      'p-colwill': true,
      'p-vvd': false,
    },
    40,
  ),
  buildMockEntry(
    'mock-1',
    daysAgo(21),
    {
      'p-casemiro': true,
      'p-bissouma': false,
      'p-konate': false,
      'p-rice': true,
      'p-gvardiol': false,
      'p-colwill': false,
      'p-vvd': true,
    },
    9,
  ),
]
