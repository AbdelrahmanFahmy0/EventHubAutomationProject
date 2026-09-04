# Conventions Log

Tracks accepted updates to `.agents/test-generator/test-generator.md` and
`.agents/test-generator/references/*.template`.
Every entry here was proposed by the agent and explicitly confirmed by the repo owner before
being persisted — the agent never edits this file or the templates silently.

Format: `Updated <date> — <what changed and why>`

---

Updated 2026-09-04 — Made the repo-agnostic templates under `references/*.template` the default
structural scaffold the agent applies to every new Page Object, test file, fixture wiring, and API
endpoint class, adapted to each repository's real discovered conventions. Real repo files still
win when one already covers the same case. Rewrote all four templates to use plain Playwright
syntax and placeholder names instead of any one project's classes/imports, so they apply across
repositories.
