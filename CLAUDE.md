---
description: Use Bun instead of Node.js, npm, pnpm, or vite.
globs: "*.ts, *.tsx, *.html, *.css, *.js, *.jsx, package.json"
alwaysApply: false
---

Always use CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS for development.

## Project overview

ESLint plugin that enforces CSS logical properties, values, and units with autofix support, built on top of `@eslint/css`. Structured as a bun monorepo.

## Monorepo structure

- `packages/eslint-plugin-css-logical-property-autofix/` - The ESLint plugin package
  - `src/replacements.ts` - All physical-to-logical mapping definitions (properties, values, units)
  - `src/rules/` - Rule implementations and their co-located test files
  - `src/plugin.ts` - Plugin entry point with recommended config

## Commands

- `bun install` - Install dependencies
- `bun run lint` - Run oxlint
- `bun run fmt` - Format with oxfmt
- `bun run fmt:check` - Check formatting
- `cd packages/eslint-plugin-css-logical-property-autofix && bun run test` - Run tests
- `cd packages/eslint-plugin-css-logical-property-autofix && bun run test:coverage` - Run tests with coverage
- `cd packages/eslint-plugin-css-logical-property-autofix && bun run build` - Build with tsdown
- `bunx tsc --noEmit` - Type check

## Code style

- Use bun runtime (add `// Runtime: bun` comment to each file)
- No `as` type assertions
- No non-null assertions (`!`)
- No `any` types
- No `return` statements where arrow function sugar can be used
- No `let` - use `const` only
- No `enum` - use union types
- No barrel `index.ts` files
- Use guard clauses to minimize nesting
- Use ternary operators where readable
- Combine related guard conditions with `||`
- Comments and logs in English only
- Linting: oxlint (strict config in `.oxlintrc.json`)
- Formatting: oxfmt (config in `.oxfmtrc.json`)

## Testing

- Use vitest (never `bun:test`)
- Test files co-located with source: `*.test.ts` in the same directory
- Use ESLint `RuleTester` with `@eslint/css` for rule tests
- Maintain >= 90% coverage (all metrics)
- Do NOT make test code DRY - keep tests explicit and verbose
- No `for` loops in tests
- Minimize `describe` usage
- Use `toStrictEqual` (not `toEqual`)
- Never use `toContain` or `expect(.includes()).toBe(true)`
- Assert with fixed literal values, not variables

## Lint & type check

- `bunx tsc --noEmit` must pass with zero errors
- `bun run lint` (oxlint) must pass with zero warnings and errors
- `bun run fmt:check` (oxfmt) must pass
- Always run these checks after modifying `.ts` files
