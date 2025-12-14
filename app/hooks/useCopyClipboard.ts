import { useEffect, useState } from "react";

export default function useCopyClipboard(text?: string) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => setCopied(false), 2000);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	const handleCopy = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		e.stopPropagation();
		if (!navigator?.clipboard) return;

		try {
			await navigator.clipboard.writeText(text ?? "");
			setCopied(true);
		} catch {
			// ignore
		}
	};

	const handleManualCopy = async (nextText: string) => {
		if (!navigator?.clipboard) return;

		try {
			await navigator.clipboard.writeText(nextText);
			setCopied(true);
		} catch {
			// ignore
		}
	};

	return { copied, handleCopy, handleManualCopy };
}
