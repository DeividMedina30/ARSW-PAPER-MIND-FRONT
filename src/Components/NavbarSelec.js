import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import "../Styles/Biblioteca.css";
import '../Components/ElimBiblioteca';
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var sock = new SockJS("https://papermindback.azurewebsites.net/api/bibliotecas");
var stompClient = Stomp.over(sock);
stompClient.connect({}, () => {
  
})  

const NavbarSelec = () => {
  const [biblioteca, setBiblioteca] = useState({})
  const baseURL = "https://papermindback.azurewebsites.net/api/bibliotecas";

  useEffect(() => {
    var sock = new SockJS("https://papermindback.azurewebsites.net/api/bibliotecas");
	  var stompClient = Stomp.over(sock);
	  stompClient.connect({}, () => {
		stompClient.subscribe('/topic/recargarBiblioteca',() => fetchBiblioteca());
		
	})
    const fetchBiblioteca = async() => {
      axios.get(baseURL).then(res => setBiblioteca(res.data)); 
    }
    fetchBiblioteca();
  },[])

  const underChange = (ev) => {
    console.log(ev)
  }

  function actualizarDatos(){
    if(biblioteca && biblioteca[0]){
      Swal.fire({
        title: '<h2>Elija la biblioteca que desea editar:</h2>',
        icon: 'warning',
        html:
          `${biblioteca.map((biblioteca, nombre) => (
          `<div class="formedit">
          <div class="contenedorEditForm">
            <form >
              <div class="form-group">
                <label for="exampleFormControlSelect1">Example select</label>
                <select class="form-control" id="selecBiblioteca" onChange=${e => underChange(e.target.value)}>
                    <option>${biblioteca.nombre}</option>
                  
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Título</label>
                <input class="form-control" id="exampleFormControlInput1" placeholder=${biblioteca.nombre}></input>
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Descripción biblioteca</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder=${biblioteca.descripcion}></textarea>
              </div>
            </form>
          </div>
        </div>`
        ))
        }`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Editar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put()
          .then(res=>{
            console.log("Status Obtenido:" + res.status)
            stompClient.send("/app/recargarBiblioteca",{},"")
          })
          .catch(error =>{
            if (error.response) {
              console.log(error.response);
              console.log("server responded");
              Swal.fire(
                'No se pudo eliminar la biblioteca!',
                'Clic en el boton para continuar!',
                'error'
              )
              } else if (error.request) {
              console.log("network error");
              } else {
              console.log(error);
              }
          })
          Swal.fire('Se elimino la biblioteca!', '', 'Se elimino la biblioteca: ')
        }
      })
    }
  }

  return(
    <ul class="nav nav-pills p-3 bg-white mb-3 rounded-pill align-items-center">
      <li class="nav-item">
        <a href="!#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2 active" id="all-category">
            <i class="icon-layers mr-1"></i><span class="d-none d-md-block">Mis Bibliotecas</span>
        </a>
      </li>
      <li class="nav-item">
        <a href="/addNewBiblioteca" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-business"> <i class="icon-briefcase mr-1"></i><span class="d-none d-md-block">Agregar Biblioteca</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-social" onClick={(e) => actualizarDatos(e)}><i class="icon-share-alt mr-1"></i><span class="d-none d-md-block">Editar Biblioteca</span></a>
      </li>
      <li class="nav-item">
        <a href="!#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-important"> <i class="icon-tag mr-1"></i><span class="d-none d-md-block">Eliminar Biblioteca</span></a>
      </li>
      <li class="nav-item ml-auto">
        <a href="!#" class="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-notes"> <i class="icon-note m-1"></i><span class="d-none d-md-block font-14">Añadir biblioteca</span></a>
      </li>
    </ul>
  );
}
export default NavbarSelec;