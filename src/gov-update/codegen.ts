import {
  normalizePackageName,
  normalizePyPIName,
} from "../gov-dependencies.js";
import { Ecosystem } from "./verify.js";

export interface DataFileEntry {
  eco: Ecosystem;
  key: string;
  displayName: string;
  url: string;
}

const NPM_MAP =
  "export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {";
const PYPI_MAP =
  "export const GOV_DEPENDENCIES_PYPI: Record<string, ReusedCodeEntry> = {";

const CONST_RE =
  /(?:export )?const (\w+): ReusedCodeEntry = \{\s*name: "([^"]+)",\s*URL: "([^"]+)",?\s*\};/g;

interface KnownConst {
  constName: string;
  url: string;
}

export function existingKeys(source: string, eco: Ecosystem): Set<string> {
  const body = mapBody(source, eco);
  const normalize = eco === "npm" ? normalizePackageName : normalizePyPIName;
  const keys = new Set<string>();
  for (const m of body.matchAll(/\n {2}(?:"([^"]+)"|([\w$]+)):/g)) {
    keys.add(normalize(m[1] ?? m[2]));
  }
  return keys;
}

export function addEntries(source: string, entries: DataFileEntry[]): string {
  let result = source;
  const knownByUrl = new Map<string, KnownConst>();
  const usedNames = new Set<string>();
  for (const m of source.matchAll(CONST_RE)) {
    knownByUrl.set(m[3].toLowerCase(), { constName: m[1], url: m[3] });
    usedNames.add(m[1]);
  }

  for (const entry of entries) {
    const existing = knownByUrl.get(entry.url.toLowerCase());
    const constName = existing
      ? existing.constName
      : uniqueConstName(entry.key, usedNames);
    if (!existing) {
      usedNames.add(constName);
      knownByUrl.set(entry.url.toLowerCase(), { constName, url: entry.url });
      result = insertConst(result, constName, entry.displayName, entry.url);
    }
    result = insertMapEntry(result, entry, constName);
  }
  return result;
}

function uniqueConstName(key: string, used: Set<string>): string {
  const scope = key.match(/^@([^/]+)\//)?.[1];
  const slug = key
    .replace(/^@[^/]+\//, scope ? `${scope}-` : "")
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const base = /^\d/.test(slug) ? "PKG_" + slug : slug;
  let name = base;
  while (used.has(name)) name += "_PKG";
  return name;
}

function insertConst(
  source: string,
  constName: string,
  displayName: string,
  url: string,
): string {
  const block = `const ${constName}: ReusedCodeEntry = {\n  name: "${displayName}",\n  URL: "${url}",\n};`;
  const anchors = [
    ...source.matchAll(/\nconst (\w+): ReusedCodeEntry = \{[^}]*\};/g),
  ];
  const before = anchors.filter((m) => m[1].localeCompare(constName) < 0).pop();
  if (before) {
    const pos = before.index + before[0].length;
    return source.slice(0, pos) + "\n\n" + block + source.slice(pos);
  }
  const first = anchors[0];
  return (
    source.slice(0, first.index) +
    "\n" +
    block +
    "\n" +
    source.slice(first.index)
  );
}

function mapMarker(eco: Ecosystem): string {
  return eco === "npm" ? NPM_MAP : PYPI_MAP;
}

function mapBody(source: string, eco: Ecosystem): string {
  const start = source.indexOf(mapMarker(eco));
  const end = source.indexOf("\n};", start);
  return source.slice(start, end);
}

function mapKeyLiteral(key: string): string {
  return /^[a-z_$][\w$]*$/i.test(key) ? key : `"${key}"`;
}

function insertMapEntry(
  source: string,
  entry: DataFileEntry,
  constName: string,
): string {
  const marker = mapMarker(entry.eco);
  const start = source.indexOf(marker);
  const bodyEnd = source.indexOf("\n};", start);
  const body = source.slice(start, bodyEnd);
  const key = entry.key.toLowerCase();
  const line = `  ${mapKeyLiteral(entry.key)}: ${constName},`;

  const entryRe = /\n {2}(?:"([^"]+)"|([\w$]+)): \w+,/g;
  const isScoped = entry.eco === "npm" && key.startsWith("@");
  let insertAt: number | null = null;

  if (isScoped) {
    let lastScopedEnd: number | null = null;
    for (const m of body.matchAll(entryRe)) {
      if ((m[1] ?? m[2]).startsWith("@")) {
        lastScopedEnd = start + (m.index ?? 0) + m[0].length;
      }
    }
    insertAt = lastScopedEnd;
  } else {
    let prevEnd: number | null = null;
    for (const m of body.matchAll(entryRe)) {
      const k = m[1] ?? m[2];
      if (k.startsWith("@")) continue;
      if (k.toLowerCase().localeCompare(key) < 0) {
        prevEnd = start + (m.index ?? 0) + m[0].length;
      }
    }
    insertAt = prevEnd ?? start + body.indexOf("= {") + 3;
  }

  if (insertAt === null) insertAt = bodyEnd;
  return source.slice(0, insertAt) + "\n" + line + source.slice(insertAt);
}
