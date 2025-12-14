import { classNames } from "../../utils/common";

type Props = {
	children: React.ReactNode;
	className?: string;
};

export function H2({ children, className = "" }: Props) {
	return (
		<h2 className={classNames("font-medium text-header", className)}>
			{children}
		</h2>
	);
}

export function H3({ children, className = "" }: Props) {
	return (
		<h3 className={classNames("text-lg font-medium", className)}>
			{children}
		</h3>
	);
}
