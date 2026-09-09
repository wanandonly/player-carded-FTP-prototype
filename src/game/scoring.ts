import type { Pick, ResolvedOutcome, ScoreResult } from '../data/types'

export function computeScoreResult(
  pick: Pick,
  outcomes: ResolvedOutcome[],
  riskPercentByPlayerId: Map<string, number>,
): ScoreResult {
  const outcomesByPlayerId = new Map(outcomes.map((outcome) => [outcome.playerId, outcome]))

  const correctPlayerIds: string[] = []
  const incorrectPlayerIds: string[] = []
  let insightPoints = 0

  for (const prediction of pick.predictions) {
    const outcome = outcomesByPlayerId.get(prediction.playerId)
    const correct = outcome !== undefined && prediction.willBeBooked === outcome.wasBooked
    if (correct) {
      correctPlayerIds.push(prediction.playerId)
      const riskPercent = riskPercentByPlayerId.get(prediction.playerId) ?? 50
      // Reward calling against the odds: correctly predicting "booked" is worth more the
      // less likely booking was, and vice versa for "not booked".
      const underdogValue = prediction.willBeBooked ? 100 - riskPercent : riskPercent
      insightPoints += Math.round(underdogValue)
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
    insightPoints,
  }
}
