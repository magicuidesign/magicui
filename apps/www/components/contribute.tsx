import { BugIcon, LightbulbIcon, PencilIcon } from "lucide-react";
import Link from "next/link";
import { getGithubFileUrl, getGitHubIssueUrl } from "@/lib/github";
import { Page, PageData } from "fumadocs-core/source";

export function Contribute({ page }: { page: Page<PageData> }) {
  const contributeLinks = [
    {
      text: "Report an issue",
      icon: BugIcon,
      href: getGitHubIssueUrl({
        owner: "magicuidesign",
        repo: "magicui",
        title: `[bug]: ${page.url}`,
        labels: ["bug", "documentation"],
        template: "bug_report.yml",
      }),
    },
    {
      text: "Request a feature",
      icon: LightbulbIcon,
      href: getGitHubIssueUrl({
        owner: "magicuidesign",
        repo: "magicui",
        title: `[feat]: ${page.url}`,
        labels: ["enhancement"],
        template: "feature_request.yml",
      }),
    },
    {
      text: "Edit this page",
      icon: PencilIcon,
      href: getGithubFileUrl({
        owner: "magicuidesign",
        repo: "magicui",
        slug: page.url,
      }),
    },
  ];

  return (
    <div className="flex flex-col gap-2 p-4">
      <p className="text-xs font-medium text-muted-foreground">Contribute</p>
      <ul className="m-0 list-none flex flex-col gap-1">
        {contributeLinks.map((link, index) => (
          <li key={index}>
            <Link
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <link.icon className="size-3" />
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
