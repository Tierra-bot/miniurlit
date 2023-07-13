import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp }  from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyBqX1SW6Gq9MJsdmINL5vAYqKlfd_HulmM",
  authDomain: "miniurlit.firebaseapp.com",
  projectId: "miniurlit",
  storageBucket: "miniurlit.appspot.com",
  messagingSenderId: "335347136859",
  appId: "1:335347136859:web:9f66c8397b8a06366cc27e",
  measurementId: "G-VFZ2Z5KNK"
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
