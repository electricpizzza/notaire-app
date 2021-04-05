<template>
  <v-container v-if="model || contenu">
    <Acteform :model="model" :oldContenu="contenu" />
  </v-container>
</template>

<script>
import Axios from "axios";
export default {
  async asyncData({ params }) {
    const slug = params.acte;
    return { slug };
  },
  data() {
    return {
      contenu: "",
      model: null,
      redacteur: "",
      fichier: "",
      dossierId: "",
      libelle: "",
      dateRedaction: new Date().getUTCDate()
    };
  },
  created() {
    Axios.get("http://localhost:1337/actes/" + this.slug).then(resp => {
      console.log(resp.data[0]);
      this.contenu = JSON.parse(resp.data[0].contenu);
      this.redacteur = resp.data[0].redacteur;
      this.dateRedaction = resp.data[0].dateRedaction;
      this.libelle = resp.data[0].libelle;
    });
  }
};
</script>
