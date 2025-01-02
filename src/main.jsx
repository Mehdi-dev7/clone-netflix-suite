import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

async function prepare() {
	if (import.meta.env.DEV) {
		const { worker } = await import("./mocks/browser");
		return worker.start({
			onUnhandledRequest: "bypass",
		});
	}
	return Promise.resolve();
}

prepare().then(() => {
	createRoot(document.getElementById("root")).render(
		<StrictMode>
			<App />
		</StrictMode>
	);
});
