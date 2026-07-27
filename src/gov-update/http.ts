export type FetchFn = typeof fetch;

export const USER_AGENT =
  "DSACMS/automated-codejson-generator gov-dependencies updater";

export type FetchResult<T> =
  | { status: "ok"; body: T }
  | { status: "missing" }
  | { status: "error" };

export async function getJsonResult(
  fetchFn: FetchFn,
  url: string,
  headers: Record<string, string> = { "User-Agent": USER_AGENT },
): Promise<FetchResult<unknown>> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetchFn(url, {
        headers,
        signal: AbortSignal.timeout(20000),
      });
      if (response.status === 429 || response.status >= 500) {
        await sleep(attempt * 1500);
        continue;
      }
      if (!response.ok) return { status: "missing" };
      return { status: "ok", body: await response.json() };
    } catch {
      await sleep(attempt * 1500);
    }
  }
  return { status: "error" };
}

export async function getTextResult(
  fetchFn: FetchFn,
  url: string,
): Promise<FetchResult<string>> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const response = await fetchFn(url, {
        headers: { "User-Agent": USER_AGENT },
        signal: AbortSignal.timeout(15000),
      });
      if (response.status === 429 || response.status >= 500) {
        await sleep(attempt * 1500);
        continue;
      }
      if (!response.ok) return { status: "missing" };
      return { status: "ok", body: await response.text() };
    } catch {
      await sleep(attempt * 1500);
    }
  }
  return { status: "error" };
}

export async function getJson(
  fetchFn: FetchFn,
  url: string,
  headers: Record<string, string> = { "User-Agent": USER_AGENT },
): Promise<unknown | null> {
  const result = await getJsonResult(fetchFn, url, headers);
  return result.status === "ok" ? result.body : null;
}

export async function getText(
  fetchFn: FetchFn,
  url: string,
): Promise<string | null> {
  const result = await getTextResult(fetchFn, url);
  return result.status === "ok" ? result.body : null;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
