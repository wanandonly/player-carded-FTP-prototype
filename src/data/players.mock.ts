import type { Player } from './types'

export const players: Player[] = [
  { id: 'p-casemiro', name: 'Casemiro', teamId: 't-mun', position: 'MID' },
  { id: 'p-rice', name: 'Declan Rice', teamId: 't-ars', position: 'MID' },
  { id: 'p-fernandes', name: 'Bruno Fernandes', teamId: 't-mun', position: 'MID' },
  { id: 'p-rodri', name: 'Rodri', teamId: 't-mci', position: 'MID' },
  { id: 'p-vvd', name: 'Virgil van Dijk', teamId: 't-liv', position: 'DEF' },
  { id: 'p-saliba', name: 'William Saliba', teamId: 't-ars', position: 'DEF' },
  { id: 'p-colwill', name: 'Levi Colwill', teamId: 't-che', position: 'DEF' },
  { id: 'p-romero', name: 'Cristian Romero', teamId: 't-tot', position: 'DEF' },
  { id: 'p-bissouma', name: 'Yves Bissouma', teamId: 't-tot', position: 'MID' },
  { id: 'p-caicedo', name: 'Moises Caicedo', teamId: 't-che', position: 'MID' },
  { id: 'p-gvardiol', name: 'Josko Gvardiol', teamId: 't-mci', position: 'DEF' },
  { id: 'p-konate', name: 'Ibrahima Konate', teamId: 't-liv', position: 'DEF' },
  { id: 'p-haaland', name: 'Erling Haaland', teamId: 't-mci', position: 'FWD' },
  { id: 'p-salah', name: 'Mohamed Salah', teamId: 't-liv', position: 'FWD' },
  { id: 'p-saka', name: 'Bukayo Saka', teamId: 't-ars', position: 'FWD' },
  { id: 'p-palmer', name: 'Cole Palmer', teamId: 't-che', position: 'FWD' },
]

export const playersById: Record<string, Player> = Object.fromEntries(
  players.map((player) => [player.id, player]),
)
