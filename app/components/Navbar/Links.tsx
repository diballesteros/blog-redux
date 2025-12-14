import NavbarLink from "../NavbarLink";
import { ROUTES } from "../../constants/routes";
import { classNames } from "../../utils/common";

const HORIZONTAL_CLASSES = "hidden text-lg md:block";
const VERTICAL_CLASSES = "text-xl";

type Props = {
	vertical?: boolean;
	unfocusable?: boolean;
};

export default function Links({
	vertical = false,
	unfocusable = false,
}: Props) {
	return (
		<nav
			className={classNames(
				"font-medium text-primary",
				!vertical ? HORIZONTAL_CLASSES : VERTICAL_CLASSES
			)}>
			<ul className={`flex ${vertical ? "flex-col" : "flex-row"}`}>
				<li className="m-3 p-2">
					<NavbarLink
						text="Blog"
						to={ROUTES.BLOG}
						unfocusable={unfocusable}
					/>
				</li>
			</ul>
		</nav>
	);
}
