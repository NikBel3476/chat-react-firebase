import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import './index.css';

const firebase = initializeApp({
  apiKey: "AIzaSyB2dQoGuBJt9tq0GghoYPBEkyoCoEqgoak",
  authDomain: "chat-react-6a983.firebaseapp.com",
  projectId: "chat-react-6a983",
  storageBucket: "chat-react-6a983.appspot.com",
  messagingSenderId: "609453334863",
  appId: "1:609453334863:web:5287772b2670b924bea53a",
  measurementId: "G-LZ2B4GF0KK"
});
// const analytics = getAnalytics(app);
const auth = getAuth(firebase);
const firestore = getFirestore(firebase);

const contextValue = {
  firebase,
  auth,
  firestore
};

export const Context = createContext<Partial<typeof contextValue>>({});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Context.Provider
      value={contextValue}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
