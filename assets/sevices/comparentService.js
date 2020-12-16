import axios from 'axios';


export default class ComparentService {
  getOneComparent(id) {
    return axios.get(`http://localhost:1337/comparent/${id}`);
  }

  async getAllComparents() {
    return await axios.get('http://localhost:1337/comparent');
  }


  async createComparent(nom,type){
    return await axios
          .post('http://localhost:1337/comparent', {
            nom,type
          })
  }
  async saveEntreprise(comparent,raison,ice,rc,If,cnss,representant,Adresse) {
    return await axios.post('http://localhost:1337/comparent/entreprise', {comparent, representant, raisonSociale: raison, ice, rc, If, cnss, Adresse,});
  }

  async editEntreprise(comparent,raison,ice,rc,If,cnss,representant,Adresse){
    return await axios.put(`http://localhost:1337/comparent/entreprise/${comparent}`,{representant, raisonSociale: raison, ice, rc, If, cnss, Adresse})
  }

  async createPerson(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance){
      return await axios.post('http://localhost:1337/comparent/person',{comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance});
  }
    async editPerson(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance){
      return await axios.post('http://localhost:1337/comparent/person',{comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance});
  }

  async editPerson(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance){
    return await axios.put(`http://localhost:1337/comparent/person/${comparent.comparent}`,{nomFr,nomAr,prenomFr,prenomAr,nationalite,fonction,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance});
  }


  async createMineur(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle){
    return  await axios.post('http://localhost:1337/comparent/mineur',{comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle})
  }

    async editMineur(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle){
    return  await axios.put(`http://localhost:1337/comparent/mineur/${comparent}`,{nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle})
  }
}


