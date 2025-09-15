import { File, Folder, Tree } from "@/registry/magicui/file-tree";

export default function FileTreeDemo() {
  return (
    <div className="relative flex h-[300px] w-1/2 flex-col items-center justify-center overflow-hidden rounded-lg border bg-background">
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="7"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="app">
            <File value="3">
              <p>layout.tsx</p>
            </File>
            <File value="4">
              <p>page.tsx</p>
            </File>
          </Folder>
          <Folder value="5" element="components">
            <Folder value="6" element="ui">
              <File value="7">
                <p>button.tsx</p>
              </File>
            </Folder>
            <File value="8">
              <p>header.tsx</p>
            </File>
            <File value="9">
              <p>footer.tsx</p>
            </File>
          </Folder>
          <Folder value="10" element="lib">
            <File value="11">
              <p>utils.ts</p>
            </File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    isSelectable: true,
    name: "src",
    children: [
      {
        id: "2",
        isSelectable: true,
        name: "app",
        children: [
          {
            id: "3",
            isSelectable: true,
            name: "layout.tsx",
          },
          {
            id: "4",
            isSelectable: true,
            name: "page.tsx",
          },
        ],
      },
      {
        id: "5",
        isSelectable: true,
        name: "components",
        children: [
          {
            id: "6",
            isSelectable: true,
            name: "header.tsx",
          },
          {
            id: "7",
            isSelectable: true,
            name: "footer.tsx",
          },
        ],
      },
      {
        id: "8",
        isSelectable: true,
        name: "lib",
        children: [
          {
            id: "9",
            isSelectable: true,
            name: "utils.ts",
          },
        ],
      },
    ],
  },
];
