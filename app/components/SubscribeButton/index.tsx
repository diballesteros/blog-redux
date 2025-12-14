export default function SubscribeButton() {
	return (
		<a
			className="link-wrapper flex w-fit items-center gap-4 rounded-md border-transparent bg-blue-900 px-3 py-2 text-lg font-bold leading-4 text-white transition-all hover:rotate-3 hover:scale-105"
			href="https://relatablecode.substack.com"
			rel="noreferrer"
			target="_blank">
			<div className="wrapper sm:motion-safe:animate-[wiggle_1s_ease-in-out_infinite]">
				<div className="lid-one" />
				<div className="lid-two" />
				<div className="envelope" />
				<div className="letter" />
				<span className="sr-only">Envelope</span>
			</div>
			Subscribe
		</a>
	);
}
