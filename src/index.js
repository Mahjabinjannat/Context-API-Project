import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzRYun5_UjPGNgidxwTK6ijtoStRDJSK0",
  authDomain: "context-api-project-802b1.firebaseapp.com",
  databaseURL: "https://context-api-project-802b1-default-rtdb.firebaseio.com",
  projectId: "context-api-project-802b1",
  storageBucket: "context-api-project-802b1.appspot.com",
  messagingSenderId: "407511635060",
  appId: "1:407511635060:web:049371d1559e6270ff2d21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

export default db;
