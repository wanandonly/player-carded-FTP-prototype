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

  const yellowCardMinutes = outcomes
    .filter((outcome) => outcome.cardType === 'yellow' && outcome.cardMinute !== undefined)
    .map((outcome) => outcome.cardMinute as number)
  const tiebreakerActualMinute = yellowCardMinutes.length > 0 ? Math.min(...yellowCardMinutes) : null
  const tiebreakerDiff =
    tiebreakerActualMinute === null ? null : Math.abs(pick.tiebreakerGuessMinute - tiebreakerActualMinute)

  return {
    gameWeekId: pick.gameWeekId,
    totalPredictions: pick.predictions.length,
    correctPredictions: correctPlayerIds.length,
    correctPlayerIds,
    incorrectPlayerIds,
    tiebreakerGuessMinute: pick.tiebreakerGuessMinute,
    tiebreakerActualMinute,
    tiebreakerDiff,
  }
}
