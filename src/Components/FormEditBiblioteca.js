import React, { useEffect, useState } from "react";
import '../Styles/FormEditBiblioteca.css';
import axios from "axios";
import Navbar from "./Navbar";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const FormEditBiblioteca = (props) => {
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

  function getSelectedText() {
    let selecBiblioteca= document.getElementById("selecBiblioteca");
    let bib = selecBiblioteca.value


    alert("Biblioteca seleccionada: " + bib);
  }

  const [isOpen, setOpen] = useState(true);
  const closePopUp = () =>{
    setOpen(false)
  }

  return(
		<div class="formedit" >
			<div class="contenedorEditForm">
        <h2>Seleccione la biblioteca</h2><br></br>
        <form>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Example select</label>
            <select class="form-control" id="selecBiblioteca" /*onchange={getSelectedText()}*/>
              {biblioteca && biblioteca[0]?
                biblioteca.map((biblioteca, nombre) => (
                  <option value={biblioteca.nombre}>{biblioteca.nombre}</option>
                )) : <div>Cargando tus Bibliotecas...</div>
              }
            </select>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Título</label>
            <input class="form-control" id="exampleFormControlInput1" placeholder="Nuevo título biblioteca"></input>
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Descripción biblioteca</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Nueva descripción Bibliteca"></textarea>
          </div>
          <button class="btn btn-outline-success btn-lg btn-block" >Editar</button>
					<button class="btn btn-outline-danger btn-lg btn-block" onClick={closePopUp}>Cancelar</button>
        </form>
			</div>
      {isOpen}
		</div>
	);
}

export default FormEditBiblioteca;