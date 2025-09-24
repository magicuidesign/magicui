import { NextRequest, NextResponse } from "next/server"

const REPO_OWNER = "magicuidesign"
const REPO_NAME = "magicui"
const BRANCH = "main"
const WORKFLOW_FILE = "publish-article.yml"

export async function POST(request: NextRequest) {
  const auth = request.headers.get("authorization")
  if (!auth || auth !== `Bearer ${process.env.BLOG_WEBHOOK_ACCESS_TOKEN}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Get the raw payload from the incoming webhook
  const body = await request.json()
  const payload = JSON.stringify(body)

  // Call GitHub Actions workflow_dispatch
  const ghResp = await fetch(
    `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/actions/workflows/${WORKFLOW_FILE}/dispatches`,
    {
      method: "POST",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ref: BRANCH,
        inputs: { payload },
      }),
    }
  )

  const text = await ghResp.text()

  if (!ghResp.ok) {
    return NextResponse.json(
      { error: "GitHub error", details: text },
      { status: 500 }
    )
  }

  return NextResponse.json({ message: "Workflow dispatched", details: text })
}
