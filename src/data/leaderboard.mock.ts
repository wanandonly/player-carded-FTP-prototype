export interface LeaderboardEntry {
  id: string
  name: string
  correctPredictions: number
  totalPredictions: number
}

export const leaderboard: LeaderboardEntry[] = [
  { id: 'l-1', name: 'CardCollector92', correctPredictions: 6, totalPredictions: 7 },
  { id: 'l-2', name: 'RefWatcher', correctPredictions: 5, totalPredictions: 7 },
  { id: 'l-3', name: 'BookedIt', correctPredictions: 5, totalPredictions: 7 },
  { id: 'l-4', name: 'YellowPeril', correctPredictions: 4, totalPredictions: 7 },
  { id: 'l-5', name: 'TacticalFoul', correctPredictions: 4, totalPredictions: 7 },
  { id: 'l-6', name: 'DirtyDuelist', correctPredictions: 3, totalPredictions: 7 },
  { id: 'l-7', name: 'CleanSheetSam', correctPredictions: 2, totalPredictions: 7 },
]
