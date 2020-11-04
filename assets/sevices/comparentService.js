import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:1337/comparent/'

export default class ComparentService {
  getOneComparent(id) {
    return axios.get(id)
  }

  async getAllComparents() {
    return await axios.get()
  }

  async saveEntreprise(
    comparent,
    raison,
    ice,
    rc,
    If,
    cnss,
    representant,
    Adresse
  ) {
    return await axios.post('entreprise', {
      comparent,
      representant,
      raisonSociale: raison,
      ice,
      rc,
      If,
      cnss,
      Adresse,
    })
  }
}
