import { execSync } from "child_process";

let cached: string | null = null;

/**
 * Returns the current git tag (e.g. "v1.1.1") or "" if there is none.
 * Read once and memoized. Only runs server-side (SSR/build) since git may
 * not be available on a deployed runtime — failures fall back to "".
 */
export function getAppVersion(): string {
  if (cached !== null) return cached;
  try {
    cached = execSync("git describe --tags --abbrev=0", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .trim()
      .replace(/^v/i, "");
  } catch {
    cached = "";
  }
  return cached;
}
