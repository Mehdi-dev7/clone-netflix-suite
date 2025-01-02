import DeleteIcon from "@mui/icons-material/Delete";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { imagePathOriginal, TYPE_MOVIE } from "../config";
import * as authNetflix from "../utils/authNetflixProvider";
import { clientNetFlix } from "../utils/clientApi";
import { useFetchData } from "../utils/hooks";
import { HeaderSkeleton } from "./skeletons/HeaderSkeleton";

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const NetflixHeader = ({ movie, type = TYPE_MOVIE }) => {
	const { data, status, error, execute } = useFetchData();
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);
	const [callBookmark, setCallBookmark] = React.useState(false);
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

	React.useEffect(() => {
		async function getTokenExecute() {
			const token = await authNetflix.getToken();
			execute(clientNetFlix(`bookmark`, { token }));
		}
		getTokenExecute();
	}, [execute]);
	React.useEffect(() => {
		setSnackbarOpen(true);
	}, [status]);

	const isInList = data?.bookmark[
		type === TYPE_MOVIE ? "movies" : "series"
	]?.includes(movie?.id);
	console.log("isInList", isInList);

	const handleAddToListClick = async () => {
		const token = await authNetflix.getToken();
		setCallBookmark(true);
		execute(
			clientNetFlix(`bookmark/${type}`, {
				token,
				data: { id: movie.id },
				method: "POST",
			})
		);
	};
	const handleDeleteToListClick = async () => {
		const token = await authNetflix.getToken();
		setCallBookmark(true);
		execute(
			clientNetFlix(`bookmark/${type}`, {
				token,
				data: { id: movie.id },
				method: "DELETE",
			})
		);
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
			{callBookmark && status === "done" ? (
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
			{callBookmark && status === "error" ? (
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={() => setSnackbarOpen(false)}
				>
					<Alert severity="error" sx={{ width: "100%" }}>
						{`Problème lors de l'ajout : ${error.message}`}
					</Alert>
				</Snackbar>
			) : null}
		</header>
	);
};

export { NetflixHeader };
