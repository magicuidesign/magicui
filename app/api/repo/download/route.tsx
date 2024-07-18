import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { octokit } from "@/lib/octokit";

const bodySchema = z.object({
  owner: z.string(),
  repo: z.string(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const { owner, repo } = bodySchema.parse(body);
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/zipball",
      {
        owner: owner,
        repo: repo,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    const status = response.status;
    const downloadUrl = response.url;
    return NextResponse.json({ success: true, status, downloadUrl });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
