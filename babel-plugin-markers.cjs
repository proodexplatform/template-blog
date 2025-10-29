// babel-plugin-markers.cjs
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const CONFIG = {
  outputPath: path.resolve(process.cwd(), "markers.json"),
  allowedElements: [
    "h1","h2","h3","h4","h5","h6",
    "p","span","section","Textarea","Label","Input",
    "Icon","Image","LinkWrapper"
  ],
  excludePatterns: [/node_modules/, /\.next/, /out/, /src[\\/]components/],
  includeRoots: [/^src[\\/]app\//]
};

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "babel-plugin-markers",
    pre(file) {
      // initialise per-file storage
      this.markers = [];
      this.filename = file.opts.filename;
    },

    visitor: {
      JSXOpeningElement(nodePath) {
  const loc = nodePath.node.loc;
  if (!loc || !this.filename) return;

  const rel = path.relative(process.cwd(), this.filename).replace(/\\/g, "/");

  let name = "Unknown";
  const n = nodePath.node.name;
  if (t.isJSXIdentifier(n)) name = n.name;
  else if (t.isJSXMemberExpression(n)) name = n.object.name ?? "Unknown";

  if (!CONFIG.allowedElements.includes(name)) return;

  const type = /^[A-Z]/.test(name) ? "component" : "html";

  const hash = crypto.createHash("md5")
    .update(`${rel}:${loc.start.line}:${loc.start.column}`)
    .digest("hex").slice(0, 8);
  const marker = `${name}-${hash}`;

  const idx = nodePath.node.attributes.findIndex(
    a => t.isJSXAttribute(a) && a.name.name === "data-marker"
  );

  let existing = [];
  if (idx >= 0) {
    const val = nodePath.node.attributes[idx].value?.value ?? "";
    existing = val.split(";").map(s => s.trim()).filter(Boolean);
  }
  if (!existing.includes(marker)) existing.push(marker);
  const merged = existing.join(";");

  if (idx >= 0) {
    nodePath.node.attributes[idx].value = t.stringLiteral(merged);
  } else {
    nodePath.node.attributes.push(
      t.jsxAttribute(t.jsxIdentifier("data-marker"), t.stringLiteral(merged))
    );
  }

  this.markers.push({
    id: marker,
    file: rel,
    start: loc.start,
    end: loc.end,
    component: name,
    type
  });
  }
  },

    post() {
      if (!this.filename) return;
      const rel = path.relative(process.cwd(), this.filename).replace(/\\/g, "/");

      // ---- write JSON (atomic per-file) ----
      let all = {};
      if (fs.existsSync(CONFIG.outputPath)) {
        try { all = JSON.parse(fs.readFileSync(CONFIG.outputPath, "utf8")); }
        catch (_) {}
      }

      if (this.markers.length) all[rel] = this.markers;
      else delete all[rel];

      try {
        fs.writeFileSync(CONFIG.outputPath, JSON.stringify(all, null, 2), "utf8");
        console.log(`[babel-markers] ${rel} → ${this.markers.length} marker(s)`);
      } catch (e) {
        console.error("[babel-markers] write error:", e.message);
      }
    }
  };
};