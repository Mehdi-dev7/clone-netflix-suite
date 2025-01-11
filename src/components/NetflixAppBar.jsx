import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { MenuHistory } from "./MenuHistory";

// ci-dessous, il sont pris des exemple de composant de recherche de Mui
//📑 https://mui.com/components/app-bar/#main-content

const Search = styled("div")(({ theme }) => ({
	marginRight: "10px",
	marginLeft: "auto",
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		/*marginLeft: theme.spacing(1),*/
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("sm")]: {
			width: "12ch",
			"&:focus": {
				width: "20ch",
			},
		},
	},
}));

const NetflixAppBar = () => {
	const { logout } = useAuth();
	const navigate = useNavigate();
	const [query, setQuery] = React.useState("");
	const [appBarStyle, setAppBarStyle] = React.useState({
		background: "transparent",
		boxShadow: "none",
	});
	const [navOpen, setNavOpen] = useState(false);

	React.useEffect(() => {
		const onScroll = (e) => {
			if (e.target.documentElement.scrollTop >= 100) {
				setAppBarStyle({
					background: "#111",
					transition: "background .5s ease-out",
					boxShadow: "none",
				});
			} else {
				setAppBarStyle({
					background: "transparent",
					transition: "background .5s ease-out",
					boxShadow: "none",
				});
			}
		};
		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	const margin10 = { margin: 10, marginLeft: 15 };
	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			navigate(`/search/${query}`);
		}
	};

	// Fonction pour fermer le menu
	const closeMenu = () => {
		setNavOpen(false);
	};

	// Écouteur d'événements pour fermer le menu en cliquant en dehors
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (navOpen && !event.target.closest(".nav__links")) {
				closeMenu();
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [navOpen]);

	return (
		<AppBar style={appBarStyle}>
			<Toolbar>
				<img className="nav__logo" src="/images/netflix-logo.png" alt="" />
				<Link to="/">
					<Typography style={margin10} variant="h6">
						Accueil
					</Typography>
				</Link>
				<button className="nav__toggle" onClick={() => setNavOpen(!navOpen)}>
					Catégories
				</button>
				<div className={`nav__links ${navOpen ? "open" : ""}`}>
					<CloseIcon className="close-icon" onClick={closeMenu} />
					<Link to="/series">
						<Typography className="categories">
							Séries
						</Typography>
					</Link>
					<Link to="/movies">
						<Typography className="categories">
							Films
						</Typography>
					</Link>
					<Link to="/news">
						<Typography className="categories">
							Nouveautés les plus regardées
						</Typography>
					</Link>
					<Link to="/list">
						<Typography className="categories">
							Ma liste
						</Typography>
					</Link>
				</div>
				{/* 🐶 Utilise le composant de recherche */}
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						onKeyDown={handleKeyPress}
						onChange={(e) => setQuery(e.target.value)}
						value={query}
						placeholder="Rechercher"
						inputProps={{ "aria-label": "search" }}
					/>
				</Search>
				<MenuHistory style={{ cursor: "pointer", marginLeft: "10px" }} />
				<img
					style={{ marginLeft: "auto", cursor: "pointer" }}
					className="nav__avatar"
					src="/images/netflix-avatar.png"
					alt=""
					onClick={logout}
				/>
			</Toolbar>
		</AppBar>
	);
};

export { NetflixAppBar };
