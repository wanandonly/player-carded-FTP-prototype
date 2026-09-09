# player-carded-FTP-prototype

A clickable UX prototype for "The Card 7", a free-to-play player-carding prediction game: each game week shows a fixed shortlist of 7 players, and you predict "Will be booked" or "Won't be booked" (yellow/red carded) for every one of them. Shows foul/card/referee stats and a risk indicator % per player, and scores you on how many of the 7 you got right — get all 7 right and you win the jackpot.

All data is fabricated mock data — there is no backend or live data integration. This is a UX/game-feel prototype, not a stats engine.

## Running it

```
pnpm install
pnpm run dev
```

Then open the printed local URL and click through: predict Will be booked / Won't be booked for all 7 shortlisted players → Review Predictions → Lock In Picks → Results → check the Leaderboard → Play Again.

## Structure

- `src/data/` — mock domain data (teams, players, referees, fixtures, game week, stats, leaderboard rivals) and shared types
- `src/game/` — game logic: the risk indicator heuristic (`riskEngine.ts`, explicitly illustrative, not a real predictive model), mock game week resolution, and scoring
- `src/components/` — shared UI pieces (app header/nav, how-to-play rules, player card, risk badge, stat bar, form chips, screen header)
- `src/screens/` — the four game screens (shortlist/predictions, confirm predictions, results, leaderboard)

## Deferred / future work

- Opportunities to integrate betting into the app, could get the live odds for each player to be carded on each pick's card container or we do some suggested bets somewhere would need to think.
