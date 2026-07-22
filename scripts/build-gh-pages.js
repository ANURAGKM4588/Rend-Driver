import fs from "fs";
import path from "path";

const distDir = path.resolve(process.cwd(), "dist");

if (fs.existsSync(distDir)) {
  const indexPath = path.join(distDir, "index.html");
  const fallbackPath = path.join(distDir, "404.html");
  const nojekyllPath = path.join(distDir, ".nojekyll");

  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, fallbackPath);
    fs.writeFileSync(nojekyllPath, "");
    console.log("✓ Created 404.html & .nojekyll in dist/ for GitHub Pages static hosting!");
  }
} else {
  console.error("dist directory not found!");
}
