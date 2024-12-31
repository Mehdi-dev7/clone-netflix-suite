import { http } from "msw";
import * as users from "./db";
import { AUTH_URL } from "../config";

/*pour simuler du delais*/
// eslint-disable-next-line no-unused-vars
const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

const handlers = [
	http.post(`${AUTH_URL}/login`, async ({ request }) => {
		const { username, password } = await request.json();
		// await sleep(3000)
		const user = await users.authenticate({ username, password });
		return Response.json({ user });
	}),

	http.post(`${AUTH_URL}/register`, async ({ request }) => {
		const { username, password } = await request.json();
		const userFields = { username, password };
		await users.createUser(userFields);
		let user;
		try {
			user = await users.authenticate(userFields);
		} catch (error) {
			return new Response(
				JSON.stringify({ status: 400, message: error.message }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
		return Response.json({ user });
	}),

	http.get(`${AUTH_URL}/me`, async ({ request }) => {
		try {
			const user = await getUser(request);
			const token = getToken(request);
			return Response.json({ user: { ...user, token } });
		} catch (error) {
			return new Response(
				JSON.stringify({ status: error.status || 400, message: error.message }),
				{
					status: error.status || 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	}),
];

const getToken = (request) =>
	request.headers.get("Authorization")?.replace("Bearer ", "");

async function getUser(request) {
	const token = getToken(request);
	if (!token) {
		const error = new Error("Le Token est obligatoire");
		error.status = 401;
		throw error;
	}
	let userId;
	try {
		userId = Buffer.from(token, "base64").toString();
	} catch (e) {
		const error = new Error("token Invalid. Merci de se reconnecter.");
		error.status = 401;
		throw error;
	}
	const user = await users.loadUserById(userId, true);
	return user;
}

export { handlers };
