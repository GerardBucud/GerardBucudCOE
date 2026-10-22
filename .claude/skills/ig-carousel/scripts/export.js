// Render a post's slides to PNG with the same renderer the board uses (tool/index.html in local mode).
//
// Usage:
//   node export.js --db <dir> --assets <dir> --pid <post id> --out <dir> [--fonts <dir>]
//
//   --db      folder written by ArtifactData list/get with out_dir: holds posts/<pid>.json and posts/<pid>/slides/*.json
//   --assets  the post's photos, each file named <asset id>.<ext> (what Artifact read with path=<asset id> saves)
//   --fonts   folder with NimbusSans-Regular.otf and NimbusSans-Bold.otf (default: /usr/share/fonts/opentype/urw-base35)
//
// Needs Node, Playwright with Chromium (PLAYWRIGHT_BROWSERS_PATH or /opt/pw-browsers/chromium).
const http = require("http"), fs = require("fs"), path = require("path");

const args = Object.fromEntries(process.argv.slice(2).reduce((a, v, i, all) => (v.startsWith("--") ? a.concat([[v.slice(2), all[i + 1]]]) : a), []));
for (const k of ["db", "assets", "pid", "out"]) if (!args[k]) { console.error(`missing --${k}`); process.exit(1); }
const fontsDir = args.fonts || "/usr/share/fonts/opentype/urw-base35";
const TOOL = path.join(__dirname, "..", "tool", "index.html");
let playwright;
try { playwright = require("playwright"); } catch (e) { playwright = require("/opt/node22/lib/node_modules/playwright"); }

const meta = JSON.parse(fs.readFileSync(path.join(args.db, "posts", args.pid + ".json"), "utf8"));
const slideDir = path.join(args.db, "posts", args.pid, "slides");
const slides = Object.fromEntries(fs.readdirSync(slideDir).filter(f => f.endsWith(".json")).map(f => [f.slice(0, -5), JSON.parse(fs.readFileSync(path.join(slideDir, f), "utf8"))]));
const assetFiles = Object.fromEntries(fs.readdirSync(args.assets).map(f => [f.split(".")[0], path.join(args.assets, f)]));
fs.mkdirSync(args.out, { recursive: true });

const types = { ".otf": "font/otf", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".webp": "image/webp" };
const page = '<!doctype html><html><head><meta charset="utf-8"></head><body>' + fs.readFileSync(TOOL, "utf8") + "</body></html>";
const srv = http.createServer((q, r) => {
  const u = decodeURIComponent(q.url.split("?")[0]);
  let f = null;
  if (u === "/" || u === "/index.html") { r.writeHead(200, { "content-type": "text/html" }); return r.end(page); }
  if (u.startsWith("/fonts/")) f = path.join(fontsDir, path.basename(u));
  if (u.startsWith("/asset/")) f = assetFiles[path.basename(u)];
  if (!f || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { "content-type": types[path.extname(f).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(f).pipe(r);
});

(async () => {
  await new Promise(res => srv.listen(0, res));
  const port = srv.address().port;
  const missing = Object.values(slides).flatMap(s => ["img", "img2"].map(k => s[k] && s[k].asset).filter(Boolean)).filter(id => !assetFiles[id]);
  if (missing.length) console.warn("photos missing from --assets (those slides render a placeholder):", [...new Set(missing)].join(", "));
  const browser = await playwright.chromium.launch(fs.existsSync("/opt/pw-browsers/chromium") ? { executablePath: "/opt/pw-browsers/chromium" } : {});
  const p = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  p.on("pageerror", e => console.error("page error:", e.message));
  await p.route("https://cdnjs.cloudflare.com/**", rt => rt.fulfill({ status: 200, contentType: "text/javascript", body: "" }));
  await p.addInitScript(state => { window.__LOCAL_STATE__ = state; window.__ASSET_URL__ = id => "/asset/" + id; }, { posts: [{ id: args.pid, data: meta }], slides: { [args.pid]: slides } });
  await p.goto(`http://127.0.0.1:${port}/`);
  await p.waitForFunction(() => document.querySelectorAll(".card").length > 0, null, { timeout: 20000 });
  // page.evaluate/$$eval run these fixed functions in the page (Playwright API), not eval() of any string
  const names = await p.$$eval(".card", cards => cards.map(c => c.dataset.sid));
  for (let i = 0; i < names.length; i++) {
    const url = await p.evaluate(i => window.__exportPNG(i), i);
    const s = slides[names[i]], label = String((s.text && s.text.section) || s.type).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const file = path.join(args.out, `${String(i + 1).padStart(2, "0")}-${label || "slide"}${s.overlay ? "-overlay" : ""}.png`);
    fs.writeFileSync(file, Buffer.from(url.split(",")[1], "base64"));
    console.log(file);
  }
  await browser.close(); srv.close();
})().catch(e => { console.error(e); process.exit(1); });
