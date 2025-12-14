import { Link } from "react-router";

import { ROUTES } from "../../constants/routes";

export default function Footer() {
  return (
    <footer className="relative border-t border-solid border-secondary bg-bgPrimary">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-8 py-6 sm:flex-row sm:items-stretch">
        <div className="flex flex-col justify-between">
          <div className="text-4xl text-primary">Relatable Code</div>
          <span className="hidden text-sm text-secondary sm:block">
            © 2020-{new Date().getFullYear()} Relatable Code. All Rights Reserved.
          </span>
        </div>
        <section className="flex w-full justify-center gap-40 sm:w-auto sm:gap-24">
          <nav className="flex flex-col gap-2 text-secondary">
            <span className="mb-1 text-xl text-primary">Sitemap</span>
            <Link to={ROUTES.BLOG}>Blog</Link>
          </nav>
          <nav className="flex flex-col gap-2 text-secondary">
            <span className="mb-1 text-xl text-primary">Links</span>
            <a
              href="https://github.com/diballesteros"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </section>
        <span className="block text-sm text-secondary sm:hidden">
          © 2020-{new Date().getFullYear()} Relatable Code. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
