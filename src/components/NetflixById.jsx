import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
// 🐶 supprime 'getRandomType' et 'getRandomId' car nous n'utiliseront plus de films aléatoires
import { getRandomType, getRandomId } from "../utils/helper";
import { clientApi } from "../utils/clientApi";
import { makeStyles } from "@mui/styles";
import { Alert, AlertTitle } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useFetchData } from "../utils/hooks";
import { TYPE_MOVIE, TYPE_TV } from "../config";
import "./Netflix.css";
import { useParams, useLocation } from "react-router-dom";

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

const NetflixById = () => {
	const classes = useStyles();
	const { data: headerMovie, error, status, execute } = useFetchData();
	let { tvId, movieId } = useParams();
	const location = useLocation();

	const [type, setType] = React.useState(
		location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
	);
	const [id, setId] = React.useState(type === TYPE_TV ? tvId : movieId);

	React.useEffect(() => {
		execute(clientApi(`${type}/${id}`));
	}, [execute, type, id]);

	React.useEffect(() => {
		const type = location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE;
		setType(type);
		setId(type === TYPE_TV ? tvId : movieId);
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location.pathname, movieId, tvId]);

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
				type={TYPE_TV}
				filter="trending"
				title="Série Netflix"
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="toprated"
				title="Les mieux notés"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_TV}
				filter="genre"
				param="10759"
				title="Action & aventure"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="genre"
				param="53"
				title="Les meilleurs Thriller"
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
export { NetflixById };
