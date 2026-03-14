// Biome plugin test helper utilities
// Runtime: bun

import { execSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

interface BiomeResult {
  stdout: string;
  stderr: string;
  exitCode: number;
}

interface ExecError extends Error {
  stdout: string;
  stderr: string;
  status: number;
}

const PACKAGE_DIR: string = join(import.meta.dirname, "..");
const BIOME_BIN: string = join(PACKAGE_DIR, "node_modules", ".bin", "biome");
const RULES_DIR: string = join(PACKAGE_DIR, "rules");

const PROPERTIES_PLUGIN: string = join(
  RULES_DIR,
  "prefer-logical-properties.grit",
);
const VALUES_PLUGIN: string = join(RULES_DIR, "prefer-logical-values.grit");
const UNITS_PLUGIN: string = join(RULES_DIR, "prefer-logical-units.grit");
const COMBINED_PLUGIN: string = join(RULES_DIR, "prefer-logical.grit");

const isExecError = (error: unknown): error is ExecError =>
  error instanceof Error &&
  "stdout" in error &&
  "stderr" in error &&
  "status" in error;

const createBiomeConfig = (pluginPaths: readonly string[]): string =>
  JSON.stringify({
    $schema: "https://biomejs.dev/schemas/2.0.0/schema.json",
    plugins: pluginPaths,
  });

const createTmpDir = (): string =>
  mkdtempSync(join(tmpdir(), "biome-plugin-test-"));

const cleanupTmpDir = (dir: string): void => {
  rmSync(dir, { recursive: true, force: true });
};

const runBiome = (
  tmpDir: string,
  cssContent: string,
  plugins: readonly string[],
): BiomeResult => {
  const biomeConfigPath: string = join(tmpDir, "biome.json");
  const cssFilePath: string = join(tmpDir, "test.css");

  writeFileSync(biomeConfigPath, createBiomeConfig(plugins));
  writeFileSync(cssFilePath, cssContent);

  try {
    const stdout: string = execSync(
      `${BIOME_BIN} lint ${cssFilePath} --config-path=${tmpDir}`,
      { encoding: "utf8", cwd: tmpDir, stdio: ["pipe", "pipe", "pipe"] },
    );
    return { stdout, stderr: "", exitCode: 0 };
  } catch (error: unknown) {
    /* v8 ignore next */
    if (!isExecError(error)) throw error;

    return {
      stdout: error.stdout,
      stderr: error.stderr,
      exitCode: error.status,
    };
  }
};

export {
  COMBINED_PLUGIN,
  PROPERTIES_PLUGIN,
  UNITS_PLUGIN,
  VALUES_PLUGIN,
  cleanupTmpDir,
  createTmpDir,
  runBiome,
};
export type { BiomeResult };
