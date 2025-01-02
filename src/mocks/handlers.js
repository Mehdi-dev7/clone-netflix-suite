import { http } from "msw";
import { AUTH_URL } from "../config";
import * as db from "./db";

/*pour simuler du delais*/
// eslint-disable-next-line no-unused-vars
const sleep = (t) => new Promise((resolve) => setTimeout(resolve, t));

const handlers = [
	http.post(`${AUTH_URL}/login`, async ({ request }) => {
		const { username, password } = await request.json();
		// await sleep(3000)
		const user = await db.authenticate({ username, password });
		return Response.json({ user });
	}),

	http.post(`${AUTH_URL}/register`, async ({ request }) => {
		const { username, password } = await request.json();
		const userFields = { username, password };
		await db.createUser(userFields);
		let user;
		try {
			user = await db.authenticate(userFields);
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
				JSON.stringify({
					status: error.status || 401,
					message: error.message,
				}),
				{
					status: error.status || 401,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
	}),

	http.get(`${AUTH_URL}/bookmark`, async ({ request }) => {
		const user = await getUser(request);
		const uid = user.id;
		const bookmark = await db.loadBookmarkByUid(uid);
		return Response.json({ bookmark });
	}),

	http.post(`${AUTH_URL}/bookmark/tv`, async ({ request }) => {
		const user = await getUser(request);
		const { id } = await request.json();
		const uid = user.id;
		try {
			await db.addSerieToBookmark(id, uid);
		} catch (error) {
			return new Response(
				JSON.stringify({ status: 400, message: error.message }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
		const bookmark = await db.loadBookmarkByUid(uid);
		return Response.json({ bookmark });
	}),

	http.post(`${AUTH_URL}/bookmark/movie`, async ({ request }) => {
		const user = await getUser(request);
		const { id } = await request.json();
		const uid = user.id;
		try {
			await db.addMovieToBookmark(id, uid);
		} catch (error) {
			return new Response(
				JSON.stringify({ status: 400, message: error.message }),
				{
					status: 400,
					headers: { "Content-Type": "application/json" },
				}
			);
		}
		const bookmark = await db.loadBookmarkByUid(uid);
		return Response.json({ bookmark });
	}),

	http.delete(`${AUTH_URL}/bookmark/movie`, async ({ request }) => {
		const user = await getUser(request);
		const { id } = await request.json();
		await db.deleteMovieToBookmark(id, user.id);
		const bookmark = await db.loadBookmarkByUid(id);
		return Response.json({ bookmark });
	}),

	http.delete(`${AUTH_URL}/bookmark/tv`, async ({ request }) => {
		const user = await getUser(request);
		const { id } = await request.json();
		await db.deleteSerieToBookmark(id, user.id);
		const bookmark = await db.loadBookmarkByUid(id);
		return Response.json({ bookmark });
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
		userId = atob(token);
	} catch (e) {
		const error = new Error("token Invalid. Merci de se reconnecter.");
		error.status = 401;
		throw error;
	}
	const user = await db.loadUserById(userId);
	if (!user) {
		const error = new Error("Utilisateur non trouvé");
		error.status = 401;
		throw error;
	}
	return user;
}

export { handlers };
