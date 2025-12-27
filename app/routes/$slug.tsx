import type { MetaFunction } from "react-router";
import {
	data,
	isRouteErrorResponse,
	Link,
	useLoaderData,
	useRouteError,
} from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
	getAllPublishedPostMetas,
	getPublishedPostBySlug,
} from "../utils/posts.server";
import PostPreview from "../components/PostPreview";
import Spacer from "../components/Spacer";
import { H2 } from "../components/Typography";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data || !("post" in data)) {
		return [{ title: "404 - Post Not Found | Relatable Code" }];
	}

	const { post } = data;
	const title = `${post.title} | Relatable Code`;

	return [
		{ title },
		{ name: "description", content: post.description },
		{ name: "keywords", content: post.categories?.join(", ") },
		{ property: "og:title", content: post.title },
		{ property: "og:description", content: post.description },
		{ property: "og:type", content: "article" },
		{ property: "og:locale", content: "en_US" },
		...(post.coverImage
			? [{ property: "og:image", content: post.coverImage }]
			: []),
		{ name: "twitter:card", content: "summary_large_image" },
		{ name: "twitter:site", content: "@relatablecoder" },
		{ name: "twitter:creator", content: "@relatablecoder" },
		{ name: "twitter:title", content: post.title },
		{ name: "twitter:description", content: post.description },
		...(post.coverImage
			? [{ name: "twitter:image", content: post.coverImage }]
			: []),
	];
};

export async function loader({
	params,
}: {
	params: Record<string, string | undefined>;
}) {
	const slug = params.slug;
	if (!slug) {
		throw data("Not Found", { status: 404 });
	}

	const post = await getPublishedPostBySlug(slug);
	const recommendations = (await getAllPublishedPostMetas())
		.filter((p) => p.slug !== slug)
		.slice(0, 4);

	if (!post) {
		throw data({ recommendations }, { status: 404 });
	}

	return { post, recommendations };
}

export default function PostRoute() {
	const { post, recommendations } = useLoaderData<typeof loader>();

	return (
		<main className="mx-auto flex max-w-6xl flex-col px-8 text-primary">
			<Spacer size="xl" />
			<Link className="text-lg font-medium hover:text-active" to="/blog">
				← Back
			</Link>

			<h1 className="mt-6 text-4xl font-semibold text-header">
				{post.title}
			</h1>
			<p className="mt-3 text-secondary">
				{post.date ? (
					<time dateTime={post.date}>{post.date}</time>
				) : null}{" "}
				• {post.readingTime} min read
			</p>

			<article className="prose prose-light mt-10 max-w-[75ch] dark:prose-dark prose-code:before:hidden prose-code:after:hidden">
				<ReactMarkdown remarkPlugins={[remarkGfm]}>
					{post.content}
				</ReactMarkdown>

				<p>
					If you see any typos or errors you can{" "}
					<a
						href={`https://github.com/diballesteros/blog-posts/blob/main/${post.slug}.md`}
						target="_blank"
						rel="noopener noreferrer">
						edit the article directly on GitHub
					</a>
					.
				</p>
			</article>

			{recommendations.length ? (
				<section className="mt-16">
					<H2 className="text-3xl">You may also like:</H2>
					<Spacer size="sm" />
					<ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
						{recommendations.map((p) => (
							<li key={p.slug}>
								<PostPreview post={p} />
							</li>
						))}
					</ul>
				</section>
			) : null}

			<Spacer size="xxl" />
		</main>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		const recs =
			error.data &&
			typeof error.data === "object" &&
			"recommendations" in error.data &&
			Array.isArray(
				(error.data as { recommendations?: unknown }).recommendations
			)
				? ((error.data as { recommendations: unknown[] })
						.recommendations as {
						slug: string;
						title: string;
						description: string;
					}[])
				: [];

		return (
			<main className="py-16">
				<h1 className="text-4xl font-semibold">404</h1>
				<p className="mt-2 text-secondary">That post does not exist.</p>
				<Link
					className="mt-8 inline-block text-lg hover:text-active"
					to="/blog">
					Browse all posts
				</Link>

				{recs.length > 0 && (
					<section className="mt-16">
						<h2 className="text-2xl font-semibold">
							Try these instead:
						</h2>
						<ul className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
							{recs.map((p) => (
								<li
									key={p.slug}
									className="rounded-lg bg-bgSecondary p-6">
									<Link
										className="text-xl font-semibold hover:text-active"
										to={`/${p.slug}`}>
										{p.title}
									</Link>
									<p className="mt-2 text-secondary">
										{p.description}
									</p>
								</li>
							))}
						</ul>
					</section>
				)}
			</main>
		);
	}

	return (
		<main className="py-16">
			<h1 className="text-3xl font-semibold">Something went wrong</h1>
		</main>
	);
}
