import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";

// https://vite.dev/config/
export default defineConfig({
	// For GitHub Project Pages you must set base to "/<repo>/".
	// We read VITE_BASE first, then fall back to RR_BASENAME.
	base:
		process.env.VITE_BASE ??
		(process.env.RR_BASENAME
			? `${process.env.RR_BASENAME.replace(/\/+$/, "")}/`
			: "/"),
	plugins: [reactRouter()],
});
