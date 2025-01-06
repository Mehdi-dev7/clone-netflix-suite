import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { getRandomId } from "../utils/helper";
import { TYPE_MOVIE } from "../config";
import { useMovie } from "../utils/hooksMovies";
import "./Netflix.css";

const NetflixMovies = ({ logout }) => {
	const [type] = React.useState(TYPE_MOVIE);
	const defaultMovieId = getRandomId(type);
	const headerMovie = useMovie(type, defaultMovieId);


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

			<NetFlixFooter color="secondary" si />
		</div>
	);
};
export { NetflixMovies };
