import {
	ArrowRightIcon,
	ArrowTopRightOnSquareIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router";

import { H3 } from "../Typography";
import Copy from "../Copy";
import useCopyClipboard from "../../hooks/useCopyClipboard";
import type { PostMeta } from "../../utils/posts.server";

type Props = {
	noImage?: boolean;
	post: PostMeta;
};

const formatter = new Intl.ListFormat("en", { style: "short", type: "unit" });

export default function PostPreview({ noImage = false, post }: Props) {
	const { copied, handleCopy } = useCopyClipboard(
		`https://relatablecode.com/${post.slug}`
	);

	const handleNewTab = (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();
		window.open(`/${post.slug}`, "_blank");
	};

	return (
		<div className="group relative flex h-full transition-all duration-300 focus-within:scale-[1.03] hover:scale-[1.03] motion-reduce:focus-within:scale-100 motion-reduce:hover:scale-100 focus-within:dark:bg-slate-900 dark:hover:bg-slate-900">
			<div className="absolute -inset-0.5 z-[1] h-full rounded-lg bg-sky-500 bg-opacity-0 blur transition-all duration-300 group-focus-within:bg-opacity-80 group-hover:bg-opacity-80" />
			<Link
				to={`/${post.slug}`}
				className="relative z-[2] flex h-full w-full cursor-pointer flex-col rounded-lg"
				tabIndex={0}
				title={post.title}>
				<div className="absolute right-2 top-2 z-[1] flex flex-col gap-4 opacity-0 transition-opacity group-active:opacity-100 group-hover:lg:opacity-100">
					<button
						className="flex w-28 items-center justify-between rounded-md bg-white p-2 font-semibold text-black shadow-lg"
						onClick={handleCopy}
						tabIndex={-1}
						type="button">
						<Copy
							copied={copied}
							id={post.slug}
							text={["Copy link", "Copied"]}
						/>
					</button>
					<button
						className="flex w-28 items-center justify-between rounded-md bg-white p-2 font-semibold text-black shadow-lg"
						onClick={handleNewTab}
						tabIndex={-1}
						type="button">
						New tab{" "}
						<ArrowTopRightOnSquareIcon className="h-4 w-4" />
					</button>
				</div>
				{!noImage && post.coverImage ? (
					<img
						alt={post.title}
						className="hidden aspect-[21/9] h-[17.4rem] rounded-tl-lg rounded-tr-lg lg:block"
						src={post.coverImage}
					/>
				) : null}
				<div className="flex flex-1 flex-col rounded-lg bg-bgSecondary p-4 text-primary lg:rounded-tl-none lg:rounded-tr-none">
					<H3 className="mb-2 group-hover:text-sky-800 group-hover:transition-all dark:group-hover:text-sky-400">
						{post.title}
					</H3>
					<p className="mb-4">{post.description}</p>
					<div className="mt-auto flex gap-2 text-secondary">
						{post.date ? (
							<time dateTime={post.date}>
								{new Date(post.date).toLocaleDateString("en", {
									month: "short",
									year: "numeric",
									day: "numeric",
								})}
							</time>
						) : null}
						{post.categories?.length ? (
							<p className="flex gap-1 text-header">
								<em className="text-secondary">in</em>{" "}
								{formatter.format(post.categories)}
							</p>
						) : null}
						<span className="ml-auto inline-flex items-center gap-1">
							{post.readingTime ?? 1} min read{" "}
							<ArrowRightIcon className="h-3 w-3" />
						</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
