import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { TYPE_MOVIE, TYPE_TV } from "../config";
import { useParams, useLocation } from "react-router-dom";
import { useMovie } from "../utils/hooksMovies";
import { useNavigateMovie } from "../context/HistoryMoviesContext";
import "./Netflix.css";

const NetflixById = ({ logout }) => {
	let { tvId, movieId } = useParams();
	const location = useLocation();
	const [type, setType] = React.useState(
		location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE
	);
	const [id, setId] = React.useState(type === TYPE_TV ? tvId : movieId);
	const headerMovie = useMovie(type, id);
	const { movies, series, setMovies, setSeries } = useNavigateMovie();

	const MAX_ELEMENTS = 5;
	React.useEffect(() => {
		if (headerMovie) {
			if (type === TYPE_TV) {
				setSeries([headerMovie, ...series.slice(0, MAX_ELEMENTS - 1)]);
			} else {
				setMovies([headerMovie, ...movies.slice(0, MAX_ELEMENTS - 1)]);
			}
		}
	}, [headerMovie]);

	React.useEffect(() => {
		const type = location.pathname.includes(TYPE_TV) ? TYPE_TV : TYPE_MOVIE;
		setType(type);
		setId(type === TYPE_TV ? tvId : movieId);

		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location.pathname, movieId, tvId]);

	return (
		<div>
			<NetflixAppBar logout={logout} />
			<NetflixHeader movie={headerMovie} type={type} />
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

			<NetFlixFooter color="secondary" si />
		</div>
	);
};
export { NetflixById };
