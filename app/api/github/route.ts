import { NextResponse } from "next/server";

export async function GET() {
  const username = process.env.GITHUB_USERNAME;

  if (!username) {
    return NextResponse.json(
      { error: "GitHub username not configured" },
      { status: 500 }
    );
  }

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        next: { revalidate: 3600 },
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=10&type=owner`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
          next: { revalidate: 3600 },
        }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("GitHub API error");
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
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
