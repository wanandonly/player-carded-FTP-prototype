export type Position = 'GK' | 'DEF' | 'MID' | 'FWD'

export interface Team {
  id: string
  name: string
  shortName: string
  color: string
}

export interface Player {
  id: string
  name: string
  teamId: string
  position: Position
}

export interface Referee {
  id: string
  name: string
  avgCardsPerGame: number
}

export interface Fixture {
  id: string
  gameWeekId: string
  homeTeamId: string
  awayTeamId: string
  refereeId: string
  kickoff: string
}

export interface GameWeek {
  id: string
  label: string
  fixtureIds: string[]
  shortlistPlayerIds: string[]
}

export type CautionResult = 'Y' | 'R' | '-'

export interface PlayerMatchStats {
  playerId: string
  fixtureId: string
  foulsPerGame: number
  yellowCardsSeason: number
  redCardsSeason: number
  gamesPlayedSeason: number
  minutesPerGame: number
  last5Form: CautionResult[]
}

export interface RiskIndicator {
  playerId: string
  fixtureId: string
  riskPercent: number
  playerFactor: number
  refereeFactor: number
}

export interface ShortlistEntry {
  player: Player
  team: Team
  fixture: Fixture
  opponent: Team
  referee: Referee
  stats: PlayerMatchStats
  risk: RiskIndicator
}

export interface PlayerPrediction {
  playerId: string
  willBeBooked: boolean
}

export interface Pick {
  gameWeekId: string
  predictions: PlayerPrediction[]
}

export interface ResolvedOutcome {
  playerId: string
  fixtureId: string
  wasBooked: boolean
  cardType?: 'yellow' | 'red'
}

export interface ScoreResult {
  gameWeekId: string
  totalPredictions: number
  correctPredictions: number
  correctPlayerIds: string[]
  incorrectPlayerIds: string[]
}

export const PICKS_PER_GAME_WEEK = 7
