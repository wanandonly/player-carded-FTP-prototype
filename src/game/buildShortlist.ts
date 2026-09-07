import { fixturesById } from '../data/fixtures.mock'
import { playerMatchStatsByPlayerId } from '../data/playerMatchStats.mock'
import { playersById } from '../data/players.mock'
import { refereesById } from '../data/referees.mock'
import { teamsById } from '../data/teams.mock'
import type { GameWeek, ShortlistEntry } from '../data/types'
import { computeRiskIndicator } from './riskEngine'

export function buildShortlist(gameWeek: GameWeek): ShortlistEntry[] {
  return gameWeek.shortlistPlayerIds.map((playerId) => {
    const player = playersById[playerId]
    const stats = playerMatchStatsByPlayerId[playerId]
    const fixture = fixturesById[stats.fixtureId]
    const team = teamsById[player.teamId]
    const opponentTeamId =
      fixture.homeTeamId === player.teamId ? fixture.awayTeamId : fixture.homeTeamId
    const opponent = teamsById[opponentTeamId]
    const referee = refereesById[fixture.refereeId]
    const risk = computeRiskIndicator(stats, referee)

    return { player, team, fixture, opponent, referee, stats, risk }
  })
}
