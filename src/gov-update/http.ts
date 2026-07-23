export type FetchFn = typeof fetch;

export const USER_AGENT =
  "DSACMS/automated-codejson-generator gov-dependencies updater";

export async function getJson(
  fetchFn: FetchFn,
  url: string,
  headers: Record<string, string> = { "User-Agent": USER_AGENT },
): Promise<unknown | null> {
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
      if (!response.ok) return null;
      return await response.json();
    } catch {
      await sleep(attempt * 1500);
    }
  }
  return null;
}

export async function getText(
  fetchFn: FetchFn,
  url: string,
): Promise<string | null> {
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
      return response.ok ? await response.text() : null;
    } catch {
      await sleep(attempt * 1500);
    }
  }
  return null;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
