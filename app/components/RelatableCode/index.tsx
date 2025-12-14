import { Link } from "react-router";

const title = ["R", "e", "l", "a", "t", "a", "b", "l", "e", " ", "C", "o", "d", "e"];

export default function RelatableCode() {
  return (
    <Link
      className="flex items-center"
      to="/"
      title="Relatable Code"
      aria-label="Relatable Code"
    >
      <h1 className="flex w-fit flex-nowrap text-xl font-medium tracking-widest text-primary sm:text-2xl md:mr-8 lg:mr-12">
        {title.map((letter, index) => (
          <span
            key={`title-${letter}-${index}`}
            className="ml-1 inline-block text-primary duration-200 motion-reduce:hover:rotate-0 motion-reduce:hover:scale-100 sm:hover:-translate-y-1 sm:hover:-rotate-12 sm:hover:scale-105"
          >
            {letter}
          </span>
        ))}
      </h1>
    </Link>
  );
}
