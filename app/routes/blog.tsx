import { Link, useLoaderData, useSearchParams } from "react-router";

import { getAllPublishedPostMetas } from "../utils/posts.server";
import PostPreview from "../components/PostPreview";
import Spacer from "../components/Spacer";
import { H2 } from "../components/Typography";

const QUERY_KEY = "q";

export async function loader() {
  const posts = await getAllPublishedPostMetas();
  return { posts };
}

export default function BlogIndex() {
  const { posts } = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get(QUERY_KEY);
  const active = q ? q.split(" ").filter(Boolean) : [];

  const categories = Array.from(
    new Set(posts.flatMap((p) => p.categories ?? []))
  ).sort((a, b) => a.localeCompare(b));

  const filtered = active.length
    ? posts.filter((p) => active.every((c) => p.categories.includes(c)))
    : posts;

  const toggle = (category: string) => {
    const next = new Set(active);
    if (next.has(category)) next.delete(category);
    else next.add(category);

    const nextQuery = Array.from(next).join(" ");
    const nextParams = new URLSearchParams(searchParams);
    if (nextQuery) nextParams.set(QUERY_KEY, nextQuery);
    else nextParams.delete(QUERY_KEY);
    setSearchParams(nextParams, { replace: true });
  };

  return (
    <main className="mx-auto flex max-w-6xl flex-col px-8 text-primary">
      <Spacer size="xl" />
      <H2 className="text-4xl">Blog</H2>

      {categories.length > 0 ? (
        <section className="mt-10">
          <h3 className="text-2xl font-semibold">Search by category</h3>
          <div className="mt-4 flex flex-wrap gap-3">
            {categories.map((c) => {
              const selected = active.includes(c);
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => toggle(c)}
                  className={
                    selected
                      ? "rounded-full bg-bgSecondary px-4 py-2 text-active"
                      : "rounded-full bg-bgSecondary px-4 py-2 text-secondary hover:text-active"
                  }
                >
                  {c}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mt-10">
        <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {filtered.map((post) => (
            <li key={post.slug}>
              <PostPreview post={post} />
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-10">
        <Link className="text-lg font-medium hover:text-active" to="/">
          ← Back home
        </Link>
      </div>
      <Spacer size="xxl" />
    </main>
  );
}
