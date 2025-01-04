import * as React from "react";
import { Link } from "react-router-dom";
import { TYPE_MOVIE, TYPE_TV, imagePath400 } from "../config";
import * as authNetflix from "../utils/authNetflixProvider";
import { clientApi, clientNetFlix } from "../utils/clientApi";
import { useQuery } from "react-query";
import { NetflixAppBar } from "./NetflixAppBar";
import { NetflixHeader } from "./NetflixHeader";

const NetflixBookmark = ({ logout }) => {
	const { data } = useQuery("bookmark", async () => {
		const token = await authNetflix.getToken();
		return clientNetFlix(`bookmark`, { token });
	});
	const id = data?.bookmark?.movies?.[0] ?? 749274;
	const { data: headerMovie } = useQuery(`${TYPE_MOVIE}/${id}`, () =>
		clientApi(`${TYPE_MOVIE}/${id}`)
	);

	return (
		<>
			<NetflixAppBar logout={logout} />
			<NetflixHeader movie={headerMovie?.data} type={TYPE_MOVIE} />

			<div className="row">
				<h2>Films favoris</h2>
				<div className="row__posters">
					{data?.bookmark.movies.map((id) => {
						return (
							<Card
								key={id}
								id={id}
								type={TYPE_MOVIE}
								watermark={true}
								wideImage={true}
							/>
						);
					})}
				</div>
			</div>

			<div className="row">
				<h2>Séries favorites</h2>
				<div className="row__posters">
					{data?.bookmark.series.map((id) => {
						return <Card key={id} id={id} type={TYPE_TV} />;
					})}
				</div>
			</div>
		</>
	);
};
const Card = ({ id, type, watermark, wideImage }) => {
	const [image, setImage] = React.useState();
	const { data } = useQuery(`${type}/${id}`, () => clientApi(`${type}/${id}`));

	React.useEffect(() => {
		const buildImagePath = (data) => {
			const image = wideImage ? data?.backdrop_path : data?.poster_path;
			return image ? `${imagePath400}${image}` : null;
		};
		setImage(buildImagePath(data?.data));
	}, [data, wideImage]);

	const watermarkClass = watermark ? "watermarked" : "";
	return (
		<Link key={id} to={`/${type}/${id}`}>
			<div className={`row__poster row__posterLarge ${watermarkClass}`}>
				{/* eslint-disable-next-line */}
				<img src={image} alt={data?.data?.name} />
			</div>
		</Link>
	);
};

export { NetflixBookmark };
