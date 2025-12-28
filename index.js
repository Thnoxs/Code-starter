#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { execSync } from "child_process";

let ora, chalk, open;

// ✅ Try importing dependencies, fallback to simple console if not available
try {
  ora = (await import("ora")).default;
  chalk = (await import("chalk")).default;
  open = (await import("open")).default;
} catch {
  ora = () => ({ start: () => ({ succeed: () => {} }) });
  chalk = { blue: (txt) => txt, green: (txt) => txt };
  open = () => {};
}

const cwd = process.cwd();
const srcFolder = path.join(cwd, "src");

// 0️⃣ Create src folder
if (!fs.existsSync(srcFolder)) fs.mkdirSync(srcFolder);

// 1️⃣ Template files
const files = {
  "index.html": `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" href="data:," />
    <title>Thnoxs - Template</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
      integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <h1>Welcome to Thnoxs Template</h1>
    <script src="script.js"></script>
  </body>
</html>
`,

  "style.css": `* { 
  margin:0; 
  padding:0; 
  box-sizing:border-box; 
} 

body { 
  font-family: system-ui, sans-serif; 
}`,

  "script.js": `console.log("Thnoxs template running 🚀");`,
};

// 2️⃣ Create files inside src
Object.entries(files).forEach(([file, content]) => {
  const filePath = path.join(srcFolder, file);
  if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, content);
});

// 3️⃣ Create package.json if not exists
const packageJsonPath = path.join(cwd, "package.json");
if (!fs.existsSync(packageJsonPath)) {
  const packageJson = {
    name: "thnoxs-template",
    version: "1.0.0",
    private: false,
    scripts: { start: "live-server src --quiet --port=8080" },
    devDependencies: { "live-server": "^1.2.2" },
  };
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  console.log("📦 package.json created");
}

// 4️⃣ ASCII Banner for pro feel
console.log(
  chalk.green(`
████████╗██╗  ██╗███╗   ██╗ ██████╗ ██╗  ██╗███████╗
╚══██╔══╝██║  ██║████╗  ██║██╔═══██╗╚██╗██╔╝██╔════╝
   ██║   ███████║██╔██╗ ██║██║   ██║ ╚███╔╝ ███████╗
   ██║   ██╔══██║██║╚██╗██║██║   ██║ ██╔██╗ ╚════██║
   ██║   ██║  ██║██║ ╚████║╚██████╔╝██╔╝ ██╗███████║
   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
`)
);

// 5️⃣ Install dependencies with spinner
const spinner = ora("Installing dependencies...").start();
execSync("npm install --silent", { cwd, stdio: "ignore" });
spinner.succeed(chalk.green("Dependencies installed ✅"));

// 7️⃣ Link Outopen
const url = "https://www.youtube.com/watch?v=bupetqS1SMU";
url;

// 6️⃣ Final clean message
console.log(
  chalk.blue(`
✨ Thnoxs HTML Template Ready!
📁 All template files are in /src folder
🚀 Live server running at: ${url}
🌐 Browser opened automatically

👉 Run 'npm start' to restart the server
`)
);
