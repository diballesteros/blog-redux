import fs from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	description: string;
	categories: string[];
	coverImage?: string;
	published: boolean;
	readingTime: number;
};

export type Post = PostMeta & {
	content: string;
};

const BLOG_POSTS_DIR =
	process.env.BLOG_POSTS_DIR ??
	path.resolve(process.cwd(), "..", "blog-posts");

function readingTimeMinutes(text: string) {
	const words = text.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / 200));
}

async function readMarkdownFile(filePath: string): Promise<Post | null> {
	const raw = await fs.readFile(filePath, "utf8");
	const parsed = matter(raw);

	const filename = path.basename(filePath);
	const slug = filename.replace(/\.mdx?$/, "");

	const published = parsed.data.published === true;
	if (!published) return null;

	const title =
		typeof parsed.data.title === "string" ? parsed.data.title : slug;
	const date = typeof parsed.data.date === "string" ? parsed.data.date : "";
	const description =
		typeof parsed.data.description === "string"
			? parsed.data.description
			: "";
	const categories = Array.isArray(parsed.data.categories)
		? parsed.data.categories.filter((c) => typeof c === "string")
		: [];
	const coverImage =
		typeof parsed.data.cover_image === "string"
			? parsed.data.cover_image
			: undefined;

	const content = parsed.content;
	const readingTime = readingTimeMinutes(content);

	return {
		slug,
		title,
		date,
		description,
		categories,
		coverImage,
		published,
		readingTime,
		content,
	};
}

export async function getPublishedSlugs(): Promise<string[]> {
	const posts = await getAllPublishedPosts();
	return posts.map((p) => p.slug);
}

export async function getAllPublishedPosts(): Promise<Post[]> {
	let entries: string[];
	try {
		entries = await fs.readdir(BLOG_POSTS_DIR);
	} catch {
		// If blog-posts isn't present (e.g. CI misconfigured), fail gracefully.
		return [];
	}

	const markdownFiles = entries
		.filter((name) => name.endsWith(".md") || name.endsWith(".mdx"))
		.filter((name) => name.toLowerCase() !== "readme.md")
		.sort((a, b) => a.localeCompare(b));

	const posts = await Promise.all(
		markdownFiles.map((name) =>
			readMarkdownFile(path.join(BLOG_POSTS_DIR, name))
		)
	);

	return posts
		.filter((p): p is Post => Boolean(p))
		.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getAllPublishedPostMetas(): Promise<PostMeta[]> {
	const posts = await getAllPublishedPosts();
	return posts.map((post) => {
		const { content, ...meta } = post;
		void content;
		return meta;
	});
}

export async function getPublishedPostBySlug(
	slug: string
): Promise<Post | null> {
	const filePath = path.join(BLOG_POSTS_DIR, `${slug}.md`);

	try {
		return await readMarkdownFile(filePath);
	} catch {
		return null;
	}
}
