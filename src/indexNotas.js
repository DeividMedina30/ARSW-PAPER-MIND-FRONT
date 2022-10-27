import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/indexNotas.css';
import Notas from './Components/Notas';

function IndexNotas(){
  ReactDOM.render(
    <React.StrictMode>
      <Notas />
    </React.StrictMode>,
    document.getElementById('rootNotas')
  );
}

export default IndexNotas;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
