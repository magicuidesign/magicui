interface GitHubIssueUrlParams {
  owner: string;
  repo: string;
  title?: string;
  body?: string;
  labels?: string[];
  template?: string;
  projects?: string[];
  assignees?: string[];
  milestone?: string;
}

/**
 * Generates a GitHub issue URL with the provided parameters.
 * https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue#creating-an-issue-from-a-url-query
 *
 * @param params - Parameters for the GitHub issue URL.
 * @param params.owner - The GitHub repository owner's username.
 * @param params.repo - The name of the GitHub repository.
 * @param params.title - Optional title of the issue.
 * @param params.body - Optional body content of the issue.
 * @param params.labels - Optional array of labels for the issue.
 * @param params.template - Optional template file name for the issue.
 * @param params.projects - Optional array of project names to associate with the issue.
 * @param params.assignees - Optional array of usernames to assign the issue to.
 * @param params.milestone - Optional milestone to associate with the issue.
 * @returns A string containing the generated GitHub issue URL.
 */
export function getGitHubIssueUrl(params: GitHubIssueUrlParams): string {
  const { owner, repo, ...issueParams } = params;
  const baseUrl = `https://github.com/${owner}/${repo}/issues/new`;
  const urlParams = new URLSearchParams();

  Object.entries(issueParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => urlParams.append(key, item));
    } else if (value !== undefined) {
      urlParams.append(key, value.toString());
    }
  });

  return `${baseUrl}?${urlParams.toString()}`;
}

export function getGithubFileUrl(slug: string) {
  return `https://github.com/magicuidesign/magicui/blob/main/content${
    slug === "/docs" ? "/docs/index" : slug
  }.mdx`;
}
