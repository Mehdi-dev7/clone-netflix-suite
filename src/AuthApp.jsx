import { NetflixApp } from "./components/NetflixApp";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./components/ErrorFallback";
import Error404 from "./components/Error404";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NetflixById } from "./components/NetflixById";
import { NetflixMovies } from "./components/NetflixMovies";
import { NetflixSeries } from "./components/NetflixSeries";
import { NetflixNews } from "./components/NetflixNews";
import { NetflixBookmark } from "./components/NetflixBookmark";
import { NetflixSearch } from "./components/NetflixSearch";

function AuthApp({ logout }) {
	return (
		<Router>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Routes>
					<Route path="/" element={<NetflixApp logout={logout} />} />
					<Route path="/tv/:tvId" element={<NetflixById logout={logout} />} />
					<Route
						path="/movie/:movieId"
						element={<NetflixById logout={logout} />}
					/>
					<Route path="/movies" element={<NetflixMovies logout={logout} />} />
					<Route path="/series" element={<NetflixSeries logout={logout} />} />
					<Route path="/news" element={<NetflixNews logout={logout} />} />
					<Route path="/list" element={<NetflixBookmark logout={logout} />} />
					<Route path="/search/:query" element={<NetflixSearch logout={logout} />} />
					<Route path="*" element={<Error404 />} />
				</Routes>
			</ErrorBoundary>
		</Router>
	);
}

export { AuthApp };
