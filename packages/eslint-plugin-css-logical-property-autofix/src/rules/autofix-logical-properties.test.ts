// Tests for autofix-logical-properties rule
// Runtime: bun

import { it, expect } from "vitest";
import { RuleTester } from "eslint";
import css from "@eslint/css";
import rule from "./autofix-logical-properties.ts";

const ruleTester = new RuleTester({
  language: "css/css",
  plugins: { css },
});

ruleTester.run("autofix-logical-properties", rule, {
  valid: [
    { code: "a { inline-size: 100px; }" },
    { code: "a { block-size: 100px; }" },
    { code: "a { margin-inline-start: 10px; }" },
    { code: "a { margin-inline-end: 10px; }" },
    { code: "a { margin-block-start: 10px; }" },
    { code: "a { margin-block-end: 10px; }" },
    { code: "a { padding-inline-start: 10px; }" },
    { code: "a { padding-inline-end: 10px; }" },
    { code: "a { padding-block-start: 10px; }" },
    { code: "a { padding-block-end: 10px; }" },
    { code: "a { inset-inline-start: 0; }" },
    { code: "a { inset-inline-end: 0; }" },
    { code: "a { inset-block-start: 0; }" },
    { code: "a { inset-block-end: 0; }" },
    { code: "a { border-inline-start: 1px solid; }" },
    { code: "a { border-inline-end: 1px solid; }" },
    { code: "a { border-block-start: 1px solid; }" },
    { code: "a { border-block-end: 1px solid; }" },
    { code: "a { color: red; }" },
    { code: "a { display: flex; }" },
    {
      code: "a { width: 100px; }",
      options: [{ allowProperties: ["width"] }],
    },
    {
      code: "a { height: 100px; }",
      options: [{ allowProperties: ["height"] }],
    },
    {
      code: "a { margin-left: 10px; }",
      options: [{ allowProperties: ["margin-left"] }],
    },
    {
      code: "@supports (width: 100px) { a { color: red; } }",
    },
  ],
  invalid: [
    {
      code: "a { width: 100px; }",
      output: "a { inline-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "width", replacement: "inline-size" },
        },
      ],
    },
    {
      code: "a { height: 100px; }",
      output: "a { block-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "height", replacement: "block-size" },
        },
      ],
    },
    {
      code: "a { margin-left: 10px; }",
      output: "a { margin-inline-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "margin-left", replacement: "margin-inline-start" },
        },
      ],
    },
    {
      code: "a { margin-right: 10px; }",
      output: "a { margin-inline-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "margin-right", replacement: "margin-inline-end" },
        },
      ],
    },
    {
      code: "a { margin-top: 10px; }",
      output: "a { margin-block-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "margin-top", replacement: "margin-block-start" },
        },
      ],
    },
    {
      code: "a { margin-bottom: 10px; }",
      output: "a { margin-block-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "margin-bottom", replacement: "margin-block-end" },
        },
      ],
    },
    {
      code: "a { padding-left: 10px; }",
      output: "a { padding-inline-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "padding-left",
            replacement: "padding-inline-start",
          },
        },
      ],
    },
    {
      code: "a { padding-right: 10px; }",
      output: "a { padding-inline-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "padding-right",
            replacement: "padding-inline-end",
          },
        },
      ],
    },
    {
      code: "a { padding-top: 10px; }",
      output: "a { padding-block-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "padding-top",
            replacement: "padding-block-start",
          },
        },
      ],
    },
    {
      code: "a { padding-bottom: 10px; }",
      output: "a { padding-block-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "padding-bottom",
            replacement: "padding-block-end",
          },
        },
      ],
    },
    {
      code: "a { top: 0; }",
      output: "a { inset-block-start: 0; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "top", replacement: "inset-block-start" },
        },
      ],
    },
    {
      code: "a { bottom: 0; }",
      output: "a { inset-block-end: 0; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "bottom", replacement: "inset-block-end" },
        },
      ],
    },
    {
      code: "a { left: 0; }",
      output: "a { inset-inline-start: 0; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "left", replacement: "inset-inline-start" },
        },
      ],
    },
    {
      code: "a { right: 0; }",
      output: "a { inset-inline-end: 0; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "right", replacement: "inset-inline-end" },
        },
      ],
    },
    {
      code: "a { border-left: 1px solid; }",
      output: "a { border-inline-start: 1px solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-left",
            replacement: "border-inline-start",
          },
        },
      ],
    },
    {
      code: "a { border-right: 1px solid; }",
      output: "a { border-inline-end: 1px solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "border-right", replacement: "border-inline-end" },
        },
      ],
    },
    {
      code: "a { border-top: 1px solid; }",
      output: "a { border-block-start: 1px solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "border-top", replacement: "border-block-start" },
        },
      ],
    },
    {
      code: "a { border-bottom: 1px solid; }",
      output: "a { border-block-end: 1px solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom",
            replacement: "border-block-end",
          },
        },
      ],
    },
    {
      code: "a { max-width: 100px; }",
      output: "a { max-inline-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "max-width", replacement: "max-inline-size" },
        },
      ],
    },
    {
      code: "a { max-height: 100px; }",
      output: "a { max-block-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "max-height", replacement: "max-block-size" },
        },
      ],
    },
    {
      code: "a { min-width: 100px; }",
      output: "a { min-inline-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "min-width", replacement: "min-inline-size" },
        },
      ],
    },
    {
      code: "a { min-height: 100px; }",
      output: "a { min-block-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "min-height", replacement: "min-block-size" },
        },
      ],
    },
    {
      code: "a { border-top-left-radius: 5px; }",
      output: "a { border-start-start-radius: 5px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-top-left-radius",
            replacement: "border-start-start-radius",
          },
        },
      ],
    },
    {
      code: "a { border-top-right-radius: 5px; }",
      output: "a { border-start-end-radius: 5px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-top-right-radius",
            replacement: "border-start-end-radius",
          },
        },
      ],
    },
    {
      code: "a { border-bottom-left-radius: 5px; }",
      output: "a { border-end-start-radius: 5px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom-left-radius",
            replacement: "border-end-start-radius",
          },
        },
      ],
    },
    {
      code: "a { border-bottom-right-radius: 5px; }",
      output: "a { border-end-end-radius: 5px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom-right-radius",
            replacement: "border-end-end-radius",
          },
        },
      ],
    },
    {
      code: "a { overflow-x: auto; }",
      output: "a { overflow-inline: auto; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "overflow-x", replacement: "overflow-inline" },
        },
      ],
    },
    {
      code: "a { overflow-y: auto; }",
      output: "a { overflow-block: auto; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: { property: "overflow-y", replacement: "overflow-block" },
        },
      ],
    },
    {
      code: "a { overscroll-behavior-x: contain; }",
      output: "a { overscroll-behavior-inline: contain; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "overscroll-behavior-x",
            replacement: "overscroll-behavior-inline",
          },
        },
      ],
    },
    {
      code: "a { overscroll-behavior-y: contain; }",
      output: "a { overscroll-behavior-block: contain; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "overscroll-behavior-y",
            replacement: "overscroll-behavior-block",
          },
        },
      ],
    },
    {
      code: "a { contain-intrinsic-width: 100px; }",
      output: "a { contain-intrinsic-inline-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "contain-intrinsic-width",
            replacement: "contain-intrinsic-inline-size",
          },
        },
      ],
    },
    {
      code: "a { contain-intrinsic-height: 100px; }",
      output: "a { contain-intrinsic-block-size: 100px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "contain-intrinsic-height",
            replacement: "contain-intrinsic-block-size",
          },
        },
      ],
    },
    {
      code: "a { scroll-margin-top: 10px; }",
      output: "a { scroll-margin-block-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-margin-top",
            replacement: "scroll-margin-block-start",
          },
        },
      ],
    },
    {
      code: "a { scroll-margin-bottom: 10px; }",
      output: "a { scroll-margin-block-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-margin-bottom",
            replacement: "scroll-margin-block-end",
          },
        },
      ],
    },
    {
      code: "a { scroll-margin-left: 10px; }",
      output: "a { scroll-margin-inline-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-margin-left",
            replacement: "scroll-margin-inline-start",
          },
        },
      ],
    },
    {
      code: "a { scroll-margin-right: 10px; }",
      output: "a { scroll-margin-inline-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-margin-right",
            replacement: "scroll-margin-inline-end",
          },
        },
      ],
    },
    {
      code: "a { scroll-padding-top: 10px; }",
      output: "a { scroll-padding-block-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-padding-top",
            replacement: "scroll-padding-block-start",
          },
        },
      ],
    },
    {
      code: "a { scroll-padding-bottom: 10px; }",
      output: "a { scroll-padding-block-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-padding-bottom",
            replacement: "scroll-padding-block-end",
          },
        },
      ],
    },
    {
      code: "a { scroll-padding-left: 10px; }",
      output: "a { scroll-padding-inline-start: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-padding-left",
            replacement: "scroll-padding-inline-start",
          },
        },
      ],
    },
    {
      code: "a { scroll-padding-right: 10px; }",
      output: "a { scroll-padding-inline-end: 10px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "scroll-padding-right",
            replacement: "scroll-padding-inline-end",
          },
        },
      ],
    },
    {
      code: "a { border-left-color: red; }",
      output: "a { border-inline-start-color: red; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-left-color",
            replacement: "border-inline-start-color",
          },
        },
      ],
    },
    {
      code: "a { border-right-color: red; }",
      output: "a { border-inline-end-color: red; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-right-color",
            replacement: "border-inline-end-color",
          },
        },
      ],
    },
    {
      code: "a { border-top-color: red; }",
      output: "a { border-block-start-color: red; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-top-color",
            replacement: "border-block-start-color",
          },
        },
      ],
    },
    {
      code: "a { border-bottom-color: red; }",
      output: "a { border-block-end-color: red; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom-color",
            replacement: "border-block-end-color",
          },
        },
      ],
    },
    {
      code: "a { border-left-style: solid; }",
      output: "a { border-inline-start-style: solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-left-style",
            replacement: "border-inline-start-style",
          },
        },
      ],
    },
    {
      code: "a { border-right-style: solid; }",
      output: "a { border-inline-end-style: solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-right-style",
            replacement: "border-inline-end-style",
          },
        },
      ],
    },
    {
      code: "a { border-top-style: solid; }",
      output: "a { border-block-start-style: solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-top-style",
            replacement: "border-block-start-style",
          },
        },
      ],
    },
    {
      code: "a { border-bottom-style: solid; }",
      output: "a { border-block-end-style: solid; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom-style",
            replacement: "border-block-end-style",
          },
        },
      ],
    },
    {
      code: "a { border-left-width: 1px; }",
      output: "a { border-inline-start-width: 1px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-left-width",
            replacement: "border-inline-start-width",
          },
        },
      ],
    },
    {
      code: "a { border-right-width: 1px; }",
      output: "a { border-inline-end-width: 1px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-right-width",
            replacement: "border-inline-end-width",
          },
        },
      ],
    },
    {
      code: "a { border-top-width: 1px; }",
      output: "a { border-block-start-width: 1px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-top-width",
            replacement: "border-block-start-width",
          },
        },
      ],
    },
    {
      code: "a { border-bottom-width: 1px; }",
      output: "a { border-block-end-width: 1px; }",
      errors: [
        {
          messageId: "notLogicalProperty",
          data: {
            property: "border-bottom-width",
            replacement: "border-block-end-width",
          },
        },
      ],
    },
  ],
});

it("should export PROPERTIES_REPLACEMENTS map from replacements", async () => {
  const { PROPERTIES_REPLACEMENTS } =
    await import("../replacements.ts");
  expect(PROPERTIES_REPLACEMENTS).toBeInstanceOf(Map);
  expect(PROPERTIES_REPLACEMENTS.get("width")).toBe("inline-size");
  expect(PROPERTIES_REPLACEMENTS.get("height")).toBe("block-size");
  expect(PROPERTIES_REPLACEMENTS.get("margin-left")).toBe(
    "margin-inline-start",
  );
});
