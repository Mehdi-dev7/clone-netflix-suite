import * as React from "react";
import Skeleton from "@mui/material/Skeleton";

const RowSkeleton = ({ nbElement = 20, title = "Films", wideImage = true }) => {
	const postersSkeletons = [];
	for (let i = 0; i < nbElement; i++) {
		postersSkeletons.push(
			<div key={i} className={`row__poster row__posterLarge`}>
				<Skeleton
					sx={{ bgcolor: "grey.800" }}
					variant="rect"
					width={wideImage ? 400 : 166}
					height={wideImage ? 225 : 250}
				/>
			</div>
		);
	}
	return (
		<div className="row">
			<h2>{title}</h2>
			<div className="row__posters">{postersSkeletons}</div>
		</div>
	);
};
export { RowSkeleton };
