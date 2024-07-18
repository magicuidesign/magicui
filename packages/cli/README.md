# magicui

A CLI for adding magic ui components to your project. Superset of shadcn-ui.

```bash
 ##   ##                      ##                  ##   ##   ####
 ### ###                                          ##   ##    ##
 #######   ####     ### ##   ###      ####        ##   ##    ##
 #######      ##   ##  ##     ##     ##  ##       ##   ##    ##
 ## # ##   #####   ##  ##     ##     ##           ##   ##    ##
 ##   ##  ##  ##    #####     ##     ##  ##       ##   ##    ##
 ##   ##   #####       ##    ####     ####         #####    ####
                   #####
```

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies (`framer-motion`), adds the `cn` util, configures `tailwind.config.js`, and CSS variables for the project.

```bash
npx magicui-cli init
```

### shadcn-ui project

If your project is already using the `shadcn-ui`, don't worry! You can still use magicui.

```bash
npx shadcn-ui init
```

Just add these two lines to your `components.json` file:

```diff
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
+   "ui": "@/components/ui",
+   "magicui": "@/components/magicui"
  }
}
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx magicui-cli add [component]
```

### Example

```bash
npx magicui-cli add bento-grid
```

You can also use the optional `--all` flag to install all components:

```bash
npx magicui-cli add --all
```

You can also use the `--exmaple` flag to select and install example & demo you saw on webside:

```bash
npx magicui-cli add --example
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx magicui-cli add
```

## shadcn-ui

You can also use the same CLI for selecting & installing shadcn-ui components:

```bash
npx magicui-cli add --shadcn button
```

```bash
npx magicui-cli add --shadcn --all
```

## Documentation

Visit [https://magicui.design/docs/installation](https://magicui.design/docs/installation) to view the documentation.

## License

Licensed under the [MIT license](https://github.com/magicuidesign/magicui/blob/main/LICENSE.md).
