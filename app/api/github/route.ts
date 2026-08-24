import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    console.error("[GitHub API] GITHUB_USERNAME environment variable is not configured.");
    return NextResponse.json(
      { error: "GitHub username not configured" },
      { status: 500 }
    );
  }

  const headers: Record<string, string> = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": `cv-portfolio-${username}`,
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers,
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=owner`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      const userErr = !userRes.ok ? await userRes.text() : null;
      const reposErr = !reposRes.ok ? await reposRes.text() : null;
      console.error("[GitHub API] Error response from GitHub:", {
        userStatus: userRes.status,
        userErr,
        reposStatus: reposRes.status,
        reposErr,
      });
      return NextResponse.json(
        {
          error: "GitHub API error",
          details: {
            userStatus: userRes.status,
            reposStatus: reposRes.status,
          },
        },
        { status: userRes.status !== 200 ? userRes.status : reposRes.status }
      );
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    return NextResponse.json({
      user: {
        avatar_url: user.avatar_url,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      repos: repos.map(
        (repo: {
          id: number;
          name: string;
          description: string | null;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          language: string | null;
          homepage: string | null;
        }) => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          html_url: repo.html_url,
          stargazers_count: repo.stargazers_count,
          forks_count: repo.forks_count,
          language: repo.language,
          homepage: repo.homepage,
        })
      ),
    });
  } catch (err) {
    console.error("[GitHub API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
