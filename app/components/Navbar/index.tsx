import { useLocation } from "react-router";
import { useEffect, useState } from "react";

import DarkMode from "../DarkMode";
import RelatableCode from "../RelatableCode";
import Spacer from "../Spacer";
import Links from "./Links";
import MobileNav from "./MobileNav";

export default function Navbar() {
  const [showSidesheet, setShowSidesheet] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setShowSidesheet(false);
  }, [location]);

  return (
    <div className="relative z-20 mx-auto w-full max-w-6xl px-8">
      <Spacer size="sm" />
      <header
        className="align-center relative flex h-16 justify-center p-0"
        data-testid="header"
      >
        <RelatableCode />
        <Links />
        <div className="ml-auto hidden items-center justify-center md:flex md:gap-4 lg:gap-8">
          <DarkMode />
        </div>
        <MobileNav show={showSidesheet} setShowSidesheet={setShowSidesheet} />
      </header>
    </div>
  );
}
