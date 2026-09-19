import { spawn } from "node:child_process";
import { createRequire } from "node:module";

// Accept both Next.js flags and the managed preview's Vite-style flags.
// An explicit port already makes Next.js fail if that port is occupied.
const require = createRequire(import.meta.url);
const forwarded = process.argv
  .slice(2)
  .filter((argument) => argument !== "--strictPort")
  .map((argument) => (argument === "--host" ? "--hostname" : argument));
if (!forwarded.includes("--hostname")) forwarded.push("--hostname", "0.0.0.0");
if (!forwarded.includes("--port") && !forwarded.includes("-p"))
  forwarded.push("--port", "4173");
const child = spawn(
  process.execPath,
  [require.resolve("next/dist/bin/next"), "dev", ...forwarded],
  { stdio: "inherit", env: process.env },
);
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("error", (error) => {
  console.error(error);
  process.exit(1);
});
child.on("exit", (code) => process.exit(code ?? 0));
