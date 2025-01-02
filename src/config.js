export const API_URL = import.meta.env.VITE_API_URL;
export const AUTH_URL =
	import.meta.env.VITE_AUTH_URL || "http://localhost:3000";
export const apiKey = "4fc7b001e8a107fe1fddc6b41ed0f4af";
export const lang = "fr-fr";
export const imagePath = import.meta.env.VITE_IMAGE_URL;
export const imagePathOriginal = `${imagePath}/original`;
export const imagePath400 = `${imagePath}/w400`;
export const TYPE_TV = "tv";
export const TYPE_MOVIE = "movie";
export const localStorageTokenKey = "netflix_auth_token";
