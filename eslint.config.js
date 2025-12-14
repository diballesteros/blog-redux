import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
	globalIgnores(["dist", "build", ".react-router"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite,
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		files: ["app/**/*.{ts,tsx}"],
		rules: {
			// React Router route modules intentionally export loaders/actions/etc.
			"react-refresh/only-export-components": "off",
		},
	},
	{
		files: [
			"app/**/*.server.{ts,tsx}",
			"react-router.config.ts",
			"vite.config.ts",
			"tailwind.config.js",
			"postcss.config.js",
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: {
				...globals.node,
			},
		},
	},
]);
