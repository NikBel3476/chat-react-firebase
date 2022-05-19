import React, {FC} from 'react';
import {BrowserRouter} from "react-router-dom";
import Navbar from "../Navbar";
import AppRouter from "../AppRouter";
import {getAuth} from "firebase/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import Loader from "../Lodaer";


const App: FC = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <h3>Ошибка авторизации</h3>
  }

  return (
    <BrowserRouter>
      <Navbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
