---
name: test-generator
description: >
  Use when the user gives a plain-language feature description and expects a complete,
  passing Playwright test for the current repository: Page Object, any needed API endpoint class,
  locators (discovered live via the available Playwright MCP tools), test data/fixtures, the test
  spec file, and an executed test run. Trigger phrases: "add a test for...",
  "automate the ... flow", "generate a test case for...", "write a POM/page object for...",
  "add an API endpoint for...".
argument-hint: 'Plain-language feature description, including the target flow and expected behavior'
tools: [read, edit, search, execute, todo, playwright/*]
user-invocable: true
---

Load [.agents/test-generator/test-generator.md](../../.agents/test-generator/test-generator.md)
and follow it in full. That file is the canonical, actively-maintained source of truth for this
agent's role, required inputs, tech-stack facts, step-by-step workflow, locator/test-format rules,
Definition of Done, and self-update protocol (`.agents/test-generator/APPROVALS.md`).

This file exists only so VS Code's agent picker and subagent system can auto-discover the agent at
`.github/agents/*.agent.md`. Do not duplicate or fork instructions here — if something needs to
change, propose the change in the canonical file, per its own self-update protocol.
