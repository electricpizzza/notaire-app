import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:1337/dossiers/';
export default class DossierService{

    async getAllDocs(){
        return await axios.get();
    }

    async getOneDossier(id){
        return await axios.get('/'+id);
    }
}