import axios from "axios";

export default class BienService {
  async getOneBien(id) {
    return await axios.get(`https://notaitre-api.herokuapp.com/bien/${id}`);
  }

  async getAllBiens() {
    return await axios.get(`https://notaitre-api.herokuapp.com/bien/`);
  }
}
