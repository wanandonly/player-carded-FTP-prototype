import type { Fixture } from './types'

export const fixtures: Fixture[] = [
  {
    id: 'f-mun-ars',
    gameWeekId: 'gw-4',
    homeTeamId: 't-mun',
    awayTeamId: 't-ars',
    refereeId: 'r-taylor',
    kickoff: '2026-09-13T14:00:00Z',
  },
  {
    id: 'f-mci-liv',
    gameWeekId: 'gw-4',
    homeTeamId: 't-mci',
    awayTeamId: 't-liv',
    refereeId: 'r-oliver',
    kickoff: '2026-09-13T16:30:00Z',
  },
  {
    id: 'f-che-tot',
    gameWeekId: 'gw-4',
    homeTeamId: 't-che',
    awayTeamId: 't-tot',
    refereeId: 'r-pawson',
    kickoff: '2026-09-14T15:00:00Z',
  },
]

export const fixturesById: Record<string, Fixture> = Object.fromEntries(
  fixtures.map((fixture) => [fixture.id, fixture]),
)
