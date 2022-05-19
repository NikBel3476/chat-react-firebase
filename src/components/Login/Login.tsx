import React, {FC, useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";

type LoginProps = {
	children?: React.ReactElement[] | React.ReactNode[];
}

const Login: FC<LoginProps> = ({ children }) => {
	const auth = getAuth();

	const login = async () => {
		try {
			if (auth) {
				const provider = new GoogleAuthProvider();
				const { user } = await signInWithPopup(auth, provider);
			}
		} catch (e) {
			console.error(e);
		}
	}

	return (
			<Container>
				<Grid container
					style={{ height: window.innerHeight - 50 }}
					alignItems="center"
					justifyContent="center"
				>
					<Grid
						style={{ width: 400, background: "lightgray" }}
						container
						alignItems="center"
						direction="column"
					>
						<Box p={5}>
							<Button
								variant="outlined"
								onClick={login}
							>
								Войти с помощью Google
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Container>
	);
};

export default Login;
