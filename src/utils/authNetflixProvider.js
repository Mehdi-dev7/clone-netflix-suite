import { AUTH_URL, localStorageTokenKey } from "../config";

async function clientApiNetflix(endpoint, data) {
	const config = {
		method: "POST",
		body: JSON.stringify(data),
		headers: { "Content-Type": "application/json" },
	};

	return fetch(`${AUTH_URL}/${endpoint}`, config).then(async (response) => {
		const data = await response.json();
		if (response.ok) {
			return data;
		} else {
			console.log("clientApiNetflix ko", data);
			return Promise.reject(data);
		}
	});
}

function getToken() {
	return window.localStorage.getItem(localStorageTokenKey);
}

function storeToken({ user }) {
	window.localStorage.setItem(localStorageTokenKey, user.token);
	return user;
}

function login(form) {
	return clientApiNetflix("login", form).then(storeToken);
}

function register(form) {
	return clientApiNetflix("register", form).then(storeToken);
}

function logout() {
	window.localStorage.removeItem(localStorageTokenKey);
}

export { getToken, login, register, logout };
