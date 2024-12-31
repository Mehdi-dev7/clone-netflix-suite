import axios from "axios";
import { apiKey, lang, API_URL } from "../config";

const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

const clientApi = async (endpoint) => {
	const page = 1;
	//await sleep(1000);
	const startChar = endpoint.includes("?") ? `&` : `?`;
	const keyLang = `${startChar}api_key=${apiKey}&language=${lang}&page=${page}`;
	return axios.get(`${API_URL}/${endpoint}${keyLang}`);
};

const clientAuth = async (endpoint, { token, data }) => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
			params: {
				api_key: apiKey,
			},
		};

		if (token) {
			config.params.session_id = token;
		}

		const response = data
			? await axios.post(`${API_URL}/${endpoint}`, data, config)
			: await axios.get(`${API_URL}/${endpoint}`, config);

		return response;
	} catch (error) {
		console.error("Auth error:", error);
		throw error;
	}
};

export { clientApi, clientAuth };
