import React from "react";
import './Styles/indexLogin.css';
import {post} from './Components/apiclient.js';
import  { useNavigate  } from 'react-router-dom';
import {getAuth , createUserWithEmailAndPassword } from "firebase/auth"

const Register = () => {
  const [value, setValue] = React.useState(false);
  const navigate = useNavigate ();
  const auth = getAuth();

  const registerFireBase = async (user, pass) => {
    await createUserWithEmailAndPassword(auth, user, pass).then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('submit');
    if (event.target[0] !== undefined && event.target[1] !== undefined) {
      let username = event.target[0].value;
      let password = event.target[1].value;
      let nombre = event.target[2].value;
      let telefono = event.target[3].value;
      let fecha = event.target[4].value;
      let user = {
        "correo": username,
        "password1": password,
        "telefono": telefono,
        "name": nombre,
        "fecha": fecha
      }

      registerFireBase(username, password)

      console.log(user)
     
      post("/usuario/addUser", user).then((m)=>{
        console.log(m)
      }).catch(err =>{
        console.log(err)
      })

      console.log(value);
      setValue(true);

    }
  }

  return (
    <div>
      <div class="contenedorInterno">
        <h1>¡Bienvenido a Paper Mind! ☺</h1><br></br>
        <h3>Ingrese sus credenciales para registro:</h3><br></br>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Usuario</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Nombre de usuario" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="Contraseña" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Nombre</label>
            <input type="text" class="form-control" id="nombre" placeholder="nombre" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Telefono</label>
            <input type="text" class="form-control" id="Telefono" placeholder="Telefono" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1">Fecha</label>
            <input type="date" class="form-control" id="Fecha" placeholder="Fecha" />
          </div><br></br>
          <button type="submit" class="btn btn-outline-primary btn-lg btn-block" onclick={handleSubmit}>Registrar</button>
        </form>
        <p></p>
        <button class="btn btn-outline-secondary btn-lg btn-block" onClick={() => navigate('/')}>
          Iniciar sesión
        </button>
      </div>
    </div>
  );
  
}

export default Register;