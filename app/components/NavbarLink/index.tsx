import { NavLink } from "react-router";

import { classNames } from "../../utils/common";

type Props = {
  className?: string;
  text: string;
  to: string;
  unfocusable?: boolean;
};

export default function NavbarLink({
  className = "",
  text,
  to,
  unfocusable = false,
}: Props) {
  return (
    <NavLink
      className={({ isActive }) =>
        classNames(
          "relative after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:transition after:duration-300 after:ease-in after:content-[''] hover:after:scale-x-100 hover:after:bg-current motion-reduce:after:transition-none",
          className,
          isActive
            ? "text-header after:absolute after:-bottom-1 after:left-0 after:block after:h-0.5 after:w-full after:scale-x-100 after:bg-current after:transition after:ease-in after:content-['']"
            : ""
        )
      }
      to={to}
      tabIndex={unfocusable ? -1 : 0}
    >
      {text}
    </NavLink>
  );
}
