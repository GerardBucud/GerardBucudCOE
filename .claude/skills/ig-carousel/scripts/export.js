// Render a post's slides to PNG, or its PDF guide, with the same code the board uses (tool/index.html in local mode).
//
// Usage:
//   node export.js --db <dir> --assets <dir> --pid <post id> --out <dir> [--fonts <dir>] [--pdf --libs <dir>]
//
//   --db      folder written by ArtifactData list/get with out_dir: holds posts/<pid>.json, posts/<pid>/slides/*.json
//             and, for --pdf, posts/<pid>/guide/main.json
//   --assets  the post's photos (and custom sticker images), each file named <asset id>.<ext> (what Artifact read with path=<asset id> saves)
//   --fonts   folder with NimbusSans-Regular.otf, NimbusSans-Bold.otf, NimbusSans-Italic.otf and NimbusSans-BoldItalic.otf, plus NimbusSans-Regular.ttf and
//             NimbusSans-Bold.ttf for --pdf (default: /usr/share/fonts/opentype/urw-base35, which has the .otf only).
//             All six are published on the board under fonts/. The tall big-text fonts (Anton-Regular.ttf, LeagueGothic.ttf) come from
//             this skill's fonts/ folder when --fonts doesn't have them.
//   --pdf     make the PDF guide instead of PNGs
//   --libs    folder holding pdf-lib.min.js (pdf-lib 1.17.1) and fontkit.umd.min.js (@pdf-lib/fontkit 1.1.1), needed for --pdf.
//             The page pins both by hash, so they must be exactly these versions:
//               npm pack pdf-lib@1.17.1 @pdf-lib/fontkit@1.1.1 && for f in *.tgz; do tar xzf "$f" --strip-components=2 package/dist; done
//
// Needs Node, Playwright with Chromium (PLAYWRIGHT_BROWSERS_PATH or /opt/pw-browsers/chromium).
const http = require("http"), fs = require("fs"), path = require("path");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? a.concat([[v.slice(2), all[i + 1] && !all[i + 1].startsWith("--") ? all[i + 1] : true]]) : a), []));
for (const k of ["db", "assets", "pid", "out"]) if (typeof args[k] !== "string") { console.error(`missing --${k}`); process.exit(1); }
const fontsDir = args.fonts || "/usr/share/fonts/opentype/urw-base35";
const TOOL = path.join(__dirname, "..", "tool", "index.html");
let playwright;
try { playwright = require("playwright"); } catch (e) { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const meta = JSON.parse(fs.readFileSync(path.join(args.db, "posts", args.pid + ".json"), "utf8"));
const slideDir = path.join(args.db, "posts", args.pid, "slides");
const slides = Object.fromEntries(fs.readdirSync(slideDir).filter(f => f.endsWith(".json")).map(f => [f.slice(0, -5), JSON.parse(fs.readFileSync(path.join(slideDir, f), "utf8"))]));
const guideFile = path.join(args.db, "posts", args.pid, "guide", "main.json");
const guide = fs.existsSync(guideFile) ? JSON.parse(fs.readFileSync(guideFile, "utf8")) : null;
const assetFiles = Object.fromEntries(fs.readdirSync(args.assets).map(f => [f.split(".")[0], path.join(args.assets, f)]));
if (args.pdf) {
  const need = [];
  if (!guide) need.push(guideFile);
  for (const f of ["pdf-lib.min.js", "fontkit.umd.min.js"]) if (typeof args.libs !== "string" || !fs.existsSync(path.join(args.libs, f))) need.push(`${f} in --libs`);
  for (const w of ["Regular", "Bold"]) if (!fs.existsSync(path.join(fontsDir, `NimbusSans-${w}.ttf`))) need.push(`NimbusSans-${w}.ttf in --fonts`);
  if (need.length) { console.error("--pdf needs: " + need.join(", ")); process.exit(1); }
}
fs.mkdirSync(args.out, { recursive: true });

const types = { ".otf": "font/otf", ".ttf": "font/ttf", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const page = '<!doctype html><html><head><meta charset="utf-8"></head><body>' + fs.readFileSync(TOOL, "utf8") + "</body></html>";
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  let f = null;
  if (u === "/" || u === "/index.html") { r.writeHead(200, { "content-type": "text/html" }); return r.end(page); }
  if (u.startsWith("/fonts/")) { f = path.join(fontsDir, path.basename(u)); if (!fs.existsSync(f)) f = path.join(__dirname, "..", "fonts", path.basename(u)); }   /* the tall big-text fonts (Anton, League Gothic) ship with the skill */
  if (u.startsWith("/asset/")) f = assetFiles[path.basename(u)];
  if (!f || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "content-type": types[path.extname(f).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(f).pipe(r);
});

(async () => {
  await new Promise(res => srv.listen(0, res));
  const port = srv.address().port;
  const missing = Object.values(slides).flatMap(s => [...["img", "img2"].map(k => s[k] && s[k].asset), ...(s.stickers || []).map(t => t.src && t.src.asset)].filter(Boolean)).filter(id => !assetFiles[id]);
  if (missing.length) console.warn("photos or sticker images missing from --assets (they render a placeholder):", [...new Set(missing)].join(", "));
  const browser = await playwright.chromium.launch(fs.existsSync("/opt/pw-browsers/chromium") ? { executablePath: "/opt/pw-browsers/chromium" } : {});
  const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  p.on("pageerror", e => console.error("page error:", e.message));
  await p.route("https://cdnjs.cloudflare.com/**", rt => rt.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  if (args.pdf) await p.route("https://cdn.jsdelivr.net/npm/**", rt => rt.fulfill({ status: 200, contentType: "text/javascript", headers: { "access-control-allow-origin": "*" }, body: fs.readFileSync(path.join(args.libs, path.basename(new URL(rt.request().url()).pathname))) }));
  await p.addInitScript(state => { window.__LOCAL_STATE__ = state; window.__ASSET_URL__ = id => "/asset/" + id; }, { posts: [{ id: args.pid, data: meta }], slides: { [args.pid]: slides }, guides: { [args.pid]: guide } });
  await p.goto(`http://127.0.0.1:${port}/`);
  await p.waitForFunction(() => document.querySelectorAll(".card").length > 0, null, { timeout: 20000 });
  // page.evaluate/$$eval run these fixed functions in the page (Playwright API), not eval() of any string
  if (args.pdf) {
    const b64 = await p.evaluate(() => window.__guidePDF());
    const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "slide";
    const file = path.join(args.out, `${slug(String(guide.title || "").replace(/\*\*/g, "") || meta.title)}-guide.pdf`);
    fs.writeFileSync(file, Buffer.from(b64, "base64"));
    console.log(file);
  } else {
    const names = await p.$$eval(".card", cards => cards.map(c => c.dataset.sid));
    for (let i = 0; i < names.length; i++) {
      const url = await p.evaluate(i => window.__exportPNG(i), i);
      const file = path.join(args.out, await p.evaluate(i => window.__exportName(i), i)); /* the board's own file name: 05-v2-before-after.png */
      fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
      console.log(file);
    }
  }
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
