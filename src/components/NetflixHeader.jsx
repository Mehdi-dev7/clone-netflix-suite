import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { imagePathOriginal, TYPE_MOVIE } from "../config";
import { HeaderSkeleton } from "./skeletons/HeaderSkeleton";
import { useAddBookmark, useBookmark, useDeleteBookmark } from "../utils/hooksMovies";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const NetflixHeader = ({ movie, type = TYPE_MOVIE }) => {
	
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [mutateBookmarkError, setMutateBookmarkError] = React.useState();
	const title = type === TYPE_MOVIE ? movie?.title : movie?.name;
	const imageUrl = `${imagePathOriginal}${movie?.backdrop_path}`;
	const banner = {
		backgroundImage: `url('${imageUrl}')`,
		backgroundSize: "cover",
		backgroundPosition: "center center",
		color: "white",
		objectFit: "contain",
		height: "448px",
	};

	const data = useBookmark()

	const addMutation = useAddBookmark({
		onSuccess: () => {
			setSnackbarOpen(true);
			setMutateBookmarkError();
		},
		onError: (error) => {
			setSnackbarOpen(true);
			setMutateBookmarkError(error);
		},
	})
	const deleteMutation = useDeleteBookmark({
		onSuccess: () => {
			setSnackbarOpen(true);
			setMutateBookmarkError();
		},
		onError: (error) => {
			setSnackbarOpen(true);
			setMutateBookmarkError(error);
		},
	})

	const isInList = data?.bookmark[
		type === TYPE_MOVIE ? "movies" : "series"
	]?.includes(movie?.id);

	const handleAddToListClick = () => {
		addMutation.mutate({
			type,
			id: movie.id,
		});
	};

	const handleDeleteToListClick = () => {
		deleteMutation.mutate({
			type,
			id: movie.id,
		});
	};

	if (!movie) {
		return <HeaderSkeleton></HeaderSkeleton>;
	}
	return (
		<header style={banner}>
			<div className="banner__contents">
				<h1 className="banner__title">{title ?? "..."}</h1>
				<div className="banner__buttons">
					<button className="banner__button banner__buttonplay">Lecture</button>
					{isInList ? (
						<button
							className="banner__button banner__buttonInfo"
							onClick={handleDeleteToListClick}
						>
							<DeleteIcon
								color="secondary"
								style={{
									marginRight: "5px",
									display: "inline-flex",
									alignItems: "center",
									verticalAlign: "middle",
									transform: "translateY(-2px)",
								}}
								fontSize="small"
							/>
							Supprimer de ma liste
						</button>
					) : (
						<button
							className="banner__button banner__buttonInfo"
							onClick={handleAddToListClick}
						>
							Ajouter à ma liste
						</button>
					)}
				</div>
				<h1 className="synopsis">{movie?.overview ?? "..."}</h1>
			</div>
			<div className="banner--fadeBottom"></div>
			{!mutateBookmarkError ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={() => setSnackbarOpen(false)}
				>
					<Alert severity="success" sx={{ width: "100%" }}>
						Liste modifiée avec succès
					</Alert>
				</Snackbar>
			) : null}
			{mutateBookmarkError ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={() => setSnackbarOpen(false)}
				>
					<Alert severity="error" sx={{ width: "100%" }}>
						Problème lors de l'ajout : {mutateBookmarkError.message}
					</Alert>
				</Snackbar>
			) : null}
		</header>
	);
};

export { NetflixHeader };
