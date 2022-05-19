import React, {FC} from 'react';
import {AppBar, Button, Grid, Toolbar,} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";

type NavbarProps = {
	children?: React.ReactElement[] | React.ReactNode[];
}

const Navbar: FC<NavbarProps> = ({children}) => {
	const auth = getAuth();
	const [user] = useAuthState(auth);

	return (
		<AppBar color="secondary" position="static">
			<Toolbar variant="dense">
				<Grid container justifyContent="flex-end">
					{user ?
						<Button
							variant="outlined"
							onClick={() => auth.signOut()}
						>
							Выйти
						</Button>
						:
						<NavLink to={LOGIN_ROUTE}>
							<Button variant="outlined">Логин</Button>
						</NavLink>
					}
				</Grid>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
