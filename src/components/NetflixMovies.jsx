import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { getRandomId } from "../utils/helper";
import { clientApi } from "../utils/clientApi";
import { makeStyles } from "@mui/styles";
import { Alert, AlertTitle } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchData } from "../utils/hooks";
import { TYPE_MOVIE } from "../config";
import "./Netflix.css";

const useStyles = makeStyles((theme) => ({
	alert: {
		width: "50%",
		margin: "auto",
		marginBotton: "50px",
	},
	progress: {
		marginLeft: "30px",
	},
}));

const NetflixMovies = () => {
	const classes = useStyles();
	const { data: headerMovie, error, status, execute } = useFetchData();
	const [type] = React.useState(TYPE_MOVIE);
	const defaultMovieId = getRandomId(type);

	React.useEffect(() => {
		execute(clientApi(`${type}/${defaultMovieId}`));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [execute, type]);

	if (status === "error") {
		// sera catché par ErrorBoundary
		throw new Error(error.message);
	}
	return (
		<div>
			<NetflixAppBar />
			<NetflixHeader movie={headerMovie?.data} type={type} />
			<NetflixRow
				wideImage={true}
				watermark={true}
				type={TYPE_MOVIE}
				filter="trending"
				title="Films Netflix"
			/>
			<NetflixRow
				wideImage={false}
				watermark={true}
				type={TYPE_MOVIE}
				filter="toprated"
				title="Les mieux notés"
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="populaire"
				title="Les films pouplaires"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="genre"
				param="14"
				title="Films Fantastiques"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="genre"
				param="878"
				title="Les films de science fiction"
				watermark={false}
				wideImage={false}
			/>

			{status === "error" ? (
				<div className={classes.alert}>
					<Alert severity="error">
						<AlertTitle>Une erreur est survenue</AlertTitle>
						Detail : {error.message}
					</Alert>
				</div>
			) : null}

			{status === "fetching" ? (
				<div className={classes.progress}>
					<CircularProgress />{" "}
				</div>
			) : null}
			<NetFlixFooter color="secondary" si />
		</div>
	);
};
export { NetflixMovies };
