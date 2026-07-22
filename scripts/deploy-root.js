import fs from "fs";
import path from "path";

const srcDir = path.resolve(process.cwd(), ".output", "public");
const destDir = process.cwd();

if (fs.existsSync(srcDir)) {
  const srcAssets = path.join(srcDir, "assets");
  const destAssets = path.join(destDir, "assets");
  if (fs.existsSync(srcAssets)) {
    fs.cpSync(srcAssets, destAssets, { recursive: true, force: true });
  }

  const filesToCopy = ["index.html", "404.html", ".nojekyll", "favicon.ico", "car-black.png"];
  for (const file of filesToCopy) {
    const s = path.join(srcDir, file);
    const d = path.join(destDir, file);
    if (fs.existsSync(s)) {
      fs.copyFileSync(s, d);
    }
  }

  console.log("✓ Copied build assets directly to repository root for instant GitHub Pages deployment!");
} else {
  console.error("Build directory .output/public does not exist!");
}
