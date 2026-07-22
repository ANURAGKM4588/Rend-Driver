import fs from "fs";
import path from "path";

const publicDir = path.resolve(process.cwd(), ".output", "public");
const assetsDir = path.join(publicDir, "assets");

if (fs.existsSync(assetsDir)) {
  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css")) || files.find((f) => f.endsWith(".css"));
  const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js")) || files.find((f) => f.endsWith(".js"));

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <base href="/Rend-Driver/" />
    <title>PILOTED — Your car. Our driver.</title>
    <meta name="description" content="PILOTED is a driver-providing agency. You keep the wheel of your own car — we bring the hands. Vetted professional drivers, on demand." />
    <link rel="icon" href="/Rend-Driver/favicon.ico" type="image/x-icon" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Manrope:wght@300;400;500;600&display=swap" rel="stylesheet" />
    ${cssFile ? `<link rel="stylesheet" href="/Rend-Driver/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${jsFile ? `<script type="module" src="/Rend-Driver/assets/${jsFile}"></script>` : ""}
  </body>
</html>`;

  fs.writeFileSync(path.join(publicDir, "index.html"), htmlContent);
  // Create 404.html for SPA routing fallback
  fs.writeFileSync(path.join(publicDir, "404.html"), htmlContent);
  // Create .nojekyll to prevent GitHub Pages from bypassing _ files
  fs.writeFileSync(path.join(publicDir, ".nojekyll"), "");

  console.log("✓ Successfully generated .output/public/index.html with /Rend-Driver/ base & .nojekyll!");
} else {
  console.error("Assets directory not found!");
}
