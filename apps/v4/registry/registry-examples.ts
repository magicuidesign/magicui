import { type Registry } from "shadcn/registry";

export const examples: Registry["items"] = [
  {
    name: "android-demo",
    type: "registry:example",
    title: "Android Demo",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["https://magicui.design/r/android"],
    files: [
      {
        path: "registry/example-v4/android-demo.tsx",
        type: "registry:example",
        target: "components/android-demo.tsx",
      },
    ],
  },
  {
    name: "android-demo-2",
    type: "registry:example",
    title: "Android Demo 2",
    description: "Example showing a mockup of an Android device.",
    registryDependencies: ["https://magicui.design/r/android"],
    files: [
      {
        path: "registry/example-v4/android-demo-2.tsx",
        type: "registry:example",
        target: "components/android-demo-2.tsx",
      },
    ],
  },
];
