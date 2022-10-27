import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './Components/App';
import Login from './indexLogin'
import Notas from './Components/Notas';
import FormBiblioteca from './Components/FormBiblioteca.js';
import FormNota from './Components/FormNota';
import FormEditBiblioteca from './Components/FormEditBiblioteca';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/Notas' element={<Notas />}>
        </Route>
        <Route path='/addNewBiblioteca' element={<FormBiblioteca />}>
        </Route>
        <Route path='/editBiblioteca' element={<FormEditBiblioteca />}>
        </Route>
        <Route path='/addNewNota' element={<FormNota />}>
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
