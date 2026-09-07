import { LEAGUE_AVG_CARDS_PER_GAME } from '../data/referees.mock'
import type { PlayerMatchStats, Referee, RiskIndicator } from '../data/types'

const CARD_RATE_WEIGHT = 45
const FOUL_RATE_WEIGHT = 35
const REFEREE_WEIGHT = 20

// Normalizing caps for "typical worst case" so weighted terms land in a sane 0-100 range.
const MAX_CARD_RATE_PER_GAME = 1.0
const MAX_FOULS_PER_GAME = 3.0
const MAX_REFEREE_FACTOR = 1.4

/**
 * Illustrative heuristic for a UX prototype — NOT a real predictive model.
 * Combines the player's own card/foul tendency with how card-happy their
 * fixture's referee is, hand-tuned until sample outputs feel plausible.
 */
export function computeRiskIndicator(
  stats: PlayerMatchStats,
  referee: Referee,
): RiskIndicator {
  const cardRate = (stats.yellowCardsSeason + stats.redCardsSeason) / stats.gamesPlayedSeason
  const foulRate = stats.foulsPerGame / MAX_FOULS_PER_GAME
  const refereeFactor = referee.avgCardsPerGame / LEAGUE_AVG_CARDS_PER_GAME

  const normalizedCardRate = cardRate / MAX_CARD_RATE_PER_GAME
  const normalizedRefereeFactor = refereeFactor / MAX_REFEREE_FACTOR

  const riskPercent = clamp(
    normalizedCardRate * CARD_RATE_WEIGHT +
      foulRate * FOUL_RATE_WEIGHT +
      normalizedRefereeFactor * REFEREE_WEIGHT,
    0,
    100,
  )

  return {
    playerId: stats.playerId,
    fixtureId: stats.fixtureId,
    riskPercent: Math.round(riskPercent),
    playerFactor: Math.round((normalizedCardRate * CARD_RATE_WEIGHT + foulRate * FOUL_RATE_WEIGHT) * 10) / 10,
    refereeFactor: Math.round(normalizedRefereeFactor * REFEREE_WEIGHT * 10) / 10,
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}
