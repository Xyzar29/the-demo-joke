import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The demo went perfectly until someone asked what the code does — including the agent that wrote it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, JOKE + "\n", "utf8");
chmodSync(outPath, 0o644);
