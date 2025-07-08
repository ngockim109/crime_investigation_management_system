import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"
import { defineConfig } from "eslint/config"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
    settings: { react: { version: "detect" } },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "react/prop-types": "off",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  },
  eslintPluginPrettierRecommended,
])
