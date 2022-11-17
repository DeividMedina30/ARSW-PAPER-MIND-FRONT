import React, { useEffect, useState } from "react";
import axios from "axios";
import Biblioteca from "./Biblioteca";
import BibliotecaImp from "./BibliotecaImp";
import Navbar from "./Navbar";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import FormEditBiblioteca from "./FormEditBiblioteca";
import Swal from 'sweetalert2/dist/sweetalert2.js';

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}


const App = () => {
  //const [bibliotecas, setBibliotecas] = useState(initialBibl);
  const [biblioteca, setBiblioteca] = useState({})
  const baseURL = "https://paparmindarsw.herokuapp.com/api/bibliotecas";
  
  useEffect(() => {
    var sock = new SockJS("https://paparmindarsw.herokuapp.com/stompBiblioteca");
	  var stompClient = Stomp.over(sock);
	  stompClient.connect({}, () => {
		stompClient.subscribe('/topic/recargarBiblioteca',() => fetchBiblioteca());
		
	})
    const fetchBiblioteca = async() => {
      axios.get(baseURL).then(res => setBiblioteca(res.data));
    }
    fetchBiblioteca();
  },[])

  const [isOpen, setOpen] = useState(false);
  const openPopUp = () =>{
    setOpen(true)
  }

  return(
    <DragDropContext onDragEnd={(result) => {
      const {source, destination} = result;
      if(!destination){
        return;
      }
      if(source.index === destination.index && source.droppableId === destination.droppableId){
        return;
      }
      setBiblioteca((prevBibliotecas) => reorder(prevBibliotecas, source.index, destination.index)
      );
    }
    }>
    <div className="App">
      <Navbar />
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"/>
      <div class="page-content container note-has-grid">
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
            <button onClick={openPopUp} class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-social"> <i class="icon-share-alt mr-1"></i><span class="d-none d-md-block">Editar Biblioteca</span></button>
          </li>
          <li class="nav-item">
            <a href="!#" class="nav-link rounded-pill note-link d-flex align-items-center px-2 px-md-3 mr-0 mr-md-2" id="note-important"> <i class="icon-tag mr-1"></i><span class="d-none d-md-block">Eliminar Biblioteca</span></a>
          </li>
          <li class="nav-item ml-auto">
            <a href="!#" class="nav-link btn-primary rounded-pill d-flex align-items-center px-3" id="add-notes"> <i class="icon-note m-1"></i><span class="d-none d-md-block font-14">Añadir biblioteca</span></a>
          </li>
        </ul>
        <div class="tab-content bg-transparent">
        <Droppable droppableId="bibliotecas" direction='horizontal' >
          {(droppableProvided)=> (
            <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} id="note-full-container" class="note-has-grid row">
            {biblioteca && biblioteca[0]?
              biblioteca.map((biblioteca, index) => ( 
              <Biblioteca
              index = {index}
              Bibid = {index.toString()}
              titulo = {biblioteca.nombre}
              fecha = {biblioteca.fecha_modificacion}
              contenido= {biblioteca.descripcion}/>)) : <div>Cargando tus Bibliotecas...</div>
            }
            {droppableProvided.placeholder}
            </div>)}
          </Droppable>
        </div>
      </div>
      {isOpen && <FormEditBiblioteca titulo={biblioteca.nombre} descripcion= {biblioteca.descripcion}/>}
    </div>
    </DragDropContext>
    
  );
}

export default App;