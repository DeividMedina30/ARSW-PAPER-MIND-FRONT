import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const FormEditBiblioteca = () => {
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
  return(
		<div class="formedit" >
			<Navbar/>
			<div class="contenedorEditForm">
      <form>
        <div class="form-group">
          <label for="exampleFormControlSelect1">Example select</label>
          <select class="form-control" id="exampleFormControlSelect1">
            {biblioteca && biblioteca[0]?
              biblioteca.map((biblioteca, nombre) => (
                <option value={biblioteca.nombre}>{biblioteca.nombre}</option>
              /*<Biblioteca 
              index = {index}
              Bibid = {index.toString()}
              titulo = {biblioteca.nombre}
              fecha = {biblioteca.fecha_modificacion}
              contenido= {biblioteca.descripcion}/>*/
              )) : <div>Cargando tus Bibliotecas...</div>
            }
          </select>
        </div>
        <div class="form-group">
          <label for="exampleFormControlInput1">Título</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="Título Biblioteca"></input>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Descripción biblioteca</label>
          {biblioteca && biblioteca[0]?
            biblioteca.map((biblioteca, descripcion) => (
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Descripción Bibliteca">{biblioteca.descripcion}</textarea>
            )) : <div>Cargando tus Bibliotecas...</div>
            }
        </div>
      </form>
			</div>
		</div>
	);
}

export default FormEditBiblioteca;