import axios from "axios";

export class BibliotecaService{
    baseURL = "https://paparmindarsw.herokuapp.com/api/bibliotecas";
    getAll(){
        return axios.get(this.baseURL).then(res => res.data);
    }

    save(biblioteca){
        return axios.post(this.baseURL, biblioteca).then(res => res.data);
    }
}