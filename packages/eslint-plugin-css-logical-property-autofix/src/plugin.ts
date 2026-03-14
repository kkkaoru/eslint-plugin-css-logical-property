// ESLint plugin for CSS logical property autofix enforcement
// Runtime: bun

import type { ESLint, Linter } from "eslint";
import { name, version } from "../package.json";
import autofixLogicalProperties from "./rules/autofix-logical-properties.ts";
import autofixLogicalValues from "./rules/autofix-logical-values.ts";
import autofixLogicalUnits from "./rules/autofix-logical-units.ts";

interface PluginConfig extends Linter.Config {
  name: string;
  plugins: Record<string, ESLint.Plugin>;
  language: string;
}

const configs: Record<string, PluginConfig> = {};

const plugin = {
  meta: {
    name,
    version,
  },
  rules: {
    "autofix-logical-properties": autofixLogicalProperties,
    "autofix-logical-values": autofixLogicalValues,
    "autofix-logical-units": autofixLogicalUnits,
  },
  configs,
} satisfies ESLint.Plugin;

Object.assign(configs, {
  recommended: {
    name: "css-logical-property-autofix/recommended",
    plugins: {
      "css-logical-property-autofix": plugin,
    },
    language: "css/css",
    rules: {
      "css-logical-property-autofix/autofix-logical-properties": "error",
      "css-logical-property-autofix/autofix-logical-values": "error",
      "css-logical-property-autofix/autofix-logical-units": "error",
    },
  },
});

export default plugin;
