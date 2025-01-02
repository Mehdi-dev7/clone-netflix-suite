import { http } from "msw";
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

if (import.meta.env.DEV) {
	worker
		.start({
			onUnhandledRequest: "bypass",
		})
		.catch(console.error);
}

export { http };
