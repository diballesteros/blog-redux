# blog-redux

Static blog built with React Router v7 framework mode (`ssr: false` + `prerender`). Posts are sourced at build time from the sibling repo `../blog-posts`.

## Local development

- Install: `npm install`
- Dev server: `npm run dev`
- Lint: `npm run lint`
- Build (generates static output in `build/client`): `npm run build`
- Preview static build: `npm run preview`

### Content source

By default, the build reads markdown from `../blog-posts`. You can override this with:

- `BLOG_POSTS_DIR=/absolute/path/to/blog-posts`

Only posts with `published: true` in frontmatter are listed and prerendered.

## Deploying to GitHub Pages (Project Pages)

This repo is set up for GitHub **Project Pages** (site lives under `/<repo>/`).

- React Router base path: `RR_BASENAME=/<repo>`
- Vite base path: `VITE_BASE=/<repo>/`

For local testing, copy `.env.example` to `.env.local` and adjust `RR_BASENAME` / `VITE_BASE` to match your repo name.

The workflow in `.github/workflows/deploy.yml` builds and deploys `build/client`.

In your repo settings, set **Pages** source to **GitHub Actions**.
