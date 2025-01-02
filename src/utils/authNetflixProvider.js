/* 
 -- Ne pas modifier --
 Exemple d'utilitaire permettant de se connecter au backend Netflix
*/
import { localStorageTokenKey } from "../config";
import { clientAuth } from "./clientApi";

function handleUserResponse({ user }) {
	window.localStorage.setItem(localStorageTokenKey, user.token);
	return user;
}

function getToken() {
	return window.localStorage.getItem(localStorageTokenKey);
}

function login({ username, password }) {
	return clientAuth("login", { username, password }).then(handleUserResponse);
}

function register({ username, password }) {
	return clientAuth("register", { username, password }).then(
		handleUserResponse
	);
}

function logout() {
	window.localStorage.removeItem(localStorageTokenKey);
}

export { getToken, login, logout, register };
