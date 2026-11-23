import { chmodSync, mkdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE =
  "The demo went perfectly until someone asked what the code does — including the agent that wrote it.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
const text = JOKE + "\n";
writeFileSync(outPath, text, "utf8");
chmodSync(outPath, 0o644);

// Verify the write landed whole: the file must exist and hold exactly the
// entry text's bytes, otherwise the grader would collect a truncated or
// missing entry and the run should fail loudly instead.
const expectedBytes = Buffer.byteLength(text, "utf8");
let written;
try {
  written = statSync(outPath);
} catch {
  throw new Error(`entry write failed: ${outPath} does not exist after writing`);
}
if (!written.isFile() || written.size !== expectedBytes) {
  throw new Error(
    `entry write failed: ${outPath} holds ${written.size} bytes, expected ${expectedBytes}`,
  );
}
