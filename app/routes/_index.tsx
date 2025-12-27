import type { MetaFunction } from "react-router";
import { Link, useLoaderData } from "react-router";

import { getAllPublishedPostMetas } from "../utils/posts.server";
import Hero from "../components/Hero";
import PostPreview from "../components/PostPreview";
import Spacer from "../components/Spacer";
import { H2 } from "../components/Typography";

const SITE_TITLE = "Relatable Code";
const SITE_DESCRIPTION =
	"Relatable tutorials, news, and analysis centering around web development, React, CSS, HTML, JavaScript, and TypeScript.";

export const meta: MetaFunction = () => [
	{ title: SITE_TITLE },
	{ name: "description", content: SITE_DESCRIPTION },
	{
		name: "keywords",
		content:
			"relatable, tutorials, news, analysis, web development, react, css, html, javascript, typescript",
	},
	{ property: "og:title", content: SITE_TITLE },
	{ property: "og:description", content: SITE_DESCRIPTION },
	{ property: "og:type", content: "website" },
	{ property: "og:locale", content: "en_US" },
	{ name: "twitter:card", content: "summary_large_image" },
	{ name: "twitter:site", content: "@relatablecoder" },
	{ name: "twitter:creator", content: "@relatablecoder" },
	{ name: "twitter:title", content: SITE_TITLE },
	{ name: "twitter:description", content: SITE_DESCRIPTION },
];

export async function loader() {
	const posts = await getAllPublishedPostMetas();
	return { posts: posts.slice(0, 4) };
}

export default function Home() {
	const { posts } = useLoaderData<typeof loader>();

	return (
		<main className="mx-auto flex max-w-6xl flex-col px-8 text-primary">
			<Spacer className="hidden sm:block" size="xl" />
			<section>
				<Hero />
			</section>
			<Spacer size="xxl" />
			<section>
				<H2 className="mt-2 text-3xl">Featured Posts</H2>
				<Spacer size="sm" />
				<ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
					{posts.map((post) => (
						<li key={post.slug}>
							<PostPreview post={post} />
						</li>
					))}
				</ul>
				<div className="mt-10">
					<Link
						className="text-lg font-medium hover:text-active"
						to="/blog">
						Browse all posts →
					</Link>
				</div>
			</section>
			<Spacer size="xxl" />
		</main>
	);
}
