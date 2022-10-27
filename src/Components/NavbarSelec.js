import React from "react";

function NavbarSelec(){
  return(
    <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
      <li class="nav-item">
        <a href="#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active" id="all-category">
            <i class="icon-layers mr-1"></i><span class="d-none d-md-block">Mis Bibliotecas</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-business"> <i class="icon-briefcase mr-1"></i><span class="d-none d-md-block">Eliminar biblioteca</span></a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-social"> <i class="icon-share-alt mr-1"></i><span class="d-none d-md-block">Agregar contribuidor</span></a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-important"> <i class="icon-tag mr-1"></i><span class="d-none d-md-block">Eliminar contribuidor</span></a>
      </li>
      <li class="nav-item ml-auto">
        <a href="#" class="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-notes"> <i class="icon-note m-1"></i><span class="d-none d-md-block font-14">Añadir biblioteca</span></a>
      </li>
    </ul>
  );
}
export default NavbarSelec;