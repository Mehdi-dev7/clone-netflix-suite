import { useQuery, useMutation, useQueryClient } from "react-query";
import { clientApi, clientNetFlix } from "./clientApi";
import * as authNetflix from "./authNetflixProvider";

const useSearchMovie = (query) => {
	const { data } = useQuery(`search/multi?query=${query}`, () =>
		clientApi(`search/multi?query=${query}`)
	);
	return data?.data?.results ?? [];
};

const useMovie = (type, id) => {
	const { data } = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`));
	return data?.data; /*?? loadingMovie*/
};

const useMovieFilter = (type, filter, param) => {
	const endpointLatest = `${type}/upcoming`;
	const endpointPopular = `${type}/popular`;
	const endpointTopRated = `${type}/top_rated`;
	const endpointGenre = `discover/${type}?with_genres=${param}`;
	const endpointTrending = `trending/${type}/day`;

	let endpoint;
	switch (filter) {
		case "populaire":
			endpoint = endpointPopular;
			break;
		case "latest":
			endpoint = endpointLatest;
			break;
		case "toprated":
			endpoint = endpointTopRated;
			break;
		case "genre":
			endpoint = endpointGenre;
			break;
		case "trending":
			endpoint = endpointTrending;
			break;
		default:
			throw new Error("Type non supporté");
	}

	const { data } = useQuery(`${endpoint}`, () => clientApi(`${endpoint}`));
	return data?.data?.results ?? [];
};

const useBookmark = () => {
	const { data } = useQuery(`bookmark`, async () => {
		const token = await authNetflix.getToken();
		return clientNetFlix(`bookmark`, { token });
	});
	return data; /*?? loadingMovie*/
};

const useAddBookmark = ({
	onSuccess = () => {},
	onError = () => {},
	onSettled = () => {},
	onMutate = () => {},
}) => {
	const queryClient = useQueryClient();
	const addMutation = useMutation(
		async ({ type, id }) => {
			const token = await authNetflix.getToken();
			return clientNetFlix(`bookmark/${type}`, {
				token,
				data: { id },
				method: "POST",
			});
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries("bookmark");
				onSuccess(data);
			},
			onError: (error) => {
				onError(error);
			},
			onSettled: (data) => {
				onSettled(data);
			},
			onMutate: (data) => {
				onMutate(data);
			},
		}
	);
	return addMutation;
};

const useDeleteBookmark = ({
	onSuccess = () => {},
	onError = () => {},
	onSettled = () => {},
	onMutate = () => {},
}) => {
	const queryClient = useQueryClient();

	const deleteMutation = useMutation(
		async ({ type, id }) => {
			const token = await authNetflix.getToken();
			return clientNetFlix(`bookmark/${type}`, {
				token,
				data: { id },
				method: "DELETE",
			});
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries("bookmark");
				onSuccess(data);
			},
			onError: (error) => {
				onError(error);
			},
			onSettled: (data) => {
				onSettled(data);
			},
			onMutate: (data) => {
				onMutate(data);
			},
		}
	);
	return deleteMutation;
};

export {
	useMovie,
	useMovieFilter,
	useBookmark,
	useAddBookmark,
	useDeleteBookmark,
  useSearchMovie,
};
