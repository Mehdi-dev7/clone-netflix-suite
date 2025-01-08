import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { AuthApp } from "./AuthApp";
import "./mocks";
import { UnauthApp } from "./UnauthApp";
import { QueryClient, QueryClientProvider } from "react-query";
import {  AuthProvider, useAuth } from "./context/authContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * 60 * 1000, // 5 minutes
			cacheTime: 15 * 60 * 1000, // 15 minutes
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retryDelay: 500,
		},
		mutations: {
			useErrorBoundary: false,
			refetchOnWindowFocus: false,
			retryDelay: 500,
			retry: 1,
			// mutation options
		},
	},
});

const theme = createTheme({
	palette: {
		mode: "dark",
		primary: {
			main: "#E50914",
		},
		secondary: {
			main: "#E50914",
		},
	},
	spacing: 8,
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
	},
});

// async function getUserByToken() {
// 	const token = authNetflix.getToken();
// 	if (!token) return null;

// 	try {
// 		const { user } = await clientAuth("me");
// 		return user;
// 	} catch (error) {
// 		console.error("Auto-login failed:", error);
// 		authNetflix.logout();
// 		return null;
// 	}
// }

function App() {
// 	const { data: authUser, execute, status, setData } = useFetchData();
// 	React.useEffect(() => {
// 		execute(getUserByToken());
// 	}, [execute]);

// 	const [authError, setAuthError] = React.useState();
// 	const login = (data) =>
// 		authNetflix
// 			.login(data)
// 			.then((user) => setData(user))
// 			.catch((err) => setAuthError(err));
// 	const register = (data) =>
// 		authNetflix
// 			.register(data)
// 			.then((user) => setData(user))
// 			.catch((err) => setAuthError(err));
// 	const logout = () => {
// 		authNetflix.logout();
// 		queryClient.clear();
// 		setData(null);
// 	};

	
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<AuthProvider>
					<AppConsumer/>
				</AuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

const AppConsumer = () => {
	const { authUser } = useAuth();
	return authUser ? <AuthApp /> : <UnauthApp />;
};

export { App };
