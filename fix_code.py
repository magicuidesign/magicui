with open("apps/www/content/blog/create-next-js-app.mdx", "r") as f:
    content = f.read()

# Find and replace the unquoted code block
old = """Let's say you're building a sleek, modern dashboard. You can easily extend the default theme to include your specific brand colors.

// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
content: [
'./pages/**/*.{js,ts,jsx,tsx,mdx}',
'./components/**/*.{js,ts,jsx,tsx,mdx}',
'./app/**/*.{js,ts,jsx,tsx,mdx}',
],
theme: {
extend: {
colors: {
brand: {
primary: '#0A72E4',
secondary: '#F5A623',
},
dark: {
900: '#1a1a1a',
800: '#2b2b2b',
},
},
},
},
plugins: [],
};
export default config;"""

new = """Let's say you're building a sleek, modern dashboard. You can easily extend the default theme to include your specific brand colors.

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#0A72E4',
          secondary: '#F5A623',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2b2b2b',
        },
      },
    },
  },
  plugins: [],
};
export default config;
```"""

content = content.replace(old, new)

with open("apps/www/content/blog/create-next-js-app.mdx", "w") as f:
    f.write(content)

print("Fixed!")
