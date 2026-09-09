import type { ResolvedOutcome, ShortlistEntry } from '../data/types'

/**
 * Mock resolution: treats each player's risk % as a probability and rolls
 * against it. There is no real match happening — this simulates one so the
 * prototype's results screen has something to show.
 */
export function resolveGameWeek(shortlist: ShortlistEntry[]): ResolvedOutcome[] {
  return shortlist.map((entry) => {
    const wasBooked = Math.random() * 100 < entry.risk.riskPercent
    const cardType: ResolvedOutcome['cardType'] = wasBooked
      ? Math.random() < 0.12
        ? 'red'
        : 'yellow'
      : undefined
    const cardMinute = wasBooked ? Math.ceil(Math.random() * 90) : undefined

    return {
      playerId: entry.player.id,
      fixtureId: entry.fixture.id,
      wasBooked,
      cardType,
      cardMinute,
    }
  })
}
