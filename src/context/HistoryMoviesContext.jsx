import * as React from "react";
import { TYPE_TV } from "../config";

const HistoryMovieContext = React.createContext();
const MAX_ELEMENTS = 3;

const reducer = (state, action) => {
	switch (action.type) {
		case "addMovie":
			return {
				...state,
				movies: [action.payload, ...state.movies.slice(0, MAX_ELEMENTS - 1)],
			};
		case "addSerie":
			return {
				...state,
				series: [action.payload, ...state.series.slice(0, MAX_ELEMENTS - 1)],
			};
      case "clear":
        return {
          movies: [],
          series: [],
        
      }
		default:
			throw new Error("Action non supporté");
	}
};
const HistoryMovieProvider = (props) => {
	const [state, dispatch] = React.useReducer(reducer, {
		movies: [],
		series: [],
	});
	
  const addMovie = React.useCallback(movie => {
    dispatch({
      type: 'addMovie',
      payload: movie,
    })
  }, [])
  const addSerie = React.useCallback(serie => {
    dispatch({
      type: 'addSerie',
      payload: serie,
    })
  }, [])
  const clearHistory = React.useCallback(() => {
    dispatch({
      type: 'clear',
    })
  })

  const { movies, series } = state;
  const value = {movies, series, addMovie, addSerie, clearHistory};

	return (
		<HistoryMovieContext.Provider
			value={value}
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

const useAddHistory = (movie, type = TYPE_TV) => {
  const { addMovie, addSerie } = useNavigateMovie();

  React.useEffect(() => {
    if (movie) {
      if (type === TYPE_TV) {
        addSerie(movie);
      } else {
        addMovie(movie);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movie]);
};

const useClearHistory = () => {
  const {clearHistory} = useNavigateMovie()
  return clearHistory
}

export { HistoryMovieContext, useNavigateMovie, HistoryMovieProvider, useAddHistory, useClearHistory };
