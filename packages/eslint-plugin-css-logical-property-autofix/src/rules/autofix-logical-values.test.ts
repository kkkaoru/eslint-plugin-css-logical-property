// Tests for autofix-logical-values rule
// Runtime: bun

import { it, expect } from "vitest";
import { RuleTester } from "eslint";
import css from "@eslint/css";
import rule from "./autofix-logical-values.ts";

const ruleTester = new RuleTester({
  language: "css/css",
  plugins: { css },
});

ruleTester.run("autofix-logical-values", rule, {
  valid: [
    { code: "a { text-align: start; }" },
    { code: "a { text-align: end; }" },
    { code: "a { text-align: center; }" },
    { code: "a { text-align: justify; }" },
    { code: "a { float: inline-start; }" },
    { code: "a { float: inline-end; }" },
    { code: "a { float: none; }" },
    { code: "a { clear: inline-start; }" },
    { code: "a { clear: inline-end; }" },
    { code: "a { clear: both; }" },
    { code: "a { resize: inline; }" },
    { code: "a { resize: block; }" },
    { code: "a { resize: both; }" },
    { code: "a { resize: none; }" },
    { code: "a { caption-side: top; }" },
    { code: "a { caption-side: bottom; }" },
    { code: "a { caption-side: inline-start; }" },
    { code: "a { caption-side: inline-end; }" },
    { code: "a { color: red; }" },
    { code: "a { display: flex; }" },
    {
      code: "a { text-align: left; }",
      options: [{ allowValues: ["left"] }],
    },
    {
      code: "a { text-align: right; }",
      options: [{ allowValues: ["right"] }],
    },
    {
      code: "a { float: left; }",
      options: [{ allowValues: ["left"] }],
    },
    {
      code: "@supports (text-align: left) { a { color: red; } }",
    },
    { code: "a { text-align: 10px; }" },
  ],
  invalid: [
    {
      code: "a { text-align: left; }",
      output: "a { text-align: start; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "left", replacement: "start" },
        },
      ],
    },
    {
      code: "a { text-align: right; }",
      output: "a { text-align: end; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "right", replacement: "end" },
        },
      ],
    },
    {
      code: "a { float: left; }",
      output: "a { float: inline-start; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "left", replacement: "inline-start" },
        },
      ],
    },
    {
      code: "a { float: right; }",
      output: "a { float: inline-end; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "right", replacement: "inline-end" },
        },
      ],
    },
    {
      code: "a { clear: left; }",
      output: "a { clear: inline-start; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "left", replacement: "inline-start" },
        },
      ],
    },
    {
      code: "a { clear: right; }",
      output: "a { clear: inline-end; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "right", replacement: "inline-end" },
        },
      ],
    },
    {
      code: "a { resize: horizontal; }",
      output: "a { resize: inline; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "horizontal", replacement: "inline" },
        },
      ],
    },
    {
      code: "a { resize: vertical; }",
      output: "a { resize: block; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "vertical", replacement: "block" },
        },
      ],
    },
    {
      code: "a { caption-side: left; }",
      output: "a { caption-side: inline-start; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "left", replacement: "inline-start" },
        },
      ],
    },
    {
      code: "a { caption-side: right; }",
      output: "a { caption-side: inline-end; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "right", replacement: "inline-end" },
        },
      ],
    },
    {
      code: "a { box-orient: horizontal; }",
      output: "a { box-orient: inline-axis; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "horizontal", replacement: "inline-axis" },
        },
      ],
    },
    {
      code: "a { box-orient: vertical; }",
      output: "a { box-orient: block-axis; }",
      errors: [
        {
          messageId: "notLogicalValue",
          data: { value: "vertical", replacement: "block-axis" },
        },
      ],
    },
  ],
});

it("should export PROPERTY_VALUES_REPLACEMENTS map from replacements", async () => {
  const { PROPERTY_VALUES_REPLACEMENTS } =
    await import("../replacements.ts");
  expect(PROPERTY_VALUES_REPLACEMENTS).toBeInstanceOf(Map);
  expect(PROPERTY_VALUES_REPLACEMENTS.get("text-align")).toStrictEqual({
    left: "start",
    right: "end",
  });
  expect(PROPERTY_VALUES_REPLACEMENTS.get("float")).toStrictEqual({
    left: "inline-start",
    right: "inline-end",
  });
});
