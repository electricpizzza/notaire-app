import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1337/dossier/';
export default class DossierService{

    async getAllDocs(){
        return await axios.get();
    }
}