import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import {
	createTheme,
	StyledEngineProvider,
	ThemeProvider,
} from "@mui/material/styles";
import * as React from "react";
import { AuthApp } from "./AuthApp";
import "./mocks";
import { UnauthApp } from "./UnauthApp";
import * as authNetflix from "./utils/authNetflixProvider";
import { clientAuth } from "./utils/clientApi";
import { useFetchData } from "./utils/hooks";

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

async function getUserByToken() {
	const token = authNetflix.getToken();
	if (!token) return null;

	try {
		const { user } = await clientAuth("me");
		return user;
	} catch (error) {
		console.error("Auto-login failed:", error);
		authNetflix.logout();
		return null;
	}
}

function App() {
	const { data: authUser, execute, status, setData } = useFetchData();
	React.useEffect(() => {
		execute(getUserByToken());
	}, [execute]);

	const [authError, setAuthError] = React.useState();
	const login = (data) =>
		authNetflix
			.login(data)
			.then((user) => setData(user))
			.catch((err) => setAuthError(err));
	const register = (data) =>
		authNetflix
			.register(data)
			.then((user) => setData(user))
			.catch((err) => setAuthError(err));
	const logout = () => {
		authNetflix.logout();
		setData(null);
	};

	return (
		<StyledEngineProvider injectFirst>
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
		</StyledEngineProvider>
	);
}

export { App };
