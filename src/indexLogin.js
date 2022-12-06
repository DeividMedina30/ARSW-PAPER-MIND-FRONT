import React from "react";
import './Styles/indexLogin.css';
import {post} from './Components/apiclient.js';
import  { Navigate , useNavigate  } from 'react-router-dom';
import {getAuth , signInWithCredential, signInWithEmailAndPassword } from "firebase/auth"

const Login = () => {
  const [value, setValue] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);
  const navigate = useNavigate ();

  const auth = getAuth();

  const login = async (user, pass) => {
    await signInWithEmailAndPassword(auth, user, pass).then((userCredential) => {
      const user = userCredential.user;
      console.log(user)
      navigate("/app")
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
      let user = {
        "correo": username,
        "password1": password
      }

      console.log(user)
      login(username, password)

      console.log(value);
      setValue(true);

    }
  }

  return (
    <div>
      <div class="contenedorInterno">
        <h1>¡Bienvenido a Paper Mind! ☺</h1><br></br>
        <h3>Ingrese sus credenciales de acceso:</h3><br></br>
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <label for="exampleInputEmail1">Usuario</label>
            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" placeholder="Nombre de usuario" />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="Contraseña" />
          </div><br></br>
          <button type="submit" class="btn btn-outline-primary btn-lg btn-block" onclick={handleSubmit}>Acceder</button>
        </form>
        <p></p>
        <button class="btn btn-outline-secondary btn-lg btn-block" onClick={() => navigate('/register')}>
          Registrarse
        </button>
        {redirect && <Navigate to="/App" />}
      </div>
    </div>
  );
  
}

export default Login;