import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

export default [
  { ignores: ["dist/**", "node_modules/**"] },

  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: "detect" } },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // The automatic JSX runtime makes these two obsolete.
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      // This is a JS (not TS) codebase; prop shapes are documented in JSDoc.
      "react/prop-types": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  },

  {
    // shadcn/ui convention: these files export their cva variant helpers
    // alongside the component, which the Fast Refresh rule flags.
    files: ["src/components/ui/**/*.jsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },

  {
    files: ["scripts/**/*.mjs", "api/**/*.js", "*.config.js"],
    languageOptions: { globals: globals.node },
  },
];
