import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import css from "@eslint/css";
import cssLogicalPropertyAutofix from "eslint-plugin-css-logical-property-autofix";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfigs = compat
  .extends("next/core-web-vitals", "next/typescript")
  .map((config) => ({
    ...config,
    files: ["**/*.{js,jsx,ts,tsx}"],
  }));

const eslintConfig = [
  ...nextConfigs,
  {
    files: ["**/*.css"],
    plugins: { css },
    language: "css/css",
  },
  {
    files: ["**/*.css"],
    ...cssLogicalPropertyAutofix.configs.recommended,
  },
];

export default eslintConfig;
