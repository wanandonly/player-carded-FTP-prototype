import { useMemo, useState } from 'react'
import { gameWeek } from './data/gameWeeks.mock'
import type { Pick, ResolvedOutcome, ScoreResult } from './data/types'
import { MAX_PICKS } from './data/types'
import { buildShortlist } from './game/buildShortlist'
import type { Screen } from './game/gameState'
import { resolveGameWeek } from './game/resolveGameWeek'
import { computeScoreResult } from './game/scoring'
import { ConfirmPicksScreen } from './screens/ConfirmPicksScreen'
import { GameWeekScreen } from './screens/GameWeekScreen'
import { ResultsScreen } from './screens/ResultsScreen'

interface Resolution {
  outcomes: ResolvedOutcome[]
  score: ScoreResult
}

function App() {
  const shortlist = useMemo(() => buildShortlist(gameWeek), [])
  const [screen, setScreen] = useState<Screen>('shortlist')
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<string[]>([])
  const [resolution, setResolution] = useState<Resolution | null>(null)

  const picks = shortlist.filter((entry) => selectedPlayerIds.includes(entry.player.id))

  function handleTogglePlayer(playerId: string) {
    setSelectedPlayerIds((current) => {
      if (current.includes(playerId)) return current.filter((id) => id !== playerId)
      if (current.length >= MAX_PICKS) return current
      return [...current, playerId]
    })
  }

  function handleLockIn() {
    const outcomes = resolveGameWeek(shortlist)
    const pick: Pick = { gameWeekId: gameWeek.id, playerIds: selectedPlayerIds }
    const score = computeScoreResult(pick, outcomes)
    setResolution({ outcomes, score })
    setScreen('results')
  }

  function handlePlayAgain() {
    setSelectedPlayerIds([])
    setResolution(null)
    setScreen('shortlist')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {screen === 'shortlist' && (
        <GameWeekScreen
          gameWeekLabel={gameWeek.label}
          shortlist={shortlist}
          selectedPlayerIds={selectedPlayerIds}
          onTogglePlayer={handleTogglePlayer}
          onConfirm={() => setScreen('confirm')}
        />
      )}

      {screen === 'confirm' && (
        <ConfirmPicksScreen
          gameWeekLabel={gameWeek.label}
          picks={picks}
          onBack={() => setScreen('shortlist')}
          onLockIn={handleLockIn}
        />
      )}

      {screen === 'results' && resolution && (
        <ResultsScreen
          gameWeekLabel={gameWeek.label}
          picks={picks}
          outcomesByPlayerId={new Map(resolution.outcomes.map((o) => [o.playerId, o]))}
          score={resolution.score}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  )
}

export default App
