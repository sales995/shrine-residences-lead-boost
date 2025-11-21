#!/usr/bin/env node

import { fileURLToPath } from "url";
import path from "path";
import { existsSync } from "fs";
import { rm, writeFile } from "fs/promises";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const esbuild = require("esbuild");
const resolveConfig = require("tailwindcss/resolveConfig");

const __filename = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(__filename), "..");
const tailwindConfigPath = path.resolve(projectRoot, "tailwind.config.ts");
const tempOutputPath = path.resolve(projectRoot, ".lov.tailwind.config.cjs");
const jsonOutputPath = path.resolve(projectRoot, "src", "tailwind.config.lov.json");

const logPrefix = "[lovable-tailwind]";
const log = (message) => console.log(`${logPrefix} ${message}`);

async function generateLovableTailwindConfig() {
  if (!existsSync(tailwindConfigPath)) {
    log(`tailwind.config.ts not found at ${tailwindConfigPath}. Skipping generation.`);
    return;
  }

  await esbuild.build({
    entryPoints: [tailwindConfigPath],
    outfile: tempOutputPath,
    bundle: true,
    platform: "node",
    format: "cjs",
    target: ["node18"],
    logLevel: "silent",
  });

  const compiledConfig = require(tempOutputPath);
  const configObject = compiledConfig?.default ?? compiledConfig;
  if (!configObject) {
    throw new Error("Unable to resolve Tailwind config export");
  }

  const resolvedConfig = resolveConfig(configObject);
  await writeFile(jsonOutputPath, JSON.stringify(resolvedConfig, null, 2), "utf-8");
  await rm(tempOutputPath, { force: true });

  log(`Generated ${path.relative(projectRoot, jsonOutputPath)}`);
}

generateLovableTailwindConfig().catch((error) => {
  log(`Failed to generate Lovable Tailwind metadata: ${error.message || error}`);
});
