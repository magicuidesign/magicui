import { ScriptCopyBtn } from "@/registry/magicui/script-copy-btn";

export default function ScriptCopyBtnDemo() {
  const customCommandMap = {
    npm: "npm run shadcn add button",
    yarn: "yarn shadcn add button",
    pnpm: "pnpm dlx shadcn@latest add button",
    bun: "bun x shadcn@latest add button",
  };
  return (
    <ScriptCopyBtn
      showMultiplePackageOptions={true}
      codeLanguage="shell"
      lightTheme="nord"
      darkTheme="vitesse-dark"
      commandMap={customCommandMap}
    />
  );
}
