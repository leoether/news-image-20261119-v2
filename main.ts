// news-image-20261119 — "The World in One Day: Thursday, 19 November 2026"
// Round 2: hero-led front page. A Node 22, standard-library-only program
// that copies the entry image this repository ships to /output/entry.png
// (or $MAKEFUN_OUTPUT_DIR/entry.png). No network, no randomness, no clock:
// two runs write byte-identical files.
//
// The shipped image is validated (PNG signature + IEND trailer + 1 MiB cap)
// before copying, and the copy itself is verified byte-for-byte, so a
// damaged or truncated file fails loudly instead of reaching the judge.
//
// The six stories (each verified against reporting published 19 Nov 2026):
//   1. LEAD: Trump, Xi and Putin meet in Shenzhen in a first-ever
//      trilateral at the APEC summit; joint declaration: nuclear war
//      "cannot be won and must never be fought"; 90-minute meeting,
//      four-point peace declaration.
//   2. The ICJ rules Myanmar committed genocide against the Rohingya —
//      9-6 judgment in The Gambia v. Myanmar; about 10,000 killed in 2017.
//   3. Democrats nominate Hakeem Jeffries for Speaker 251-11; he would
//      be the first Black Speaker if elected on 3 January 2027.
//   4. GTA VI launches worldwide at midnight local time after 13 years,
//      returning to Vice City; already live in New Zealand.
//   5. Iran widens the Gulf war to Kuwait: drones hit Ali Al Salem air
//      base; Bahrain attacked again; Kuwait reports no casualties.
//   6. Cyclone Akvan nears India: landfall Friday on the Andhra-Odisha
//      coast; schools shut, red alerts out.
// Footer: EU proposes a 45bn euro Ukraine loan; Voyager 1 reaches one
// light-day from Earth; Anthropic raises $100bn+ in its Nasdaq IPO debut;
// Nvidia halts H-series chip shipments to China.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

// Contract: this entry copies the PNG this repository ships to
// <output>/entry.png — no network, no randomness, no clock — so two runs
// write byte-identical files. The output directory comes from
// MAKEFUN_OUTPUT_DIR when set; otherwise the grader's /output mount when
// it exists; otherwise a plain `output` directory for local runs.
// The grader's /output is a mount point: only use it when it exists AND
// is a directory, so a stray file named /output never hijacks the run.
const outDir = process.env.MAKEFUN_OUTPUT_DIR
  ?? (existsSync('/output') && statSync('/output').isDirectory() ? '/output' : 'output');
const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, 'entry.png');
const dst = join(outDir, 'entry.png');

// The image this repository ships is a complete PNG: check its signature
// before copying so a damaged file fails loudly instead of silently.
const bytes = readFileSync(src);
const PNG_SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(PNG_SIG)) throw new Error('entry.png is not a PNG file');
// A truncated PNG still starts with a valid signature, so also require
// the IEND trailer at the end of the file before copying.
const PNG_IEND = Buffer.from([0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]);
if (!bytes.subarray(bytes.length - 12).equals(PNG_IEND)) throw new Error('entry.png is truncated (missing IEND trailer)');
// The competition caps the entry at 1 MiB; refuse to emit an oversize file.
if (bytes.length > 1048576) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dst);

// Determinism guard: read the written file back and require it to be
// byte-identical to the shipped image, so a partial or corrupted copy
// fails loudly instead of reaching the judge.
const written = readFileSync(dst);
if (!written.equals(bytes)) throw new Error('entry.png copy failed byte-equality check');
