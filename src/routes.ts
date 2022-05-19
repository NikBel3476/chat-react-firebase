import React from 'react';
import {CHAT_ROUTE, LOGIN_ROUTE} from "./utils/consts";
import Login from "./components/Login";
import Chat from "./components/Chat/Chat";

export const publicRoutes: { path: string, Component: React.FC}[] = [
	{
		path: LOGIN_ROUTE,
		Component: Login
	}
];

export const privateRoutes: { path: string, Component: React.FC}[] = [
	{
		path: CHAT_ROUTE,
		Component: Chat
	}
];
