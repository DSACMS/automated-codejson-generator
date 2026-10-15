/**
 * HTTP helpers for the gov dependency updater. Every request goes through here
 * so retry, timeout, and User-Agent policy stay in one place.
 */

/** Injectable so tests can serve fixtures instead of hitting the network. */
export type FetchFn = typeof fetch;

export const USER_AGENT =
  "DSACMS/automated-codejson-generator gov-dependencies updater";

/**
 * The outcome of a request.
 *
 * `missing` means the server answered 404 and the resource is known not to
 * exist. `error` means no attempt completed, so its state is unknown. Callers
 * that record results must treat only `missing` as absence: caching an `error`
 * would remember a network blip as "this repo publishes nothing".
 */
export type FetchResult<T> =
  | { status: "ok"; body: T }
  | { status: "missing" }
  | { status: "error" };

/**
 * Fetches and parses JSON, retrying up to three times on 429 and 5xx responses
 * with a linear backoff. Any other non-OK status resolves to `missing`
 * immediately, since a 404 will not change between attempts.
 */
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

/**
 * Fetches a raw file as text under the same retry policy. Used for the
 * manifests and READMEs served from raw.githubusercontent.com.
 */
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

/** Flattens missing and error to null, for callers that treat both the same. */
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
