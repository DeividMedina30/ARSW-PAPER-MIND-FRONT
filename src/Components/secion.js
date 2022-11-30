var apiclient = apiclient;
var module = (function () {
    var user = {
        id:null,
        name: null,
        fecha: null,
        telefono: null,
        correo: null,
        password1: null
    };

    var usuario;
    var id;
    var name;
    var fecha;
    var telefono;
    var correo;
    var password;
    var password1;
    var ajaxinser = function(newUser){
        apiclient.crear(newUser);
    }
    var validar = function(user){
    	apiclient.validarUser(user);
    }

    var logout = function(user){
        apiclient.logout(user);
    }
    
    var login = function(){
            user.correo = document.getElementById("username").value;
            user.password1 = document.getElementById("password").value;
            if (user.correo != null && user.password1 != null){
                validar(user);
            }
    }

    var exit = function(){
        logout(user);
    }


   
    return{
        login: login,
        ajaxinser: ajaxinser,
        validar: validar,
        exit: exit
       
    }
})();