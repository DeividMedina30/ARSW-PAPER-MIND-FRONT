import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './Components/App';
import Login from './indexLogin'
import Register from './register'
import Notas from './Components/Notas';
import FormBiblioteca from './Components/FormBiblioteca.js';
import FormNota from './Components/FormNota';
import FormEditBiblioteca from './Components/FormEditBiblioteca';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import firebaseApp from "./firebase"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <FirebaseAppProvider firebaseApp={firebaseApp}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/Register' element={<Register />}></Route>
          <Route path='/App' element={<App />}></Route>
          <Route path='/Notas' element={<Notas />} />
          <Route path='/addNewBiblioteca' element={<FormBiblioteca />} />
          <Route path='/editBiblioteca' element={<FormEditBiblioteca />} />
          <Route path='/addNewNota' element={<FormNota />} />


        </Routes>
      </Router>
    </React.StrictMode>
  </FirebaseAppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
