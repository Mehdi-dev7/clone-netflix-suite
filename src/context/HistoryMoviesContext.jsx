import * as React from "react";

const HistoryMovieContext = React.createContext();

const HistoryMovieProvider = (props) => {
	const [movies, setMovies] = React.useState([]);
	const [series, setSeries] = React.useState([]);


	return (
		<HistoryMovieContext.Provider
			value={{ movies, series, setMovies, setSeries }}
			{...props}
		/>
	);
};
const useNavigateMovie = () => {
	const context = React.useContext(HistoryMovieContext);
	if (!context) {
		throw new Error(
			"useNavigateMovie() s’utilise avec <HistoryMovieContext.Provider>"
		);
	}
	return context;
};

export { HistoryMovieContext, useNavigateMovie, HistoryMovieProvider };
