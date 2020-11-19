import axios from 'axios'

export default class BienService{


    async getOneBien(id){
       return await axios.get(`http://localhost:1337/bien/${id}`);
    }

    async getAllBiens(){
        return await axios.get(`http://localhost:1337/bien/`);
    }
}