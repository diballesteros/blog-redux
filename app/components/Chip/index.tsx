import {
	AnimatePresence,
	motion,
	useReducedMotion,
	type Variants,
} from "framer-motion";
import type { ChangeEvent, KeyboardEvent } from "react";

import { BLOG_QUERY_VARIABLE } from "../../constants/variables";
import { classNames } from "../../utils/common";

type Props = {
	checked: boolean;
	name: string;
	setQuery: (name: string[]) => void;
};

export default function Chip({ checked, name, setQuery }: Props) {
	const shouldReduceMotion = useReducedMotion();

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		e.stopPropagation();

		if (e.currentTarget.form) {
			const form = new FormData(e.currentTarget.form);
			const values = form.getAll(BLOG_QUERY_VARIABLE) as string[];
			if (values?.length && values[0]) {
				setQuery(values);
			} else {
				setQuery([]);
			}
		}
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>) => {
		if (e.key === " ") {
			e.preventDefault();
			e.currentTarget.click();
		}
	};

	const draw: Variants = {
		hidden: {
			pathLength: 0,
			opacity: 0,
		},
		visible: {
			pathLength: 1,
			opacity: 1,
			transition: {
				pathLength: shouldReduceMotion
					? { duration: 0 }
					: { delay: 0.5, type: "spring", bounce: 0 },
				opacity: shouldReduceMotion
					? { duration: 0 }
					: { delay: 0.5, duration: 0.01 },
			},
		},
	};

	const tag = {
		collapsed: {
			paddingLeft: "1rem",
			transition: {
				paddingLeft: { duration: shouldReduceMotion ? 0 : 0.5 },
			},
		},
		expanded: {
			paddingLeft: "2.5rem",
			transition: {
				paddingLeft: { duration: shouldReduceMotion ? 0 : 0.5 },
			},
		},
	};

	return (
		<motion.label
			className={classNames(
				"relative flex cursor-pointer items-center gap-2 rounded-full border-current px-4 py-3 text-lg font-medium transition-transform duration-300 motion-safe:hover:scale-110 motion-safe:focus:scale-110",
				checked
					? "border-2 text-active"
					: "border-[0.5px] text-secondary"
			)}
			initial="collapsed"
			animate={checked ? "expanded" : "collapsed"}
			variants={tag}
			tabIndex={0}
			onKeyDown={handleKeyDown}>
			<AnimatePresence>
				{checked && (
					<motion.svg
						xmlns="http://www.w3.org/2000/svg"
						className="absolute left-2 top-4 h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth={2}
						initial="hidden"
						animate="visible"
						exit={shouldReduceMotion ? undefined : "hidden"}>
						<motion.path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M5 13l4 4L19 7"
							variants={draw}
						/>
					</motion.svg>
				)}
			</AnimatePresence>
			{name}
			<input
				aria-checked={checked}
				defaultChecked={checked}
				hidden
				id={`chip-${name}`}
				name={BLOG_QUERY_VARIABLE}
				onChange={handleChange}
				type="checkbox"
				value={name}
			/>
		</motion.label>
	);
}
