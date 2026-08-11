/*
 * build-artifact.js — produce the Claude-artifact build from index.html.
 *
 *   node build-artifact.js [outfile]
 *
 * index.html is the source of truth. The Claude artifact supplies its own
 * <!doctype>/<head>/<body> skeleton, so it wants only the body *content*, and
 * its CSP blocks external files — which means the recorded call audio has to be
 * inlined as data: URIs. GitHub Pages serves index.html as-is and streams the
 * mp3s on demand, so only the artifact build pays the inlining cost.
 *
 * Publish the output with the Artifact tool, passing the existing artifact URL
 * so it updates in place rather than minting a new one.
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'index.html');
const OUT = process.argv[2] || path.join(__dirname, 'artifact-build.html');

const html = fs.readFileSync(SRC, 'utf8');

// Locate the body by searching, not by line number — the line numbers move
// every time the demo grows, and a stale offset silently truncates the build.
const open = html.indexOf('<body>');
const close = html.lastIndexOf('</body>');
if (open === -1 || close === -1 || close < open) {
    console.error('FATAL: could not find <body>…</body> in index.html');
    process.exit(1);
}
let body = html.slice(open + '<body>'.length, close).trim();

// Inline every referenced audio clip.
const MIME = { '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.wav': 'audio/wav' };
let inlined = 0, missing = 0, audioBytes = 0;

body = body.replace(/audio:"([^"]+\.(?:mp3|m4a|ogg|wav))"/g, (whole, rel) => {
    const file = path.join(__dirname, rel);
    if (!fs.existsSync(file)) {
        console.warn(`  WARN  missing clip, leaving path (will fall back to speech): ${rel}`);
        missing++;
        return whole;
    }
    const buf = fs.readFileSync(file);
    audioBytes += buf.length;
    inlined++;
    const mime = MIME[path.extname(file).toLowerCase()] || 'audio/mpeg';
    return `audio:"data:${mime};base64,${buf.toString('base64')}"`;
});

// Anything still pointing at a relative file would silently go quiet in the
// artifact, so make that loud rather than shipping a half-working build.
const leftover = [...body.matchAll(/audio:"(?!data:)([^"]+)"/g)].map((m) => m[1]);

fs.writeFileSync(OUT, body);

const kb = (n) => `${(n / 1024).toFixed(0)}KB`;
console.log(`  source     ${SRC}`);
console.log(`  output     ${OUT}`);
console.log(`  clips      ${inlined} inlined (${kb(audioBytes)} raw)${missing ? `, ${missing} missing` : ''}`);
console.log(`  size       ${kb(fs.statSync(SRC).size)} source -> ${kb(fs.statSync(OUT).size)} artifact build`);
if (leftover.length) console.log(`  NOTE       ${leftover.length} clip(s) left as paths: ${leftover.join(', ')}`);
if (fs.statSync(OUT).size > 16 * 1024 * 1024) {
    console.error('  FATAL      exceeds the 16MB artifact limit');
    process.exit(1);
}
