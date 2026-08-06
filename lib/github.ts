export interface GithubRepo {
  name: string;
  repo: string;
  lang: string;
  description?: string;
}

// Static fallback used if the API call fails or no token/network is available.
const FALLBACK_REPOS: GithubRepo[] = [
  { name: "pebbles", repo: "https://github.com/FirozChauhan/pebbles", lang: "TypeScript" },
  { name: "pebblesServer", repo: "https://github.com/FirozChauhan/pebblesServer", lang: "TypeScript" },
  { name: "Jackdow__swww-wrapper", repo: "https://github.com/FirozChauhan/Jackdow__swww-wrapper", lang: "Python" },
];

interface GithubApiRepo {
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
  fork: boolean;
}

/**
 * Fetches the user's public repositories from the GitHub REST API.
 * Runs only on the server (SSR/build) so GITHUB_TOKEN is never exposed
 * to the client. Falls back to a static list if anything fails.
 */
export async function getGithubRepos(
  username = "FirozChauhan"
): Promise<GithubRepo[]> {
  const token = process.env.GITHUB_TOKEN;

  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=10&type=all`,
      {
        headers,
        // Cache for 10 minutes to stay gentle on rate limits.
        next: { revalidate: 600 },
      }
    );
    if (!res.ok) {
      console.error(`[github] API ${res.status}: ${res.statusText}`);
      return FALLBACK_REPOS;
    }
    const data = (await res.json()) as GithubApiRepo[];
    const repos: GithubRepo[] = data
      .filter((r) => !r.fork && r.name)
      .map((r) => ({
        name: r.name,
        repo: r.html_url,
        lang: r.language || "N/A",
        description: r.description || undefined,
      }));
    return repos.length > 0 ? repos : FALLBACK_REPOS;
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return FALLBACK_REPOS;
  }
}
