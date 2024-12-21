"use client";

import Terminal from "@/registry/default/magicui/terminal";

export default function TerminalDemo() {
  const customCommands = [
    {
      command: "about",
      description: "Learn more about the project",
      action: () => {
        window.open("https://github.com/your-username/your-project", "_blank");
      },
    },
    {
      command: "contact",
      description: "Get contact information",
      action: () => {
        window.open("mailto:your@email.com", "_blank");
      },
    },
  ];

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <Terminal
        className="w-full"
        commands={customCommands}
        initialMessage="Welcome! Type 'help' to see available commands."
      />
    </div>
  );
}
