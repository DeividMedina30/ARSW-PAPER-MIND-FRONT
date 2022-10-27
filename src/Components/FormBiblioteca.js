import React, { useState } from "react";
import axios from "axios";
import '../Styles/FormBiblioteca.css';
import Navbar from "./Navbar";

const FormBiblioteca = () =>{

	const baseURL = "https://paparmindarsw.herokuapp.com/api/bibliotecass";
	//const [biblioteca, setBiblioteca] = useState({})

	const guardarDatos = (e) =>{
		e.preventDefault()
		const data = new FormData(e.currentTarget);
		const values = Object.fromEntries(data.entries());
		const jsonObject = [
			{
				"nombre": values.titulo.toString(),
				"fecha_creacion": values.fechaCreacion.toString(),
				"fecha_modificacion": values.fechaModificacion.toString(),
				"descripcion": values.descripcion.toString()
			}
		];
		console.log(jsonObject[0]);
		axios.post(baseURL, {"data": jsonObject[0]}).then(res => res.data).catch(error => {console.log(error.request, error.message, error.response)});
	}
  return(
		<div class="Forma">
			<Navbar/>
			<div class="containerForm">
				<h1>Ingrese los datos de la Biblioteca:</h1><br/>
				<form class="was-validated" onSubmit={guardarDatos}>
					<div class="form-group">
						<label for="title-biblioteca">Título Biblioteca</label>
						<input name="titulo" type="text" class="form-control" id="title-biblioteca" placeholder="Ingrese un título" required/>
						<div class="invalid-feedback">El título no puede ser vacío</div>
					</div>
					<div class="form-group">
						<label for="title-biblioteca">Fecha creación</label>
						<input name="fechaCreacion" type="Date" class="form-control" id="fecha-creacion-biblioteca" placeholder="Ingrese un título" required/>
						<div class="invalid-feedback">El título no puede ser vacío</div>
					</div>
					<div class="form-group">
						<label for="title-biblioteca">Fecha modificacion</label>
						<input name="fechaModificacion" type="Date" class="form-control" id="fecha-modificacion-biblioteca" placeholder="Ingrese un título" required/>
						<div class="invalid-feedback">El título no puede ser vacío</div>
					</div>
					<div class="mb-3">
						<label  for="validationTextarea">Descripción</label>
						<textarea name="descripcion" class="form-control is-invalid" id="validationDescription" placeholder="Describa la biblioteca" required></textarea>
					</div>
					<button type="submit" class="btn btn-outline-success btn-lg btn-block">Crear</button>
					<button type="button" class="btn btn-outline-danger btn-lg btn-block" onClick="/">Cancelar</button>
				</form>
			</div>
		</div>
	)
	/*
	<div class="form-group">
					<label name="tipoBiblioteca" for="type-biblioteca" id="tipoBiblioteca">Tipo Biblioteca</label>
						<select class="custom-select" required>
							<option value="">Seleccione el tipo de Biblioteca</option>
							<option name="tipoBiblioteca1" value="1" id="tipoBiblioteca1">Biblioteca normal</option>
							<option name="tipoBiblioteca2" value="2" id="tipoBiblioteca2">Biblioteca importante</option>
							<option name="tipoBiblioteca3" value="3" id="tipoBiblioteca3">Al azar</option>
						</select>
						<div class="invalid-feedback">Debe seleccionar un tipo de Biblioteca</div>
					</div>*/

}

export default FormBiblioteca;