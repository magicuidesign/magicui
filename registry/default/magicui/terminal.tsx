"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Command {
  command: string;
  description: string;
  action: () => void;
}

interface TerminalProps {
  className?: string;
  initialMessage?: string;
  commands?: Command[];
}

export default function Terminal({
  className,
  initialMessage = "Type 'help' to see available commands",
  commands: customCommands,
}: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([initialMessage]);
  const router = useRouter();
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultCommands: Command[] = [
    {
      command: "help",
      description: "Show available commands",
      action: () => {
        const allCommands = [...defaultCommands, ...(customCommands || [])];
        setHistory((prev) => [
          ...prev,
          "> " + input,
          "Available commands:",
          ...allCommands.map((cmd) => `${cmd.command} - ${cmd.description}`),
        ]);
      },
    },
    {
      command: "clear",
      description: "Clear terminal",
      action: () => {
        setHistory([initialMessage]);
      },
    },
  ];

  const allCommands = [...defaultCommands, ...(customCommands || [])];

  const handleCommand = () => {
    const trimmedInput = input.trim().toLowerCase();
    const command = allCommands.find((cmd) =>
      trimmedInput.startsWith(cmd.command),
    );

    if (command) {
      command.action();
    } else {
      setHistory((prev) => [
        ...prev,
        "> " + input,
        'Command not found. Type "help" for available commands',
      ]);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className={cn(
        "bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg",
        className,
      )}
      onClick={handleTerminalClick}
    >
      <div className="flex items-center gap-1.5 p-2 border-b">
        <div className="size-3 rounded-full bg-red-500" />
        <div className="size-3 rounded-full bg-yellow-500" />
        <div className="size-3 rounded-full bg-green-500" />
      </div>
      <div
        ref={terminalRef}
        className="p-4 h-[400px] overflow-y-auto font-mono text-sm"
      >
        {history.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
        <div className="flex items-center">
          <span className="text-green-500">{">"}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none px-2 font-mono text-sm"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  );
}
