# Contributing Guide

Thank you for contributing to Music Maniac.

## Ground Rules

- keep changes focused and minimal
- preserve responsiveness for mobile and desktop
- maintain accessibility and keyboard support
- avoid unrelated refactors in the same pull request

## Local Setup

1. Fork the repository.
2. Clone your fork.
3. Install dependencies.

```bash
npm install
```

4. Start development server.

```bash
npm run dev
```

## Branch Naming

Use one of these prefixes:

- `feat/<short-description>`
- `fix/<short-description>`
- `chore/<short-description>`
- `docs/<short-description>`

## Development Checklist

Before opening a pull request, run:

```bash
npm run lint
npm run build
```

Ensure:

- no lint errors
- no TypeScript build errors
- UI works on narrow mobile widths
- no regressions in playback controls and playlist flow

## Commit Message Style

Use concise, imperative commit messages:

- `feat: add playlist song removal state`
- `fix: improve sidebar collapse alignment`
- `docs: update setup instructions`

## Pull Request Expectations

Include in your PR description:

- what changed
- why it changed
- any UX impact
- screenshots or short screen recordings for UI changes
- testing notes

## Reporting Issues

When filing an issue, include:

- expected behavior
- actual behavior
- steps to reproduce
- browser and OS
- screenshots if relevant

## Code Style

- TypeScript-first; keep types explicit where it improves clarity
- prefer small reusable components and hooks
- keep business logic out of purely presentational components
- use existing theme tokens and utility classes for visual consistency
