import axios from "axios";
import React from "react";
import '../Styles/ElimBiblioteca.css';

function ElimBiblioteca(props){
  const baseURL = "https://paparmindarsw.herokuapp.com/api/bibliotecas";
  const elim= window.confirm("Desea borrar la biblioteca?");
  if (elim){
    window.alert("Se eliminó la biblioteca!");
  }else{
    window.alert("Seas mamón");
  }
  /*function deleteBib(e){
    axios.delete(baseURL,
    {
      id_biblioteca
    })

  }*/
  /*return({
    <div class="divDialog">
      <dialog id="idialog" open="true" class="dialogo">
        <h3>¿Seguro que desea borrar la biblioteca seleccionada?</h3>
        <div class="botones">
          <a class="btn btn-lg btn-outline-success btn-block" onClick={(e) => deleteBib(e)}>Eliminar</a>
          <a class="btn btn-lg btn-outline-danger btn-block" href="/" >Cancelar</a>
        </div>
      </dialog>
    </div>
});*/
}

export default ElimBiblioteca;