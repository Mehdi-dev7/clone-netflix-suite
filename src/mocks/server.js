import { http, createServer } from "msw";
import { handlers } from "./handlers";

export const server = createServer(handlers);

if (process.env.NODE_ENV === "test") {
	server.listen();
	console.log("🔶 Mock Service Worker activé pour les tests");
}

export { http };
