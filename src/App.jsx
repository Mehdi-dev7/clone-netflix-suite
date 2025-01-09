import * as React from "react";
import {useAuth} from "./context/authContext";
import { AppProviders } from "./context";
import LoadingFullScreen from "./components/LoadingFullScreen";

const AuthApp = React.lazy(() => import(/* webpackPrefetch: true */ "./AuthApp"));
const UnauthApp = React.lazy(() => import("./UnauthApp"));

function App() {
	return (
		<AppProviders>
			<AppConsumer />
		</AppProviders>
	);
}

const AppConsumer = () => {
	const { authUser } = useAuth();

	return (
		<React.Suspense fallback={<LoadingFullScreen />}>
			{authUser ? <AuthApp /> : <UnauthApp />}
		</React.Suspense>
	);
};

export { App };
