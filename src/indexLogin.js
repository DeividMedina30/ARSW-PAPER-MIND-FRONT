import React from "react";
import './Styles/indexLogin.css';

function Login(){
  return(
    <div class="containerLogin">
      <div class="contenedorInterno">
        <h1>¡Bienvenido a Paper Mind! ☺</h1><br></br>
        <h3>Ingrese sus credenciales de acceso:</h3><br></br>
        <form>
          <div class="form-group">
            <label for="exampleInputEmail1">Usuario</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Nombre de usuario"/>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Contraseña"/>
          </div>
          <button type="submit" class="btn btn-primary">Acceder</button>
        </form>
      </div>
    </div>
  );
}

export default Login;