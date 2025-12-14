import { motion, useReducedMotion } from "framer-motion";
import type { Dispatch, SetStateAction } from "react";

import DarkMode from "../DarkMode";
import useFocusTrap from "../../hooks/useFocusTrap";
import useLockedBody from "../../hooks/useLockedBody";
import { classNames } from "../../utils/common";
import Links from "./Links";

type Props = {
  setShowSidesheet: Dispatch<SetStateAction<boolean>>;
  show: boolean;
};

export default function MobileNav({ setShowSidesheet, show }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useFocusTrap(show);
  useLockedBody(show);

  const drawer = {
    collapsed: {
      translateX: "100%",
      transition: { translateX: { duration: shouldReduceMotion ? 0 : 0.7 } },
    },
    expanded: {
      translateX: 0,
      transition: { translateX: { duration: shouldReduceMotion ? 0 : 0.7 } },
    },
  };

  const MENU_BEFORE =
    "before:absolute before:left-0 before:h-1 before:w-10 before:-translate-y-2 before:rounded before:bg-black before:transition-all duration-1000 before:dark:bg-white ";
  const MENU_AFTER =
    "after:absolute after:left-0 after:h-1 after:w-10 after:translate-y-2 after:rounded after:bg-black after:transition-all duration-1000 after:dark:bg-white";

  return (
    <>
      <div className="ml-auto flex md:hidden">
        <button
          onClick={() => setShowSidesheet(!show)}
          className="relative z-10 flex h-10 w-10 items-center justify-items-center transition-all"
          type="button"
        >
          <div
            className={classNames(
              MENU_AFTER,
              MENU_BEFORE,
              show
                ? "bg-transparent before:-translate-y-0 before:rotate-45 after:translate-y-0 after:-rotate-45 dark:bg-transparent"
                : ""
            )}
          />
          <span className="sr-only">Toggle navigation sidesheet</span>
        </button>
      </div>
      <motion.aside
        className="pointer-events-none fixed inset-y-0 right-0 z-[1] w-full overflow-hidden md:hidden"
        initial="collapsed"
        animate={show ? "expanded" : "collapsed"}
        variants={drawer}
        aria-hidden={!show}
      >
        <div
          ref={ref}
          className="pointer-events-auto h-full w-screen max-w-full pt-24"
        >
          <div className="flex h-full flex-col bg-bgPrimary">
            <div className="flex h-full flex-col items-start justify-between px-4 pb-4">
              <Links unfocusable={!show} vertical />
              <div className="flex w-full items-center gap-3 justify-self-end">
                <DarkMode unfocusable={!show} />
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
