/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	content: ["./app/**/*.{ts,tsx,jsx,js}", "./index.html"],
	darkMode: "class",
	theme: {
		extend: {
			flex: {
				40: "1 1 40%",
				60: "1 1 60%",
			},
			fontFamily: {
				sans: ["Inter var", ...defaultTheme.fontFamily.sans],
			},
			transformOrigin: {
				halfway: "50% 100px",
			},
			width: {
				50: "13rem",
			},
			colors: {
				primary: "var(--text-primary)",
				secondary: "var(--text-secondary)",
				active: "var(--text-active)",
				header: "var(--header)",
				bgPrimary: "var(--bg-primary)",
				bgSecondary: "var(--bg-secondary)",
				bgTertiary: "var(--bg-tertiary)",
			},
			keyframes: {
				wiggle: {
					"0%, 100%": { transform: "rotate(-2deg)" },
					"50%": { transform: "rotate(2deg)" },
				},
			},
			typography: ({ theme }) => {
				const fontSize = (size) => {
					const result = theme(`fontSize.${size}`);
					return Array.isArray(result) ? result[0] : result;
				};

				return {
					DEFAULT: {
						css: [
							{
								color: "var(--text-primary)",
								a: {
									color: "var(--text-active)",
									textDecoration: "none",
								},
								"h3 > a, h4 > a, h5 > a, h6 > a": {
									textDecoration: "none",
									pointerEvents: "auto",
								},
								"h2 > focus, a:focus, a:hover": {
									textDecoration: "underline",
								},
								p: {
									fontSize: fontSize("lg"),
									marginTop: 0,
									marginBottom: theme("spacing.4"),
								},
								"p > code, ol > li > code": {
									color: theme("colors.neutral.100"),
									backgroundColor: theme("colors.gray.800"),
									fontWeight: theme("fontWeight.medium"),
									padding: theme("spacing.1"),
									borderRadius: theme("borderRadius.lg"),
								},
								img: {
									marginBottom: theme("spacing.8"),
									marginTop: theme("spacing.8"),
									borderRadius: theme("borderRadius.lg"),
									marginLeft: "auto",
									marginRight: "auto",
								},
								"h2, h3": {
									marginTop: "2rem",
									marginBottom: "1rem",
									fontSize: fontSize("2xl"),
									[`@media (min-width: ${theme("screens.lg")})`]:
										{
											fontSize: fontSize("3xl"),
										},
								},
								"h2, h2 > a,h3, h3 > a, h4, h4 > a, h5, h5 > a":
									{
										color: "var(--header)",
									},
								"h4, h5, h6": {
									marginTop: "2rem",
									marginBottom: "1rem",
									fontSize: fontSize("lg"),
									[`@media (min-width: ${theme("screens.lg")})`]:
										{
											fontSize: fontSize("xl"),
										},
								},
								"strong, b": {
									color: "var(--text-primary)",
									fontSize: fontSize("lg"),
									fontWeight: theme("fontWeight.bold"),
								},
								blockquote: {
									padding: theme("spacing.4"),
									marginTop: 0,
									borderRadius: theme("borderRadius.lg"),
								},
								"blockquote > p": {
									marginBottom: 0,
									fontSize: fontSize("sm"),
								},
								".embedded": {
									position: "relative",
									marginBottom: "1rem",
								},
								".embedded iframe": {
									height: "500px !important",
									width: "100% !important",
								},
							},
						],
					},
					light: {
						css: [
							{
								blockquote: {
									color: "var(--text-primary)",
									backgroundColor: theme("colors.gray.100"),
								},
							},
						],
					},
					dark: {
						css: [
							{
								blockquote: {
									color: "var(--text-primary)",
									backgroundColor: theme("colors.gray.800"),
								},
							},
						],
					},
				};
			},
		},
	},
	plugins: [require("@tailwindcss/typography")],
};
