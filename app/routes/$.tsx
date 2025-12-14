import { Link } from "react-router";

export default function NotFound() {
	return (
		<main className="py-16">
			<h1 className="text-4xl font-semibold">404</h1>
			<p className="mt-2 text-secondary">This page does not exist.</p>
			<Link
				className="mt-8 inline-block text-lg hover:text-active"
				to="/blog">
				Browse the blog
			</Link>
		</main>
	);
}
