import React, { useEffect, useState } from "react";
import axios from "axios";
import Biblioteca from "./Biblioteca";
import Navbar from "./Navbar";
import NavbarSelec from "./NavbarSelec";
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { BibliotecaService } from "../service/BibliotecaService";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}


const App = () => {
  //const [bibliotecas, setBibliotecas] = useState(initialBibl);
  const [biblioteca, setBiblioteca] = useState({})
  const baseURL = "https://papermindback.azurewebsites.net/";
  
  useEffect(() => {
    var sock = new SockJS("baseURL/stompBiblioteca");
	  var stompClient = Stomp.over(sock);
	  stompClient.connect({}, () => {
		stompClient.subscribe('/topic/recargarBiblioteca',() => fetchBiblioteca());
		
	})
    const fetchBiblioteca = async() => {
      axios.get(baseURL).then(res => setBiblioteca(res.data));
    }
    fetchBiblioteca();
  },[])

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
        <NavbarSelec/>
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
    </div>
    </DragDropContext>
    
  );
}

export default App;