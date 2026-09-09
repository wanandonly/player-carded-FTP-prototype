import { useEffect, useMemo, useState } from 'react'
import { gameWeek, gameWeekHasFinished } from './data/gameWeeks.mock'
import { mockPastResults } from './data/results.mock'
import type { HistoryEntry, Pick } from './data/types'
import { buildShortlist } from './game/buildShortlist'
import type { Screen } from './game/gameState'
import { resolveGameWeek } from './game/resolveGameWeek'
import { computeScoreResult } from './game/scoring'
import { AppHeader } from './components/AppHeader'
import { HowToPlay } from './components/HowToPlay'
import { ResponsibleGamblingFooter } from './components/ResponsibleGamblingFooter'
import { ConfirmPicksScreen } from './screens/ConfirmPicksScreen'
import { GameWeekScreen } from './screens/GameWeekScreen'
import { LeaderboardScreen } from './screens/LeaderboardScreen'
import { ResultsScreen } from './screens/ResultsScreen'

type Tab = 'picks' | 'leaderboard' | 'results'

function App() {
  const shortlist = useMemo(() => buildShortlist(gameWeek), [])
  const riskPercentByPlayerId = useMemo(
    () => new Map(shortlist.map((entry) => [entry.player.id, entry.risk.riskPercent])),
    [shortlist],
  )
  const [screen, setScreen] = useState<Screen>('shortlist')
  const [predictions, setPredictions] = useState<Record<string, boolean>>({})
  const [tiebreakerGuessMinute, setTiebreakerGuessMinute] = useState<number | null>(null)
  const [playedHistory, setPlayedHistory] = useState<HistoryEntry[]>([])
  const [activeTab, setActiveTab] = useState<Tab>('picks')

  const current = playedHistory[0] ?? null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen, activeTab])

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
      tiebreakerGuessMinute: tiebreakerGuessMinute ?? 0,
    }
    const score = computeScoreResult(pick, outcomes, riskPercentByPlayerId)
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      playedAt: new Date().toISOString(),
      gameWeekId: pick.gameWeekId,
      predictions: pick.predictions,
      outcomes,
      score,
    }
    setPlayedHistory((current) => [entry, ...current])
    setPredictions({})
    setTiebreakerGuessMinute(null)
    setScreen('shortlist')
    setActiveTab('results')
  }

  function handleGoToPicks() {
    setActiveTab('picks')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <AppHeader activeTab={activeTab} onNavigate={setActiveTab} />
      <HowToPlay />

      {activeTab === 'leaderboard' && (
        <LeaderboardScreen
          gameWeekLabel={gameWeek.label}
          gameWeekId={gameWeek.id}
          shortlist={shortlist}
          hasFinished={gameWeekHasFinished}
          you={
            current
              ? {
                  predictions: current.predictions,
                  outcomesByPlayerId: new Map(current.outcomes.map((o) => [o.playerId, o])),
                  score: current.score,
                  submittedAt: current.playedAt,
                }
              : null
          }
        />
      )}

      {activeTab === 'results' && (
        <ResultsScreen
          gameWeekLabel={gameWeek.label}
          shortlist={shortlist}
          current={current}
          pastEntries={[...playedHistory.slice(1), ...mockPastResults]}
          onGoToPicks={handleGoToPicks}
        />
      )}

      {activeTab === 'picks' && (
        <>
          {screen === 'shortlist' && (
            <GameWeekScreen
              gameWeekLabel={gameWeek.label}
              shortlist={shortlist}
              predictions={predictions}
              onSetPrediction={handleSetPrediction}
              tiebreakerGuessMinute={tiebreakerGuessMinute}
              onSetTiebreakerGuessMinute={setTiebreakerGuessMinute}
              onConfirm={() => setScreen('confirm')}
            />
          )}

          {screen === 'confirm' && (
            <ConfirmPicksScreen
              gameWeekLabel={gameWeek.label}
              shortlist={shortlist}
              predictions={predictions}
              tiebreakerGuessMinute={tiebreakerGuessMinute}
              onBack={() => setScreen('shortlist')}
              onLockIn={handleLockIn}
            />
          )}
        </>
      )}

      <ResponsibleGamblingFooter />
    </div>
  )
}

export default App
