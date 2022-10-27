import React from "react";
import { Link } from 'react-router-dom';

function NavbarN(){
    return(
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" class="navbar-brand">Paper Mind</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="/Notas">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Notas
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <Link class="dropdown-item" to="/addNewNota">Agregar Nota</Link>
                <a class="dropdown-item" href="#">Editar Nota</a>
                <a class="dropdown-item" href="#">Ver Notas compartidas</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Eliminar Nota</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Contribuidores
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Agregar contribuidor a Nota</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Eliminar contribuidor de Nota</a>
              </div>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Contactos
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="https://www.youtube.com/c/freeCodeCampEspa%C3%B1ol">Ingeniero y desarrollador Cristian papito Ruiz</a>
                <a class="dropdown-item" href="#">Ingeniero y desarrollador Sebastian Medina</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Ingeniero y desarrollador Juan Molina</a>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2" type="search" placeholder="Ingrese Nota" aria-label="Search"/>
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
          </form>
        </div>
    </nav>
    );
}

export default NavbarN;