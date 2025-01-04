import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { getRandomId } from "../utils/helper";
import { clientApi } from "../utils/clientApi";
import { useQuery } from "react-query";
import { TYPE_TV } from "../config";
import "./Netflix.css";

const NetflixSeries = ({ logout }) => {
	const [type] = React.useState(TYPE_TV);
	const defaultMovieId = getRandomId(type);
	const { data: headerMovie } = useQuery(`${type}/${defaultMovieId}`, () =>
		clientApi(`${type}/${defaultMovieId}`)
	);

	return (
		<div>
			<NetflixAppBar logout={logout} />
			<NetflixHeader movie={headerMovie?.data} type={type} />
			<NetflixRow
				wideImage={true}
				watermark={true}
				type={TYPE_TV}
				filter="trending"
				title="Séries tendances Netflix"
			/>
			<NetflixRow
				wideImage={false}
				watermark={true}
				type={TYPE_TV}
				filter="toprated"
				title="Séries les mieux notées"
			/>

			<NetflixRow
				type={TYPE_TV}
				filter="populaire"
				title="Les séries populaires"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_TV}
				filter="genre"
				param="99"
				title="Les documentaires"
				watermark={true}
				wideImage={true}
			/>

			<NetflixRow
				type={TYPE_TV}
				filter="genre"
				param="80"
				title="Les séries criminelles"
				watermark={false}
				wideImage={false}
			/>

			<NetFlixFooter color="secondary" si />
		</div>
	);
};
export { NetflixSeries };
