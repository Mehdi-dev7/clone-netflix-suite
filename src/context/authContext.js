import React from "react";
import * as authNetflix from "../utils/authNetflixProvider";
import { clientAuth, clientNetFlix } from "../utils/clientApi";
import { useFetchData } from "../utils/hooks";
import { useQueryClient } from "react-query";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    queryClient.clear();
    setData(null);
  };

  if (status === "fetching" || status === "idle") {
    return React.createElement(
      Backdrop,
      { open: true },
      React.createElement(CircularProgress, { color: "primary" })
    );
  }

  if (status === "done") {
    const value = { authUser, login, register, logout, authError };
    return React.createElement(AuthContext.Provider, {
      value,
      ...props,
    });
  }

  throw new Error("status invalide");
};

const useClientNetflix = () => {
	const {authUser:{token}} = useAuth()
	
	return (endpoint, data) => clientNetFlix(endpoint, {...data, token})
}


export { AuthContext, useAuth, AuthProvider, useClientNetflix };
