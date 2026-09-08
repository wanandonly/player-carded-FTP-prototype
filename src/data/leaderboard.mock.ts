export interface LeaderboardEntry {
  id: string
  name: string
  correctPicks: number
  totalPicks: number
}

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l-1', name: 'CardCollector92', correctPicks: 6, totalPicks: 7 },
  { id: 'l-2', name: 'RefWatcher', correctPicks: 5, totalPicks: 7 },
  { id: 'l-3', name: 'BookedIt', correctPicks: 5, totalPicks: 7 },
  { id: 'l-4', name: 'YellowPeril', correctPicks: 4, totalPicks: 7 },
  { id: 'l-5', name: 'TacticalFoul', correctPicks: 4, totalPicks: 7 },
  { id: 'l-6', name: 'DirtyDuelist', correctPicks: 3, totalPicks: 7 },
  { id: 'l-7', name: 'CleanSheetSam', correctPicks: 2, totalPicks: 7 },
]
