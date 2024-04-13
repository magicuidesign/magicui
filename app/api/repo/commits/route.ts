import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";
import { z } from "zod";

const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

const bodySchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { owner, repo } = bodySchema.parse(body);

    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/commits",
      {
        owner,
        repo,
        per_page: 5,
      },
    );

    return NextResponse.json({ success: true, commits: response.data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
