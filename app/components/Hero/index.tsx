import Subscribe from "../Subscribe";

export default function Hero() {
  return (
    <div className="flex flex-col-reverse items-center gap-8 rounded-lg md:flex-row">
      <div className="md:flex-60">
        <Subscribe />
      </div>
    </div>
  );
}
