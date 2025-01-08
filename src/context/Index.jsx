import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "./authContext";
import { HistoryMovieProvider } from "./HistoryMoviesContext";

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

function AppProviders({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={theme}>
				<HistoryMovieProvider>
					<AuthProvider>{children}</AuthProvider>
				</HistoryMovieProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export { AppProviders };
