import axios from "axios";
const baseURL = "https://paparmindarsw.herokuapp.com/api/bibliotecas";
export class BibliotecaService{
    getAll(){
        return axios.get(this.baseURL).then(res => res.data);
    }

    save(biblioteca){
        return axios.post(this.baseURL, biblioteca).then(res => res.data);
    }
}

export async function saveBiblioteca(bibliotecaData){
    try {
        return axios.post(this.baseURL,bibliotecaData).then(res => res.data);
    } catch (error) {
        console.log(error)
    }
}
