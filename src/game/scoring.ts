import type { Pick, ResolvedOutcome, ScoreResult } from '../data/types'

export function computeScoreResult(pick: Pick, outcomes: ResolvedOutcome[]): ScoreResult {
  const outcomesByPlayerId = new Map(outcomes.map((outcome) => [outcome.playerId, outcome]))

  const hitPlayerIds: string[] = []
  const missedPlayerIds: string[] = []

  for (const playerId of pick.playerIds) {
    if (outcomesByPlayerId.get(playerId)?.wasBooked) {
      hitPlayerIds.push(playerId)
    } else {
      missedPlayerIds.push(playerId)
    }
  }

  return {
    gameWeekId: pick.gameWeekId,
    totalPicks: pick.playerIds.length,
    correctPicks: hitPlayerIds.length,
    hitPlayerIds,
    missedPlayerIds,
  }
}
