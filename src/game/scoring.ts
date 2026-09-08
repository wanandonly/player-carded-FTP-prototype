import type { Pick, ResolvedOutcome, ScoreResult } from '../data/types'

export function computeScoreResult(pick: Pick, outcomes: ResolvedOutcome[]): ScoreResult {
  const outcomesByPlayerId = new Map(outcomes.map((outcome) => [outcome.playerId, outcome]))

  const correctPlayerIds: string[] = []
  const incorrectPlayerIds: string[] = []

  for (const prediction of pick.predictions) {
    const outcome = outcomesByPlayerId.get(prediction.playerId)
    if (outcome !== undefined && prediction.willBeBooked === outcome.wasBooked) {
      correctPlayerIds.push(prediction.playerId)
    } else {
      incorrectPlayerIds.push(prediction.playerId)
    }
  }

  return {
    gameWeekId: pick.gameWeekId,
    totalPredictions: pick.predictions.length,
    correctPredictions: correctPlayerIds.length,
    correctPlayerIds,
    incorrectPlayerIds,
  }
}
