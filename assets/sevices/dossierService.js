import axios from "axios";
axios.defaults.baseURL = "https://notaitre-api.herokuapp.com/dossiers/";
export default class DossierService {
  async getAllDocs() {
    return await axios.get();
  }

  async getOneDossier(id) {
    return await axios.get("/" + id);
  }
}
