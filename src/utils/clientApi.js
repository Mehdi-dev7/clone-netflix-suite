import axios from "axios";
import {
	API_URL,
	apiKey,
	AUTH_URL,
	lang,
	localStorageTokenKey,
} from "../config";

// utilise 'sleep' pour simuler des api longue
//const sleep = t => new  Promise((resolve) =>setTimeout(resolve, t))

const clientApi = async (endpoint) => {
	const page = 1;
	const startChar = endpoint.includes("?") ? `&` : `?`;
	const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`;
	return axios.get(`${API_URL}/${endpoint}${keyLang}`);
};

async function clientAuth(endpoint, data) {
	const token = window.localStorage.getItem(localStorageTokenKey);

	const config = {
		method: data ? "POST" : "GET",
		body: data ? JSON.stringify(data) : undefined,
		headers: {
			"Content-Type": "application/json",
			...(token && { Authorization: `Bearer ${token}` }),
		},
	};

	const response = await fetch(`${AUTH_URL}/${endpoint}`, config);
	const responseData = await response.json();

	if (response.ok) {
		return responseData;
	} else {
		return Promise.reject(responseData);
	}
}

function getToken() {
	return window.localStorage.getItem(localStorageTokenKey);
}

function logout() {
	window.localStorage.removeItem(localStorageTokenKey);
}

const clientNetFlix = async (endpoint, { token, data, method = "GET" }) => {
	const config = {
		method,
		url: `${AUTH_URL}/${endpoint}`,
		data: JSON.stringify(data),
		headers: {
			Authorization: token ? `Bearer ${token}` : undefined,
			"Content-Type": data ? "application/json" : undefined,
		},
	};
	return axios(config)
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			if (error.response) {
				return Promise.reject(error.response.data);
			}
		});
};

export { clientApi, clientAuth, clientNetFlix, getToken, logout };
