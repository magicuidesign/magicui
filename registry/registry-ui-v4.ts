import { type Registry } from "shadcn/registry";

export const ui: Registry["items"] = [
  {
    name: "android",
    type: "registry:ui",
    title: "Android",
    description:
      "A spotlight effect that follows your mouse cursor and highlights borders on hover.",
    dependencies: ["motion"],
    files: [
      {
        path: "registry/magicui-v4/android.tsx",
        type: "registry:ui",
        target: "components/magicui/android.tsx",
      },
    ],
  },
];
