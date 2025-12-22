import { useEffect, useMemo, useState } from "react";
import { FaceFrownIcon, PlusIcon } from "@heroicons/react/20/solid";
import { Form, useLoaderData, useSearchParams } from "react-router";

import Chip from "../components/Chip";
import { getAllPublishedPostMetas } from "../utils/posts.server";
import PostPreview from "../components/PostPreview";
import Spacer from "../components/Spacer";
import { H2 } from "../components/Typography";
import CATEGORIES from "../constants/categories";
import { ROUTES } from "../constants/routes";
import { BLOG_QUERY_VARIABLE, POST_TO_SHOW } from "../constants/variables";

export async function loader() {
	const posts = await getAllPublishedPostMetas();
	return { posts };
}

export default function BlogIndex() {
	const { posts } = useLoaderData<typeof loader>();
	const [searchParams] = useSearchParams();
	const q = searchParams.get(BLOG_QUERY_VARIABLE);
	const [query, setQuery] = useState(q?.split(" ") ?? []);
	const [pageIndex, setPageIndex] = useState(1);

	const handleSetQuery = (nextQuery: string[]) => {
		setQuery(nextQuery);
		setPageIndex(1);
	};

	useEffect(() => {
		const current = new URLSearchParams(window.location.search);
		if (query?.length) {
			current.set(BLOG_QUERY_VARIABLE, query.join(" "));
		} else {
			current.delete(BLOG_QUERY_VARIABLE);
		}
		const url = [window.location.pathname, current.toString()]
			.filter(Boolean)
			.join("?");

		window.history.replaceState(null, "", url);
	}, [query]);

	const filteredList = useMemo(() => {
		if (query?.length) {
			return posts.filter((post) => {
				return query.every((param) => post.categories?.includes(param));
			});
		}
		return posts;
	}, [posts, query]);

	const handleLoadMore = () => {
		setPageIndex((prev) => prev + 1);
	};

	return (
		<main className="mx-auto flex max-w-6xl flex-col px-8 text-primary">
			<Spacer size="sm" />
			<H2 className="text-3xl">Search by category</H2>
			<Spacer size="sm" />
			<section>
				<Form
					className="flex flex-wrap gap-4"
					method="get"
					action={ROUTES.BLOG}>
					{CATEGORIES.map((category) => {
						return (
							<Chip
								checked={!!query?.includes(category.name)}
								key={category.id}
								name={category.name}
								setQuery={(name) => handleSetQuery(name)}
							/>
						);
					})}
				</Form>
			</section>
			<Spacer size="md" />
			<section>
				<ul className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{filteredList?.length === 0 && (
						<li className="col-span-2 grid min-h-[20rem] place-items-center rounded-lg border border-solid border-gray-400 p-8 text-center text-3xl font-medium dark:border-current">
							<FaceFrownIcon className="h-16 w-16" />
							Couldn't find anything with the selected categories!
							Sorry about that. Try another combination.
						</li>
					)}
					{filteredList
						?.slice(0, POST_TO_SHOW * pageIndex)
						?.map((post) => {
							return (
								<li key={post.slug}>
									<PostPreview post={post} />
								</li>
							);
						})}
				</ul>
				{filteredList?.length -
					filteredList?.slice(0, POST_TO_SHOW * pageIndex)?.length >
					0 && (
					<>
						<Spacer size="sm" />
						<button
							className="mx-auto flex items-center gap-2 rounded-full border border-solid border-gray-400 px-6 py-4 text-3xl transition-colors dark:border-current hover:dark:text-active"
							onClick={handleLoadMore}
							type="button">
							Load more <PlusIcon className="h-8 w-8" />
						</button>
					</>
				)}
			</section>
		</main>
	);
}
