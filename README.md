# player-carded-FTP-prototype

A clickable UX prototype for a free-to-play "Player Card Betting" game: pick which players you think will be booked (yellow/red carded) each game week, from a pre-defined shortlist, in the style of Predict-7 but for cards. Shows foul/card/referee stats and a risk indicator % per player.

All data is fabricated mock data — there is no backend or live data integration. This is a UX/game-feel prototype, not a stats engine.

## Running it

```
pnpm install
pnpm run dev
```

Then open the printed local URL and click through: pick up to 7 players on the shortlist → Review Picks → Lock In Picks → Results → Play Again.

## Structure

- `src/data/` — mock domain data (teams, players, referees, fixtures, game week, stats) and shared types
- `src/game/` — game logic: the risk indicator heuristic (`riskEngine.ts`, explicitly illustrative, not a real predictive model), mock game week resolution, and scoring
- `src/components/` — shared UI pieces (player card, risk badge, stat bar, form chips)
- `src/screens/` — the three game screens (shortlist, confirm picks, results)

## Deferred / future work

- 2D stat charts (e.g. Recharts) — stretch enhancement layered on top of the existing stat display
- 3D visualisation — later, isolated exploratory spike
- "Who gets booked first" alternate game mode — noted as a future direction, not designed yet
