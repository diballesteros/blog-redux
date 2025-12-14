import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import type { ReactNode } from "react";

import tailwindHref from "./tailwind.css?url";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const themeInitScript = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = stored ? stored === 'dark' : prefersDark;
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (_) {}
})();`;

export default function App() {
	return <Outlet />;
}

export function Layout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width,initial-scale=1"
				/>
				<Meta />
				<Links />
				<link rel="stylesheet" href={tailwindHref} />
				<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
			</head>
			<body className="min-h-screen bg-bgPrimary text-primary">
				<Navbar />
				{children}
				<Footer />
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary() {
	return (
		<main className="mx-auto max-w-6xl px-8 py-16">
			<h1 className="text-3xl font-semibold">Something went wrong</h1>
			<p className="mt-4 text-secondary">
				An unexpected error occurred while rendering this page.
			</p>
		</main>
	);
}
