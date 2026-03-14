// Tests for autofix-logical-units rule
// Runtime: bun

import { it, expect } from "vitest";
import { RuleTester } from "eslint";
import css from "@eslint/css";
import rule from "./autofix-logical-units.ts";

const ruleTester = new RuleTester({
  language: "css/css",
  plugins: { css },
});

ruleTester.run("autofix-logical-units", rule, {
  valid: [
    { code: "a { block-size: 10vb; }" },
    { code: "a { inline-size: 10vi; }" },
    { code: "a { block-size: 10dvb; }" },
    { code: "a { inline-size: 10dvi; }" },
    { code: "a { block-size: 10svb; }" },
    { code: "a { inline-size: 10svi; }" },
    { code: "a { block-size: 10lvb; }" },
    { code: "a { inline-size: 10lvi; }" },
    { code: "a { block-size: 10cqb; }" },
    { code: "a { inline-size: 10cqi; }" },
    { code: "a { inline-size: 100px; }" },
    { code: "a { inline-size: 100%; }" },
    { code: "a { inline-size: 10em; }" },
    { code: "a { inline-size: 10rem; }" },
    {
      code: "a { block-size: 100vh; }",
      options: [{ allowUnits: ["vh"] }],
    },
    {
      code: "a { inline-size: 100vw; }",
      options: [{ allowUnits: ["vw"] }],
    },
    {
      code: "a { block-size: 50dvh; }",
      options: [{ allowUnits: ["dvh"] }],
    },
  ],
  invalid: [
    {
      code: "a { block-size: 100vh; }",
      output: "a { block-size: 100vb; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "vh", replacement: "vb" },
        },
      ],
    },
    {
      code: "a { inline-size: 100vw; }",
      output: "a { inline-size: 100vi; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "vw", replacement: "vi" },
        },
      ],
    },
    {
      code: "a { block-size: 50dvh; }",
      output: "a { block-size: 50dvb; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "dvh", replacement: "dvb" },
        },
      ],
    },
    {
      code: "a { inline-size: 50dvw; }",
      output: "a { inline-size: 50dvi; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "dvw", replacement: "dvi" },
        },
      ],
    },
    {
      code: "a { block-size: 50svh; }",
      output: "a { block-size: 50svb; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "svh", replacement: "svb" },
        },
      ],
    },
    {
      code: "a { inline-size: 50svw; }",
      output: "a { inline-size: 50svi; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "svw", replacement: "svi" },
        },
      ],
    },
    {
      code: "a { block-size: 50lvh; }",
      output: "a { block-size: 50lvb; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "lvh", replacement: "lvb" },
        },
      ],
    },
    {
      code: "a { inline-size: 50lvw; }",
      output: "a { inline-size: 50lvi; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "lvw", replacement: "lvi" },
        },
      ],
    },
    {
      code: "a { block-size: 10cqh; }",
      output: "a { block-size: 10cqb; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "cqh", replacement: "cqb" },
        },
      ],
    },
    {
      code: "a { inline-size: 10cqw; }",
      output: "a { inline-size: 10cqi; }",
      errors: [
        {
          messageId: "notLogicalUnit",
          data: { unit: "cqw", replacement: "cqi" },
        },
      ],
    },
  ],
});

it("should export UNIT_REPLACEMENTS map from replacements", async () => {
  const { UNIT_REPLACEMENTS } = await import("../replacements.ts");
  expect(UNIT_REPLACEMENTS).toBeInstanceOf(Map);
  expect(UNIT_REPLACEMENTS.get("vh")).toBe("vb");
  expect(UNIT_REPLACEMENTS.get("vw")).toBe("vi");
  expect(UNIT_REPLACEMENTS.get("dvh")).toBe("dvb");
  expect(UNIT_REPLACEMENTS.get("dvw")).toBe("dvi");
  expect(UNIT_REPLACEMENTS.get("cqh")).toBe("cqb");
  expect(UNIT_REPLACEMENTS.get("cqw")).toBe("cqi");
});
