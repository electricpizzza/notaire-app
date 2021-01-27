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
  async saveEntreprise(comparent,raison,raisonSocialeAr,ice,rc,IDF,cnss,representant,Adresse,AdresseAr,RS,tel,capital) {
    return await axios.post('http://localhost:1337/comparent/entreprise', {comparent, representant, raisonSociale: raison, raisonSocialeAr, ice, rc, cnss, Adresse,AdresseAr,IDF,RS,tel,capital});
  }

  async editEntreprise(comparent,raison,raisonSocialeAr,ice,rc,IDF,cnss,representant,Adresse,AdresseAr,RS,tel,capital){
    return await axios.put(`http://localhost:1337/comparent/entreprise/${comparent}`,{representant, raisonSociale: raison,raisonSocialeAr, ice, rc, cnss, Adresse,AdresseAr,IDF,RS,tel,capital})
  }

  async createPerson(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nationaliteAr,fonction,fonctionAr,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance,lieuxNaissance,lieuxNaissanceAr,tel,Adresse,AdresseAr){
      return await axios.post('http://localhost:1337/comparent/person',{comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nationaliteAr,fonction,fonctionAr,Adresse,AdresseAr,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance,lieuxNaissance,lieuxNaissanceAr,tel});
  }


  async editPerson(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nationaliteAr,fonction,fonctionAr,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance,lieuxNaissance,lieuxNaissanceAr,tel,Adresse,AdresseAr){
    return await axios.put(`http://localhost:1337/comparent/person/${comparent.comparent}`,{nomFr,nomAr,prenomFr,prenomAr,nationalite,nationaliteAr,fonction,fonctionAr,Adresse,AdresseAr,nomPereFr,nomPereAr,nomMereFr,nomMereAr,situation,nomCompanionFr,nomCompanionAr,typeIdentification,Identification,IdentificationValable,dateNaissance,lieuxNaissance,lieuxNaissanceAr,tel});
  }


  async createMineur(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle){
    return  await axios.post('http://localhost:1337/comparent/mineur',{comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle})
  }

    async editMineur(comparent,nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle){
    return  await axios.put(`http://localhost:1337/comparent/mineur/${comparent}`,{nomFr,nomAr,prenomFr,prenomAr,nationalite,nomPereFr,nomPereAr,nomMereFr,nomMereAr,typeIdentification,Identification,IdentificationValable,dateNaissance,tutelle})
  }
}


