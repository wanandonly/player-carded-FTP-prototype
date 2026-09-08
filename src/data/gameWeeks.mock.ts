import type { GameWeek } from './types'

export const gameWeek: GameWeek = {
  id: 'gw-4',
  label: 'Game Week 4',
  fixtureIds: ['f-mun-ars', 'f-mci-liv', 'f-che-tot'],
  shortlistPlayerIds: [
    'p-casemiro', // MUN, risk 78 (high)
    'p-bissouma', // TOT, risk 58 (mid)
    'p-konate', // LIV, risk 50 (true toss-up)
    'p-rice', // ARS, risk 48 (near toss-up)
    'p-gvardiol', // MCI, risk 44 (mid)
    'p-colwill', // CHE, risk 43 (mid)
    'p-vvd', // LIV, risk 27 (low)
  ],
}
