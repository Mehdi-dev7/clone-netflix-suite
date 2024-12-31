import * as React from "react";
import "./mocks";
import * as authNetflix from "./utils/authNetflixProvider";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { UnauthApp } from "./UnauthApp";
import { AuthApp } from "./AuthApp";
import { useFetchData } from "./utils/hooks";
import { clientAuth } from "./utils/clientApi";
import { Backdrop, CircularProgress } from "@mui/material";

const theme = createTheme({
	palette: {
		type: "dark",
		primary: {
			main: "#E50914",
		},
		secondary: {
			main: "#E50914",
		},
	},
});

async function getUserByToken() {
	let user = null;
	const sessionId = await authNetflix.getToken();

	if (sessionId) {
		try {
			const data = await clientAuth("account", {
				token: sessionId,
			});
			user = data.data;
		} catch (error) {
			console.error("Error fetching user:", error);
			authNetflix.logout();

			// Tentative d'auto-login si la session est invalide
			try {
				user = await authNetflix.autoLogin();
			} catch (autoLoginError) {
				console.log("Auto-login failed", autoLoginError);
			}
		}
	} else {
		// Tentative d'auto-login s'il n'y a pas de session
		try {
			user = await authNetflix.autoLogin();
		} catch (error) {
			console.log("No stored credentials or auto-login failed");
		}
	}
	return user;
}

function App() {
	const { data: authUser, error, setData, execute, status } = useFetchData();
	const [authError, setAuthError] = React.useState();

	React.useEffect(() => {
		execute(getUserByToken());
	}, [execute]);

	const login = (data) => {
		authNetflix
			.login(data)
			.then((user) => setData(user))
			.catch((err) => setAuthError(err));
	};

	const register = (data) => {
		authNetflix
			.register(data)
			.then((user) => setData(user))
			.catch((err) => setAuthError(err));
	};

	const logout = () => {
		authNetflix.logout();
		setData(null);
	};

	return (
		<ThemeProvider theme={theme}>
			{status === "fetching" ? (
				<Backdrop open={true}>
					<CircularProgress color="primary" />
				</Backdrop>
			) : authUser ? (
				<AuthApp logout={logout} />
			) : (
				<UnauthApp login={login} register={register} error={authError} />
			)}
		</ThemeProvider>
	);
}

export { App };
