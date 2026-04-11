# Chinese Shifu — Integrated Chinese Vocabulary Trainer

## Stack
- React + Vite (frontend)
- Firebase Auth (Google sign-in) + Firestore (cloud sync)
- Hosted on GitHub Pages via gh-pages package
- Repo: https://github.com/hinrinik/chinese-shifu

## Firebase Config
- Project: chinese-shufu
- Auth: Google sign-in enabled
- Firestore: production rules (user can only read/write own doc)
- Authorized domain: hinrinik.github.io

## Architecture
- Single file app: src/App.jsx
- All vocabulary in AW array, grouped by dialogue key (e.g. "ch11d1")
- DL array defines dialogues with chapter, dialogue number, title, book
- BOOKS array defines Book 1 (ch 1-10, coming soon) and Book 2 (ch 11-20)
- Users import dialogues individually — only imported words appear in reviews
- "My Class Words" category for custom words not in textbook

## SRS System
- Simple correct/incorrect (no again/hard/good/easy)
- Correct = advance to next stage, Incorrect = reset to stage 0 (New)
- Stages: New → 1d → 3d → 1w → 2w → 1m → Mastered (60d+)
- Wrong answers retry after 5 minutes

## Features
- Flashcard mode + Typing mode (fuzzy match English)
- Daily streak tracker (synced to cloud)
- Collapsible Book → Chapter → Dialogue navigation on Study + Chapters pages
- SRS stage visualization with color-coded bar
- Session size selector (10/20/30 cards)
- Filter by All / Class Words / Book / Chapter / Dialogue
- Word library with search

## Cloud Data Structure (Firestore: users/{uid})
- imported: string[] (dialogue keys like "ch11d1")
- srs: array of {id, rep, ef, nr, lr, cc, ic}
- classWords: array of {id, h, p, e, g:"class"}
- streak: {count, last}

## Vocabulary
- Book 2 Chapters 11-20: 375 words across 20 dialogues
- Book 1 Chapters 1-10: not yet added (placeholder "Coming soon")
- Word format: {id, h (hanzi), p (pinyin), e (english), g (group key)}

## Deploy
npm run deploy (builds + pushes to gh-pages branch)

## Vite Config
base: '/chinese-shifu/'
