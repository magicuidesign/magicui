"use client"

import { HTMLAttributes, useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ScriptCopyBtnProps extends HTMLAttributes<HTMLDivElement> {
  showMultiplePackageOptions?: boolean
  codeLanguage: string
  lightTheme: string
  darkTheme: string
  commandMap: Record<string, string>
  className?: string
}

export function ScriptCopyBtn({
  showMultiplePackageOptions = true,
  codeLanguage,
  lightTheme,
  darkTheme,
  commandMap,
  className,
}: ScriptCopyBtnProps) {
  const packageManagers = Object.keys(commandMap)
  const [packageManager, setPackageManager] = useState(packageManagers[0])
  const [copied, setCopied] = useState(false)
  const [highlightedCode, setHighlightedCode] = useState("")
  const { theme } = useTheme()
  const command = commandMap[packageManager]

  useEffect(() => {
    async function loadHighlightedCode() {
      try {
        const { codeToHtml } = await import("shiki")
        const highlighted = await codeToHtml(command, {
          lang: codeLanguage,
          themes: {
            light: lightTheme,
            dark: darkTheme,
          },
          defaultColor: theme === "dark" ? "dark" : "light",
        })
        setHighlightedCode(highlighted)
      } catch (error) {
        console.error("Error highlighting code:", error)
        setHighlightedCode(`<pre>${command}</pre>`)
      }
    }

    loadHighlightedCode()
  }, [command, theme, codeLanguage, lightTheme, darkTheme])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "mx-auto flex max-w-md items-center justify-center",
        className
      )}
    >
      <div className="w-full space-y-2">
        <div className="mb-2 flex items-center justify-between">
          {showMultiplePackageOptions && (
            <div className="relative">
              <div className="border-border inline-flex overflow-hidden rounded-md border text-xs">
                {packageManagers.map((pm, index) => (
                  <div key={pm} className="flex items-center">
                    {index > 0 && (
                      <div className="bg-border h-4 w-px" aria-hidden="true" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`bg-background hover:bg-background relative rounded-none px-2 py-1 ${
                        packageManager === pm
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setPackageManager(pm)}
                    >
                      {pm}
                      {packageManager === pm && (
                        <motion.div
                          className="bg-primary absolute inset-x-0 bottom-[1px] mx-auto h-0.5 w-[90%]"
                          layoutId="activeTab"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="relative flex items-center">
          <div className="min-w-[300px] grow font-mono">
            {highlightedCode ? (
              <div
                className={`[&>pre]:overflow-x-auto [&>pre]:rounded-md [&>pre]:p-2 [&>pre]:px-4 [&>pre]:font-mono ${
                  theme === "dark" ? "dark" : "light"
                }`}
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="border-border rounded-md border bg-white p-2 px-4 font-mono dark:bg-black">
                {command}
              </pre>
            )}
          </div>
          <Button
            variant="outline"
            size="icon"
            className="relative ml-2 rounded-md"
            onClick={copyToClipboard}
            aria-label={copied ? "Copied" : "Copy to clipboard"}
          >
            <span className="sr-only">{copied ? "Copied" : "Copy"}</span>
            <Copy
              className={`h-4 w-4 transition-all duration-300 ${
                copied ? "scale-0" : "scale-100"
              }`}
            />
            <Check
              className={`absolute inset-0 m-auto h-4 w-4 transition-all duration-300 ${
                copied ? "scale-100" : "scale-0"
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  )
}
