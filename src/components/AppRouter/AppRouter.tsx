import React, {useContext} from 'react';
import { Route, Routes, Navigate} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../../routes";
import {CHAT_ROUTE, LOGIN_ROUTE} from "../../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {getAuth} from "firebase/auth";

const AppRouter = () => {
	const auth = getAuth();
	const [user] = useAuthState(auth);

	return user ?
		(
			<Routes>
				{privateRoutes.map(({ path, Component}) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				<Route path="/*" element={<Navigate to={CHAT_ROUTE} />} />
			</Routes>
		)
		:
		(
			<Routes>
				{publicRoutes.map(({ path, Component }) =>
					<Route key={path} path={path} element={<Component />} />
				)}
				<Route path="/*" element={<Navigate to={LOGIN_ROUTE} />} />
			</Routes>
		);
};

export default AppRouter;
