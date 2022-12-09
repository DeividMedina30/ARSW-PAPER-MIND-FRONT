import { Draggable } from "@hello-pangea/dnd";
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Biblioteca.css";
import '../Components/ElimBiblioteca';
import Swal from 'sweetalert2';
import axios from "axios";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

var sock = new SockJS("https://back-paper.azurewebsites.net/api/bibliotecas");
var stompClient = Stomp.over(sock);
stompClient.connect({}, () => {
  
})  
function Biblioteca(props){

  function enviarDatos(){
    var titulo = document.getElementById(`${props.titulo}`).textContent;
    const urlDelete = `https://back-paper.azurewebsites.net/api/bibliotecas/${titulo}`;
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

  function actualizarDatos(){
    var titulo = document.getElementById(`${props.titulo}`).textContent;
    var descripcion = document.getElementById(`${props.contenido}`).textContent;
    const urlPut = `https://back-paper.azurewebsites.net/api/bibliotecas/${titulo}`;

    Swal.fire({
      title: '<h2>Elija la biblioteca que desea editar:</h2>',
      icon: 'warning',
      html:
        `<div class="containerForm">
				<h1>Ingrese los datos de la Biblioteca:</h1><br/>
				<form class="was-validated">
					<div class="form-group">
						<label for="title-biblioteca">Título Biblioteca</label>
						<input name="nombre" type="text" class="form-control" id="nombreEidtar" value=${titulo} required />
						<div class="invalid-feedback">El título no puede ser vacío</div>
					</div>
					<div class="mb-3">
						<label  for="validationTextarea">Descripción</label>
						<textarea name="descripcion" class="form-control is-invalid" id="descripcionEditar" required>${descripcion}</textarea>
					</div>
				</form>
			</div>`,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Editar',
      confirmButtonAriaLabel: 'Dale en editar!',
      cancelButtonText:
        '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        var nombre = document.getElementById("nombreEidtar").textContent;
        var desc = document.getElementById("descripcionEditar").textContent;
        let date = new Date;
        console.log(nombre,desc,date);
        /*axios.put(urlPut, {
          "nombre": nombre,
          "fecha_modification": date,
          "description": desc
      
      })
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
        })*/
        Swal.fire('Se editó la biblioteca!', '', 'Se editó la biblioteca: ')
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
            <p class="note-inner-content text-muted" id = {props.contenido} className="contenido-biblioteca" data-notecontent="Blandit tempus porttitor aasfs. Integer posuere erat a ante venenatis.">{props.contenido}</p>
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
                  <a class="note-social badge-group-item badge-social dropdown-item position-relative category-social text-info" onClick={(e) => actualizarDatos(e)}>
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