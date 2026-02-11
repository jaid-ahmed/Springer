// tailwind.config.ts
// Tailwind CSS configuration file.
// Tells Tailwind which files to scan for class names (content paths),
// so unused styles are purged in production builds.

import type { Config } from "tailwindcss";

const config: Config = {
  // content: array of glob patterns pointing to every file that uses
  // Tailwind classes. Tailwind statically analyses these files and
  // tree-shakes any class that isn't found, keeping the final CSS tiny.
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",    // legacy pages directory
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // all React components
    "./app/**/*.{js,ts,jsx,tsx,mdx}",        // Next.js 13+ App Router
  ],
  theme: {
    extend: {
      // fontFamily: registers our Google Font variable (set in layout.tsx)
      // so Tailwind utility classes like font-sans resolve to our custom font.
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      // Custom color palette to maintain design consistency across components.
      // Using CSS variable names means we can theme via a single :root change.
      colors: {
        brand: {
          50:  "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",  // primary brand color
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      // Custom box shadow tokens used on cards / panels.
      boxShadow: {
        card: "0 1px 3px 0 rgb(0 0 0 / .05), 0 1px 2px -1px rgb(0 0 0 / .05)",
        "card-hover": "0 4px 6px -1px rgb(0 0 0 / .07), 0 2px 4px -2px rgb(0 0 0 / .07)",
      },
    },
  },
  // plugins: empty array — add Tailwind official plugins (forms, typography)
  // here if needed in the future.
  plugins: [],
};

export default config;