import { octokit } from "@/lib/octokit";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  owner: z.string(),
  repo: z.string(),
  username: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { owner, repo, username } = bodySchema.parse(body);
    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/collaborators/{username}",
      {
        owner,
        repo,
        username,
        permission: "read",
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );

    const status = response.status;
    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    console.log(error.response.data);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
