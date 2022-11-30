import React from "react";
import '../Styles/ButtonDrop.css';

function ButtonDrop(){
  return(
    <div class="btn-group open">
      <a class="btn btn-success" href="/Notas"><i class="fa fa-cog fa-spin fa-1x fa-fw" aria-hidden="true"></i> Abrir</a>
      <a class="btn btn-success dropdown-toggle" data-toggle="dropdown" href="#"></a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="/editBiblioteca"><i class="fa fa-pencil fa-fw"></i>  Editar</a></li>
        <li><a class="dropdown-item" href="#"><i class="fa fa-trash-o fa-fw"></i>  Eliminar</a></li>
        <li class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#"><i class="fa fa-unlock"></i>  Añadir contribuidor</a></li>
      </ul>
  </div>
  );
}

export default ButtonDrop;