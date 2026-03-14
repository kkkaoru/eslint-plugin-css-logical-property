// Tests for plugin entry point
// Runtime: bun

import { it, expect } from "vitest";
import plugin from "./plugin.ts";

it("should have correct meta name", () => {
  expect(plugin.meta.name).toBe("eslint-plugin-css-logical-property-autofix");
});

it("should have correct meta version", () => {
  expect(plugin.meta.version).toBe("0.1.0");
});

it("should read name and version from package.json", async () => {
  const pkg = await import("../package.json");
  expect(plugin.meta.name).toBe(pkg.name);
  expect(plugin.meta.version).toBe(pkg.version);
});

it("should have autofix-logical-properties rule registered", () => {
  const rules = plugin.rules ?? {};
  expect(rules["autofix-logical-properties"]).toBeDefined();
  const meta = rules["autofix-logical-properties"]?.meta ?? {};
  expect(meta.type).toBe("suggestion");
  expect(meta.fixable).toBe("code");
});

it("should have autofix-logical-values rule registered", () => {
  const rules = plugin.rules ?? {};
  expect(rules["autofix-logical-values"]).toBeDefined();
  const meta = rules["autofix-logical-values"]?.meta ?? {};
  expect(meta.type).toBe("suggestion");
  expect(meta.fixable).toBe("code");
});

it("should have autofix-logical-units rule registered", () => {
  const rules = plugin.rules ?? {};
  expect(rules["autofix-logical-units"]).toBeDefined();
  const meta = rules["autofix-logical-units"]?.meta ?? {};
  expect(meta.type).toBe("suggestion");
  expect(meta.fixable).toBe("code");
});

it("should have a recommended config", () => {
  expect(plugin.configs.recommended).toBeDefined();
});

it("should have correct recommended config name", () => {
  expect(plugin.configs.recommended?.name).toBe(
    "css-logical-property-autofix/recommended",
  );
});

it("should have correct recommended config language", () => {
  expect(plugin.configs.recommended?.language).toBe("css/css");
});

it("should have all rules set to error in recommended config", () => {
  expect(plugin.configs.recommended?.rules).toStrictEqual({
    "css-logical-property-autofix/autofix-logical-properties": "error",
    "css-logical-property-autofix/autofix-logical-values": "error",
    "css-logical-property-autofix/autofix-logical-units": "error",
  });
});

it("should have the plugin itself in recommended config plugins", () => {
  expect(
    plugin.configs.recommended?.plugins["css-logical-property-autofix"],
  ).toBeDefined();
});
