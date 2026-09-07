import type { Team } from './types'

export const teams: Team[] = [
  { id: 't-mci', name: 'Man City', shortName: 'MCI', color: '#6CABDD' },
  { id: 't-mun', name: 'Man United', shortName: 'MUN', color: '#DA291C' },
  { id: 't-liv', name: 'Liverpool', shortName: 'LIV', color: '#C8102E' },
  { id: 't-ars', name: 'Arsenal', shortName: 'ARS', color: '#EF0107' },
  { id: 't-che', name: 'Chelsea', shortName: 'CHE', color: '#034694' },
  { id: 't-tot', name: 'Tottenham', shortName: 'TOT', color: '#132257' },
]

export const teamsById: Record<string, Team> = Object.fromEntries(
  teams.map((team) => [team.id, team]),
)
