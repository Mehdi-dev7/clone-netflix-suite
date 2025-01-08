import * as React from "react";
import { AuthApp } from "./AuthApp";
import { UnauthApp } from "./UnauthApp";
import { useAuth } from "./context/authContext";
import { AppProviders } from "./context";

function App() {
	return (
		<AppProviders>
			<AppConsumer />
		</AppProviders>
	);
}

const AppConsumer = () => {
	const { authUser } = useAuth();
	return authUser ? <AuthApp /> : <UnauthApp />;
};

export { App };
