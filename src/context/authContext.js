import React from "react";
import * as authNetflix from "../utils/authNetflixProvider";
import { clientAuth, clientNetFlix } from "../utils/clientApi";
import { useFetchData } from "../utils/hooks";
import { useQueryClient } from "react-query";
import { useClearHistory } from "./HistoryMoviesContext";
import LoadingFullScreen from "../components/LoadingFullScreen";

const AuthContext = React.createContext();

const useAuth = () => {
	const context = React.useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth() s'utilise avec <AuthContext.provider>");
	}
	return context;
};

async function getUserByToken() {
	const token = authNetflix.getToken();
	if (!token) return null;

	try {
		const { user } = await clientAuth("me");
		return user;
	} catch (error) {
		authNetflix.logout();
		return null;
	}
}
const AuthProvider = (props) => {
	const queryClient = useQueryClient();
	const { data: authUser, execute, status, setData } = useFetchData();
	const clearHistory = useClearHistory();

	React.useEffect(() => {
		execute(getUserByToken());
	}, [execute]);

	const [authError, setAuthError] = React.useState();

	const login = React.useCallback((data) => { 
		authNetflix
			.login(data)
			.then((user) => setData(user))
			.catch((err) => setAuthError(err));
  }, [setData]);

  const register = React.useCallback((data) => {
    
    authNetflix
    .register(data)
    .then((user) => setData(user))
    .catch((err) => setAuthError(err));
  }, [setData]);

	const logout = React.useCallback(  () => {
		authNetflix.logout();
		queryClient.clear();
		clearHistory();
		setData(null);
	}, [queryClient, clearHistory, setData]);

   const value = React.useMemo(
    () => ({ authUser, login, register, logout, authError }),
    [authUser, login, register, logout, authError]
  );

	if (status === "fetching" || status === "idle") {
		return React.createElement(LoadingFullScreen); // LoadingFullScreen 
	}

	if (status === "done") {
	
		return React.createElement(AuthContext.Provider, {
			value,
			...props,
		});
	}

	throw new Error("status invalide");
};

const useClientNetflix = () => {
	const {
		authUser: { token },
	} = useAuth();

	return (endpoint, data) => clientNetFlix(endpoint, { ...data, token });
};

export { AuthContext, useAuth, AuthProvider, useClientNetflix };
