export interface GithubRepo {
  name: string;
  repo: string;
  lang: string;
  description?: string;
  homepage?: string;
}

// Static fallback used if the API call fails or no token/network is available.
const FALLBACK_REPOS: GithubRepo[] = [
  { name: "Tyla", repo: "https://github.com/FirozChauhan/Tyla", lang: "TypeScript", homepage: "https://tyla-kt09.onrender.com" },
  { name: "Fanaa", repo: "https://github.com/FirozChauhan/Fanaa", lang: "TypeScript", homepage: "https://fanaa-4s1y.onrender.com" },
  { name: "Glisters", repo: "https://github.com/FirozChauhan/Glisters", lang: "JavaScript" },
  { name: "Jigar", repo: "https://github.com/FirozChauhan/Jigar", lang: "TypeScript", homepage: "https://jigar-8bj9.onrender.com/" },
  { name: "johanka", repo: "https://github.com/FirozChauhan/johanka", lang: "TypeScript", homepage: "https://johanka.onrender.com/" },
  { name: "oob", repo: "https://github.com/FirozChauhan/oob", lang: "TypeScript", homepage: "https://oob-13cm.onrender.com/" },
  { name: "0xFIROZ", repo: "https://github.com/FirozChauhan/0xFIROZ", lang: "TypeScript", homepage: "https://zeroxfiroz-xj97.onrender.com/" },
];

// Fallback live URLs used ONLY when a repo has no homepage set on GitHub.
// GitHub's own homepage field always wins over these.
const HOMEPAGE_FALLBACKS: Record<string, string> = {
  pebbles: "https://pebbles-psi.vercel.app",
};

interface GithubApiRepo {
  name: string;
  html_url: string;
  language: string | null;
  description: string | null;
  homepage: string | null;
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
        // Cache briefly so GitHub edits show up fast; falls back gracefully on rate limits.
        next: { revalidate: 60 },
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
        homepage: r.homepage || HOMEPAGE_FALLBACKS[r.name] || undefined,
      }));
    return repos.length > 0 ? repos : FALLBACK_REPOS;
  } catch (err) {
    console.error("[github] fetch failed:", err);
    return FALLBACK_REPOS;
  }
}
