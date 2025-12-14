import useIsomorphicLayoutEffect from "./useIsomorphicLayout";

export default function useLockedBody(locked = false) {
	useIsomorphicLayoutEffect(() => {
		if (!locked) {
			return;
		}

		const originalOverflow = document.body.style.overflow;
		const originalPaddingRight = document.body.style.paddingRight;

		document.body.style.overflow = "hidden";

		const root = document.getElementById("root");
		const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0;

		if (scrollBarWidth) {
			document.body.style.paddingRight = `${scrollBarWidth}px`;
		}

		return () => {
			document.body.style.overflow = originalOverflow;

			if (scrollBarWidth) {
				document.body.style.paddingRight = originalPaddingRight;
			}
		};
	}, [locked]);
}
