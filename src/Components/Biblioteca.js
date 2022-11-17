import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Biblioteca.css";
import '../Components/ElimBiblioteca';
import Swal from 'sweetalert2';
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var sock = new SockJS("https://paparmindarsw.herokuapp.com/stompBiblioteca");
var stompClient = Stomp.over(sock);
stompClient.connect({}, () => {
  
})  
function Biblioteca(props){

  function enviarDatos(){
    var titulo = document.getElementById(`${props.titulo}`).textContent;
    const urlDelete = `https://paparmindarsw.herokuapp.com/api/bibliotecas/${titulo}`;
    Swal.fire({
      title: 'Seguro que deseas borrar la Biblioteca?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(urlDelete)
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
        Swal.fire('Se elimino la biblioteca!', '', 'Se elimino la biblioteca: ' + titulo)
      }
    })
  }
  return(
    <Draggable draggableId={props.Bibid} index={props.index}>
      {(draggableProvided)=> (
      <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} class="col-md-4 single-note-item all-category note-social">
        <div class="card card-body">
          <span class="side-stick"></span>
          <h5 class="note-title text-truncate w-75 mb-0" id= {props.titulo} className="titulo-biblioteca" data-noteheading="Meeting with Mr.Jojo">{props.titulo} <i class="point fa fa-circle ml-1 font-10"></i></h5>
          <p class="note-date font-12 text-muted" className="fecha-bibliotteca">{props.fecha}</p>
          <div class="note-content">
            <p class="note-inner-content text-muted" id = "idDescripcionBiblioteca" className="contenido-biblioteca" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{props.contenido}</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
            <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
            <div class="ml-auto">
              <div class="category-selector btn-group">
                <a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="!#" role="button" aria-haspopup="true" aria-expanded="true">
                  <div class="category">
                    <div class="category-business"></div>
                    <div class="category-social"></div>
                    <div class="category-important"></div>
                    <span class="more-options text-dark"><i class="icon-options-vertical"></i></span>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right category-menu">
                  <Link class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" to="/Notas">
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Abrir
                  </Link>
                  <a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="/editBiblioteca">
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Editar
                  </a>
                  <a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" onClick={(e) => enviarDatos(e)}>
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Eliminar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </Draggable>
  );
  /*<div class="col-md-4 single-note-item all-category note-social">
        <div class="card card-body">
          <span class="side-stick"></span>
          <h5 class="note-title text-truncate w-75 mb-0" className="titulo-biblioteca" data-noteheading="Meeting with Mr.Jojo">{props.titulo} <i class="point fa fa-circle ml-1 font-10"></i></h5>
          <p class="note-date font-12 text-muted" className="fecha-bibliotteca">{props.fecha}</p>
          <div class="note-content">
            <p class="note-inner-content text-muted" className="contenido-biblioteca" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{props.contenido}</p>
          </div>
          <div class="d-flex align-items-center">
            <span class="mr-1"><i class="fa fa-star favourite-note"></i></span>
            <span class="mr-1"><i class="fa fa-trash remove-note"></i></span>
            <div class="ml-auto">
              <div class="category-selector btn-group">
                <a class="nav-link dropdown-toggle category-dropdown label-group p-0" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="true">
                  <div class="category">
                    <div class="category-business"></div>
                    <div class="category-social"></div>
                    <div class="category-important"></div>
                    <span class="more-options text-dark"><i class="icon-options-vertical"></i></span>
                  </div>
                </a>
                <div class="dropdown-menu dropdown-menu-right category-menu">
                  <Link class="note-business badge-group-item badge-business dropdown-item position-relative category-business text-success" to="/Notas">
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i>Abrir
                  </Link>
                  <a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" href="javascript:void(0);">
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Editar
                  </a>
                  <a class="note-important badge-group-item badge-important dropdown-item position-relative category-important text-danger" href="javascript:void(0);">
                    <i class="mdi mdi-checkbox-blank-circle-outline mr-1"></i> Eliminar
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>*/
}
export default Biblioteca;