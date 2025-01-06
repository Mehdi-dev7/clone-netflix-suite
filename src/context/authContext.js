import React from "react";
import * as authNetflix from "../utils/authNetflixProvider";
import { clientAuth } from "../utils/clientApi";
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
// async function getUserByToken() {
// 	let user = null;
// 	const token = await authNetflix.getToken();
// 	if (token) {
// 		const data = await clientAuth("me", { token });
// 		user = data.data.user;
// 	}
// 	return user;
// }

// const AuthProvider = (props) => {
// 	const queryClient = useQueryClient();
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
	
// };

export { AuthContext, useAuth };
