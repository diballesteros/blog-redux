import {
	CloudIcon,
	MoonIcon,
	SparklesIcon,
	SunIcon,
} from "@heroicons/react/20/solid";

import useDarkMode from "../../hooks/useDarkMode";
import { classNames } from "../../utils/common";

type Props = {
	unfocusable?: boolean;
};

export default function DarkMode({ unfocusable = false }: Props) {
	const { isDarkMode, toggle } = useDarkMode();

	return (
		<DarkModeButton
			isDarkMode={isDarkMode}
			toggle={toggle}
			unfocusable={unfocusable}
		/>
	);
}

const DarkModeButton = ({
	isDarkMode = false,
	toggle,
	unfocusable = false,
}: {
	isDarkMode: boolean;
	toggle: () => void;
	unfocusable: boolean;
}) => {
	return (
		<button
			className={classNames(
				isDarkMode ? "bg-black" : "bg-sky-300",
				"relative block h-14 w-14 min-w-[3.5rem] cursor-pointer overflow-hidden rounded-full border-2 border-solid border-gray-500 transition duration-700 ease-in-out hover:border-black focus:ring-2 focus:ring-active focus:ring-offset-2 dark:hover:border-white"
			)}
			data-testid="dark-mode"
			onClick={toggle}
			tabIndex={unfocusable ? -1 : 0}
			title="Toggle dark mode"
			type="button">
			<span
				className={classNames(
					"absolute inset-0 flex origin-halfway rounded-full bg-black transition duration-1000 motion-reduce:duration-[0s]",
					isDarkMode ? "rotate-0" : "rotate-180"
				)}>
				<MoonIcon className="absolute right-1 top-1 h-6 w-6 fill-white" />
				<SparklesIcon className="absolute left-1.5 top-5 h-3 w-3 fill-yellow-200" />
				<SparklesIcon className="absolute bottom-2 right-3 h-3 w-3 fill-yellow-200" />
			</span>
			<span
				className={classNames(
					"absolute inset-0 origin-halfway rounded-full bg-sky-300 transition duration-1000 motion-reduce:duration-[0s]",
					isDarkMode ? "-rotate-180" : "rotate-0"
				)}>
				<SunIcon className="absolute left-2 top-1 h-6 w-6 fill-yellow-400" />
				<CloudIcon className="absolute right-0.5 top-4 h-5 w-5 fill-white opacity-80" />
				<CloudIcon className="absolute bottom-1 left-1.5 h-5 w-5 fill-white opacity-80" />
			</span>
			<span className="sr-only">Toggle dark mode</span>
		</button>
	);
};
