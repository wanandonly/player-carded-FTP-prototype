import { useEffect, useMemo, useState } from 'react'
import { gameWeek } from './data/gameWeeks.mock'
import type { Pick, ResolvedOutcome, ScoreResult } from './data/types'
import { buildShortlist } from './game/buildShortlist'
import type { Screen } from './game/gameState'
import { resolveGameWeek } from './game/resolveGameWeek'
import { computeScoreResult } from './game/scoring'
import { AppHeader } from './components/AppHeader'
import { HowToPlay } from './components/HowToPlay'
import { ConfirmPicksScreen } from './screens/ConfirmPicksScreen'
import { GameWeekScreen } from './screens/GameWeekScreen'
import { LeaderboardScreen } from './screens/LeaderboardScreen'
import { ResultsScreen } from './screens/ResultsScreen'

interface Resolution {
  pick: Pick
  outcomes: ResolvedOutcome[]
  score: ScoreResult
}

function App() {
  const shortlist = useMemo(() => buildShortlist(gameWeek), [])
  const [screen, setScreen] = useState<Screen>('shortlist')
  const [predictions, setPredictions] = useState<Record<string, boolean>>({})
  const [resolution, setResolution] = useState<Resolution | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen, showLeaderboard])

  function handleSetPrediction(playerId: string, willBeBooked: boolean | null) {
    setPredictions((current) => {
      if (willBeBooked === null) {
        const next = { ...current }
        delete next[playerId]
        return next
      }
      return { ...current, [playerId]: willBeBooked }
    })
  }

  function handleLockIn() {
    const outcomes = resolveGameWeek(shortlist)
    const pick: Pick = {
      gameWeekId: gameWeek.id,
      predictions: shortlist.map((entry) => ({
        playerId: entry.player.id,
        willBeBooked: predictions[entry.player.id] ?? false,
      })),
    }
    const score = computeScoreResult(pick, outcomes)
    setResolution({ pick, outcomes, score })
    setScreen('results')
  }

  function handlePlayAgain() {
    setPredictions({})
    setResolution(null)
    setScreen('shortlist')
    setShowLeaderboard(false)
  }

  const outcomesByPlayerId = useMemo(
    () => (resolution ? new Map(resolution.outcomes.map((o) => [o.playerId, o])) : null),
    [resolution],
  )

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppHeader
        activeTab={showLeaderboard ? 'leaderboard' : 'picks'}
        onNavigate={(tab) => setShowLeaderboard(tab === 'leaderboard')}
        canViewLeaderboard={resolution !== null}
      />
      <HowToPlay />

      {showLeaderboard ? (
        <LeaderboardScreen
          gameWeekLabel={gameWeek.label}
          gameWeekId={gameWeek.id}
          shortlist={shortlist}
          you={
            resolution && outcomesByPlayerId
              ? { predictions: resolution.pick.predictions, outcomesByPlayerId, score: resolution.score }
              : null
          }
        />
      ) : (
        <>
          {screen === 'shortlist' && (
            <GameWeekScreen
              gameWeekLabel={gameWeek.label}
              shortlist={shortlist}
              predictions={predictions}
              onSetPrediction={handleSetPrediction}
              onConfirm={() => setScreen('confirm')}
            />
          )}

          {screen === 'confirm' && (
            <ConfirmPicksScreen
              gameWeekLabel={gameWeek.label}
              shortlist={shortlist}
              predictions={predictions}
              onBack={() => setScreen('shortlist')}
              onLockIn={handleLockIn}
            />
          )}

          {screen === 'results' && resolution && outcomesByPlayerId && (
            <ResultsScreen
              gameWeekLabel={gameWeek.label}
              shortlist={shortlist}
              outcomesByPlayerId={outcomesByPlayerId}
              predictionsByPlayerId={new Map(resolution.pick.predictions.map((p) => [p.playerId, p.willBeBooked]))}
              score={resolution.score}
              onPlayAgain={handlePlayAgain}
            />
          )}
        </>
      )}
    </div>
  )
}

export default App
