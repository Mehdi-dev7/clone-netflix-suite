import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import React from "react";

const FormContainer = styled("form")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	minWidth: "330px",
	"& > *": {
		margin: theme.spacing(1),
	},
}));

const StyledDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialog-paper": {
		opacity: "0.9",
	},
}));

const FormLogin = ({ create = false, login, register, logout }) => {
	const [checked, setChecked] = React.useState(false);
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const label = create ? "Inscrivez vous" : "Connexion";

	return (
		<FormContainer noValidate autoComplete="off">
			<TextField
				id="filled-basic"
				label="Email ou numéro de téléphone"
				variant="filled"
				color="secondary"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				style={{ opacity: "1" }}
			/>
			<TextField
				id="filled-basic"
				type="password"
				label="Mot de passe"
				variant="filled"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			{create ? (
				<>
					<Button
						style={{ margin: "20px 0 5px 0" }}
						variant="contained"
						color="secondary"
						onClick={() => register({ username, password })}
					>
						{label}
					</Button>
					<small>* Consultez nos CGV</small>
					<small>This page is protected by Google reCAPTCHA</small>
				</>
			) : (
				<>
					<Button
						style={{ margin: "20px 0 5px 0" }}
						variant="contained"
						color="secondary"
						onClick={() => login({ username, password })}
					>
						{label}
					</Button>
					<div>
						{" "}
						<FormGroup row>
							<FormControlLabel
								control={
									<Checkbox
										name="checkedA"
										checked={checked}
										onChange={() => setChecked(!checked)}
										color="primary"
									/>
								}
								label={
									<Typography component={"span"} style={{ fontSize: "0.8rem" }}>
										Se souvenir de moi
									</Typography>
								}
							/>
						</FormGroup>
					</div>
				</>
			)}
		</FormContainer>
	);
};

FormLogin.propTypes = {
	create: PropTypes.bool,
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	logout: PropTypes.func,
};

function PopupLogin({
	open,
	handleClose,
	signup = false,
	login,
	register,
	logout,
	error,
	status,
}) {
	const [create, setCreate] = React.useState(signup);
	const handleSignUp = () => {
		setCreate(true);
	};
	const handleSignIn = () => {
		setCreate(false);
	};
	const label = create ? "Inscrivez vous" : "Connexion";
	const spinner =
		status === "fetching " ? <CircularProgress color="secondary" /> : <></>;

	return (
		<StyledDialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			style={{ backgroundColor: "transparent" }}
		>
			<DialogTitle id="alert-dialog-title">{label}</DialogTitle>
			<DialogContent>
				<FormLogin
					create={create}
					login={login}
					register={register}
					logout={logout}
				/>
				{error ? (
					<Alert severity="error">Erreur : {error.message}</Alert>
				) : null}
			</DialogContent>
			<DialogActions style={{ justifyContent: "flex-start" }}>
				{!create ? (
					<Button onClick={handleSignUp} color="secondary">
						Nouveau sur Netflix ? {spinner}
					</Button>
				) : (
					<Button onClick={handleSignIn} color="secondary" autoFocus>
						Vous posséder déjà un compte ? {spinner}
					</Button>
				)}
			</DialogActions>
		</StyledDialog>
	);
}

PopupLogin.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
	signup: PropTypes.bool,
	login: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	logout: PropTypes.func,
	error: PropTypes.shape({
		message: PropTypes.string,
	}),
	status: PropTypes.string,
};

export default PopupLogin;
