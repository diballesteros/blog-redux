import { Link, useLoaderData } from "react-router";

import { getAllPublishedPostMetas } from "../utils/posts.server";
import Hero from "../components/Hero";
import PostPreview from "../components/PostPreview";
import Spacer from "../components/Spacer";
import { H2 } from "../components/Typography";

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
