import React from "react";
import '../Styles/FormBiblioteca.css';
import NavbarN from "./NavbarN.js";

function FormNota(){
  return(
		<div class="Forma">
			<NavbarN/>
			<div class="containerForm">
				<h1>Ingrese los datos de la Nota:</h1><br/>
				<form class="was-validated">
					<div class="form-group">
						<label for="title-biblioteca">Título</label>
						<input type="text" class="form-control" id="title-biblioteca" placeholder="Ingrese un título" required/>
						<div class="invalid-feedback">El título no puede ser vacío</div>
					</div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="validatedimage" required/>
            <label class="custom-file-label" for="validatedCustomFile">Elegir portada...</label>
            <div class="invalid-feedback">Debe elegir una portada para la nota</div>
          </div>
					<div class="mb-3">
						<label for="validationTextarea">Contenido</label>
						<textarea class="form-control is-invalid" id="validationContent" placeholder="Ingrese el contenido de la nota" required></textarea>
					</div>
					<button type="button" class="btn btn-outline-success btn-lg btn-block" onClick="/">Crear</button>
					<button type="button" class="btn btn-outline-danger btn-lg btn-block" onClick="/" href="/Notas" >Cancelar</button>
				</form>
			</div>
		</div>
	)
}

export default FormNota;