# React Router Framework-Mode Blog Plan

Create a pre-rendered React Router 7.10.1 “framework mode” blog (based on `blog-redux`) that mirrors the existing Remix blog’s UX and styling, sources posts from `blog-posts` at build time, and deploys cleanly as static HTML (e.g. GitHub Pages).

## Goals

-   Replace the Remix-based `blog` app with a simpler, static, React Router 7 framework-mode app in `blog-redux`.
-   Keep layout, styling, and behavior very similar to the current blog (Navbar, Footer, dark mode, Hero, PostPreview, categories, recommendations).
-   Source markdown posts from `blog-posts` at build time, including a `published` flag, so publishing is as simple as adding/editing markdown and rebuilding.
-   Preserve existing post permalinks: post detail pages should remain at `/:slug` (not `/blog/:slug`).
-   Keep `/blog` as the canonical blog index route.
-   Only posts with `published: true` are listed, prerendered, and reachable; unpublished (or missing `published`) should behave as 404.
-   Use React Router 7.10.1 framework mode (Vite plugin + `react-router.config.ts`) with `ssr: false` and `prerender` for good SEO and static hosting.

---

## 1. Framework Mode Strategy & Hosting

1. Use React Router’s framework mode in `blog-redux` (Vite plugin, `react-router.config.ts`, route modules) instead of a plain Vite + data-router setup.
2. Configure:
    - `ssr: false` (no runtime server rendering; pure static hosting).
    - `prerender` to generate HTML for:
        - `/`
        - `/blog`
        - `/:slug` for every published post.
3. Target static hosting (e.g. GitHub Pages) by relying on actual per-path HTML files from `prerender`, not SPA fallback rewrites.
4. Treat search params as client-only state (e.g. category filters on `/blog?q=...`): do not rely on separate prerendered HTML per query variant.
5. Continue to run checks after each significant step:
    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 2. Initialize Framework Mode in blog-redux

1. Install and configure the React Router framework-mode Vite plugin in `blog-redux`:
    - Add `react-router-dom@7.10.1` and any required framework packages (per docs).
    - Replace the current Vite React plugin usage (`@vitejs/plugin-react`) with the React Router Vite plugin (`@react-router/dev/vite` → `reactRouter()`).
2. Add a `react-router.config.ts` at the root of `blog-redux` to define:
    - `ssr: false`
    - `prerender` (initially a small set of paths; later generated from posts).
    - `basename` or other relevant options as needed.
    - Decide the app directory strategy up front:
        - Option A (simplest): keep using the existing `src/` folder and set `appDirectory: "src"`.
        - Option B: migrate to an `app/` folder and move route modules/components there.
3. Set up the required framework-mode entry files:
    - A root layout file (e.g. `app/root.tsx`–style route module for the app shell).
    - Client entry and optional server entry (even with `ssr: false`, build-time rendering still uses a server entry).
    - Ensure there is only one “app entry” path (avoid keeping the default Vite `src/main.tsx` + `src/App.tsx` structure if it conflicts with framework-mode conventions).
4. Verify the empty/skeleton app renders:
    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 3. Define Route Modules and Structure

1. Use framework-mode route modules (file-based or config-based) that mirror Remix routes:

    - Root layout route:
        - Wraps everything in the shared layout (Navbar, dark mode, Footer).
    - `/` (home):
        - Hero section and featured posts.
    - `/blog`:
        - Blog index with category filters and pagination.
    - `/$slug`:
        - Post detail page for each post slug (preserves existing permalinks).
    - Catch-all (e.g. `$.tsx` or `*` depending on conventions):
        - App-level 404 page.

2. Enforce published-only behavior at the routing/data layer:

    - Unpublished (or missing `published`) posts should render and behave like “not found” (404) even if the markdown file exists.

3. For each route module, export:

    - `default`: the route component.
    - `loader`: for routes that need data at pre-render and runtime navigation (`/`, `/blog`, `/$slug`).
    - `ErrorBoundary`: for route-level error handling where appropriate (especially `/$slug`).

4. Ensure route modules are prerender/hydration-safe:

    - No direct DOM access at module scope.
    - Any browser-only code should run in effects or guarded by environment checks.
    - Avoid theme/dark-mode hydration mismatches: if you set a default theme class in prerender output, apply user preference only after hydration or via a tiny pre-hydration script.

5. Run checks:

    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 4. Port Styling, Layout, and Components

1. Tailwind and global styles:

    - Copy and adapt Tailwind config from the existing Remix app (`blog`) into `blog-redux`:
        - Ensure `content` paths include `index.html` and `src/**/*.{ts,tsx}` in `blog-redux`.
    - Create/import a main Tailwind CSS file for `blog-redux` that:
        - Uses Tailwind `@tailwind base`, `@tailwind components`, `@tailwind utilities`.
        - Brings over the typography and theme CSS from the Remix app (colors, CSS variables, `prose` styles).

2. Shared layout and UI components (ported into `blog-redux/src/components` or equivalent):

    - `Navbar`
    - `Footer`
    - `DarkMode` toggle (ensure prerender/hydration-safe behavior; may still require a “hydrated” guard or a pre-hydration theme script)
    - `Hero`
    - `PostPreview`
    - Typography helpers (e.g. heading components)
    - Any small utility components (chips, share button, copy-link button) needed to match current UX

3. Adapt imports and navigation:

    - Replace Remix `Link` and `NavLink` with React Router equivalents from `react-router-dom`.
    - Ensure environmental differences (no `useFetcher`, no Remix-specific hooks) are accounted for.

4. Integrate these into the root layout route module so all pages share the same shell.

5. Run checks:

    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 5. Post Types and Markdown Pipeline (with `published`)

1. Define TypeScript types for posts in `blog-redux` (e.g. `src/types/posts.ts`):

    - `PostMeta` fields:
        - `slug: string`
        - `title: string`
        - `date: string` (or `Date` after parsing)
        - `description: string`
        - `categories: string[]`
        - `coverImage?: string` (map from frontmatter `cover_image`)
        - `published: boolean` (treat missing frontmatter `published` as `false`)
        - `readingTime: number` (minutes)
    - `Post`:
        - `meta: PostMeta`
        - `content: string | ReactNode` (depending on rendering strategy)
        - `toc: TocItem[]` (headings for sidebar/TOC if needed)

2. Build-time markdown pipeline (Node-only):

    - Create a script or module that:
        - Reads markdown files from `blog-posts`.
        - Parses frontmatter (using something like `gray-matter`).
        - Extracts `published` and other fields into the defined types.
        - Normalizes frontmatter naming (e.g. `cover_image` → `coverImage`) so the rest of the app uses one consistent shape.
        - Computes:
            - Parsed `date`
            - `readingTime` (word count based)
            - `toc` (from headings).
    - Expose an API for route loaders:
        - A function to list all posts (filtered to `published: true` for public views).
        - A function to get a single post by slug.
    - Decide rendering approach:
        - Option A: Pre-compile to MDX/React elements.
        - Option B: Keep markdown strings and render via a lightweight markdown renderer with Tailwind `prose` styling.

3. Run checks after integrating basic data functions:

    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 6. Wire Loaders and `prerender` to Post Data

1. `/blog` loader:

    - Import the post data utilities.
    - Return a list of `PostMeta` (only `published: true`).
    - Prefer returning _all_ published posts and applying category filters client-side via search params.
    - Optionally pre-compute pagination metadata (e.g. page size, total pages).

2. `/$slug` loader:

    - Use the slug param to fetch a post.
    - If the post is not found or not `published`, throw `data("Not Found", { status: 404 })`.
    - Include recommended posts (e.g. recent posts excluding the current one).

3. `/` loader:

    - Fetch all published posts.
    - Select "featured" posts (e.g. the most recent few) to show on the homepage.

4. `react-router.config.ts` `prerender`:

    - Use the markdown pipeline to discover all published slugs.
    - Configure `prerender` to include:
        - `/`
        - `/blog`
        - `/<slug>` for every published post.
    - Ensure the build output includes any additional prerender artifacts required for loaders/runtime navigation (not just HTML) and deploy them alongside the HTML.
    - Optionally include 404 or other static pages if desired.

5. Run checks:

    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 7. Implement Components with Hooks and UX Details

1. Blog index (`/blog`):

    - Consume loader data via `useLoaderData`.
    - Use `useSearchParams` to read and write category filters to the URL.
    - Implement pagination ("load more") logic similar to the Remix version (e.g. show N posts at a time).

2. Blog post detail (`/blog/$slug`):

3. Blog post detail (`/$slug`):

    - Use `useLoaderData` and `useParams` to get the post and slug.
    - Render post metadata, cover image, categories, reading time.
    - Render the body (markdown/MDX) inside Tailwind `prose` styling.
    - Show recommendations based on loader-provided data.
    - Include "Edit on GitHub" link pointing to the corresponding file in the `blog-posts` repo.

4. Error boundaries and 404:

    - Root-level `ErrorBoundary` for global errors.
    - Route-level `ErrorBoundary` for `/$slug` to display "Post not found" plus some recommended posts.
    - A catch-all 404 route that renders a generic not-found page with suggestions.

5. Scroll and transitions:

    - Use the framework-mode scroll restoration mechanism in the root layout.
    - Optionally add pending-state UI using React Router's navigation hooks for nice transitions.

6. Run checks:

    - `npm run lint`
    - `npm run build`
    - `tsc --noEmit`

---

## 8. GitHub Pages / Static Deployment and Package Updates

1. Vite and framework config:

    - Ensure `react-router.config.ts` and the Vite plugin produce outputs suitable for static hosting.
        - Set `basename` (React Router) and `base` (Vite) consistently so links and assets work: - If deploying to GitHub **Project Pages** (`https://<user>.github.io/<repo>/`): set both to `/<repo>`. - If deploying to a **root domain** (custom domain or user/org Pages at `/`): set both to `/`.
          (If you’re unsure initially, make this a single build-time setting so you can switch without code changes.)
        - Ensure a proper static 404 page is generated for GitHub Pages (serve `404.html`), matching your in-app not-found UI.

2. Deployment workflow:

    - Decide on deployment strategy:
        - Build locally and push the `dist` output to a `gh-pages` branch.
        - Or configure GitHub Actions to run `npm install`, `npm run build`, and publish the static output.
    - Ensure the build environment has access to `blog-posts` during build/prerender:
        - Use a git submodule, a second `actions/checkout`, or a copy step.
        - Do not rely on runtime filesystem access on the deployed site.
    - Ensure the static host serves the generated HTML/JS/CSS artifacts as-is.

3. Package updates:

    - Run `npm outdated` and `npm audit` in `blog-redux`.
    - Update React, TypeScript, Vite, ESLint, Tailwind, and related tooling to current compatible versions, keeping `react-router-dom` at 7.10.1.
    - After updates, run:

        - `npm run lint`
        - `npm run build`
        - `tsc --noEmit`

---

## Further Considerations

1. You can later extend the framework setup to support more advanced features (e.g. RSS generation at build time, localized routes, or additional pages) without changing the overall architecture.
2. If hosting constraints change (e.g. moving to a platform with flexible routing), you can revisit `ssr` and `prerender` settings to enable more dynamic behavior or hybrid SSR/SSG.
