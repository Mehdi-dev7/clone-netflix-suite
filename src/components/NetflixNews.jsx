import React from "react";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixRow } from "./NetflixRow";
import { NetFlixFooter } from "./NetFlixFooter";
import { NetflixHeader } from "./NetflixHeader";
import { getRandomType, getRandomId } from "../utils/helper";
import { clientApi } from "../utils/clientApi";
import { useQuery } from "react-query";
import { TYPE_MOVIE, TYPE_TV } from "../config";
import "./Netflix.css";

const NetflixNews = ({ logout }) => {
	const [type] = React.useState(getRandomType());
	const defaultMovieId = getRandomId(type);
	const { data: headerMovie } = useQuery(`${type}/${defaultMovieId}`, () =>
		clientApi(`${type}/${defaultMovieId}`),
		{
			keepPreviousData: true,
		}
	);

	return (
		<div>
			<NetflixAppBar logout={logout} />
			<NetflixHeader movie={headerMovie?.data} type={type} />
			<NetflixRow
				wideImage={true}
				watermark={true}
				type={TYPE_MOVIE}
				filter="latest"
				title="A venir"
			/>
			<NetflixRow
				wideImage={false}
				watermark={true}
				type={TYPE_MOVIE}
				filter="latest"
				title="Nouveauté"
			/>

			<NetflixRow
				type={TYPE_MOVIE}
				filter="latest"
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
export { NetflixNews };
