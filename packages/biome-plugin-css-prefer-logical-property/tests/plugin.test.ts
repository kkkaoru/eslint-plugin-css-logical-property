// Biome plugin integration tests
// Runtime: bun

import { it, expect } from "vitest";
import {
  type BiomeResult,
  PROPERTIES_PLUGIN,
  UNITS_PLUGIN,
  VALUES_PLUGIN,
  cleanupTmpDir,
  createTmpDir,
  runBiome,
} from "./test-helpers.ts";

// --- Property detection tests ---

it("detects width as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { width: 100px; }", [
      PROPERTIES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("inline-size"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects height as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { height: 100px; }", [
      PROPERTIES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("block-size"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects margin-left as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { margin-left: 10px; }", [
      PROPERTIES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("margin-inline-start"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects padding-top as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { padding-top: 5px; }", [
      PROPERTIES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("padding-block-start"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects border-right as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(
      tmpDir,
      ".a { border-right: 1px solid red; }",
      [PROPERTIES_PLUGIN],
    );
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("border-inline-end"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects border-top-left-radius as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(
      tmpDir,
      ".a { border-top-left-radius: 4px; }",
      [PROPERTIES_PLUGIN],
    );
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("border-start-start-radius"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects overflow-x as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { overflow-x: hidden; }", [
      PROPERTIES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("overflow-inline"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects scroll-padding-bottom as physical property", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(
      tmpDir,
      ".a { scroll-padding-bottom: 10px; }",
      [PROPERTIES_PLUGIN],
    );
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("scroll-padding-block-end"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag logical property inline-size", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { inline-size: 100px; }", [
      PROPERTIES_PLUGIN,
    ]);
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical property"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag logical property margin-inline-start", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(
      tmpDir,
      ".a { margin-inline-start: 10px; }",
      [PROPERTIES_PLUGIN],
    );
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical property"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

// --- Value detection tests ---

it("detects text-align: left as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { text-align: left; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("start"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects text-align: right as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { text-align: right; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("end"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects float: left as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { float: left; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("inline-start"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects clear: right as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { clear: right; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("inline-end"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects resize: horizontal as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { resize: horizontal; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("inline"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects resize: vertical as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { resize: vertical; }", [
      VALUES_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("block"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag text-align: start as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { text-align: start; }", [
      VALUES_PLUGIN,
    ]);
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical value"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag float: inline-start as physical value", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(
      tmpDir,
      ".a { float: inline-start; }",
      [VALUES_PLUGIN],
    );
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical value"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

// --- Unit detection tests ---

it("detects 100vh as physical unit", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { height: 100vh; }", [
      UNITS_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("vb"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects 100vw as physical unit", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { width: 100vw; }", [
      UNITS_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("vi"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects dvh as physical unit", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { height: 100dvh; }", [
      UNITS_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("dvb"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects svw as physical unit", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { width: 50svw; }", [
      UNITS_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("svi"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("detects cqw as physical unit", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { width: 50cqw; }", [
      UNITS_PLUGIN,
    ]);
    expect(result.stdout + result.stderr).toStrictEqual(
      expect.stringContaining("cqi"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag logical unit vb", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { height: 100vb; }", [
      UNITS_PLUGIN,
    ]);
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical unit"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});

it("does not flag logical unit vi", () => {
  const tmpDir: string = createTmpDir();
  try {
    const result: BiomeResult = runBiome(tmpDir, ".a { width: 100vi; }", [
      UNITS_PLUGIN,
    ]);
    const output: string = result.stdout + result.stderr;
    expect(output).not.toStrictEqual(
      expect.stringContaining("Use logical unit"),
    );
  } finally {
    cleanupTmpDir(tmpDir);
  }
});
