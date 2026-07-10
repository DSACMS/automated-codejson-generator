const GITHUB_API_URL =
  "https://api.github.com/repos/DSACMS/gov-codejson/contents/schemas/cms";

export async function getLatestSchemaVersion(): Promise<string> {
  const response = await fetch(GITHUB_API_URL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(process.env.GITHUB_TOKEN && {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch schema list: ${response.status}`);
  }

  const files = (await response.json()) as Array<{ name: string }>;

  const versions = files
    .map((f) => f.name.match(/^schema-(\d+\.\d+\.\d+)\.json$/)?.[1])
    .filter(Boolean) as string[];

  if (versions.length === 0) {
    throw new Error("No schema versions found");
  }

  const versionNumber = versions.sort((a, b) =>
    b.localeCompare(a, undefined, { numeric: true }),
  )[0];
  // console.log(versionNumber)
  return versionNumber;
}

// try {
//     await getLatestSchemaVersion();
// } catch (error) {
//     console.error(`GET operation failed!`);

//     if (error instanceof Error) {
//         console.error(`Error: ${error.message}`);
//     } else {
//         console.error(`Unknown error:`, error);
//     }
//     process.exit(1);
// }
