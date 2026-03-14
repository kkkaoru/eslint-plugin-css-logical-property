# eslint-plugin-css-logical-property

Monorepo for ESLint plugins that enforce CSS logical properties.

## Packages

| Package | Version | Description |
|---|---|---|
| [eslint-plugin-css-logical-property-autofix](./packages/eslint-plugin-css-logical-property-autofix) | [![npm](https://img.shields.io/npm/v/eslint-plugin-css-logical-property-autofix)](https://www.npmjs.com/package/eslint-plugin-css-logical-property-autofix) | ESLint plugin that enforces CSS logical properties, values, and units with **autofix** support |

## Quick Start

```bash
npm install -D eslint-plugin-css-logical-property-autofix @eslint/css eslint
```

```js
// eslint.config.js
import css from "@eslint/css";
import cssLogicalPropertyAutofix from "eslint-plugin-css-logical-property-autofix";

export default [
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
  },
  cssLogicalPropertyAutofix.configs.recommended,
];
```

```bash
eslint --fix "**/*.css"
```

See the [plugin README](./packages/eslint-plugin-css-logical-property-autofix/README.md) for full documentation, rule details, and configuration options.

## Development

This project uses [bun](https://bun.sh) as the package manager and runtime.

```bash
bun install          # install dependencies
bun run lint         # run oxlint
bun run fmt          # format with oxfmt
bun run fmt:check    # check formatting

# plugin package
cd packages/eslint-plugin-css-logical-property-autofix
bun run test             # run tests
bun run test:coverage    # run tests with coverage
bun run build            # build with tsdown
```

## License

[MIT](./LICENSE)
