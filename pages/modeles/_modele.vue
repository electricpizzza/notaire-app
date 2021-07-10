<template>
  <v-container>
    <h1 class="text-center ma-10">{{ libelle }}</h1>
    <div class="d-flex justify-space-between ma-5">
      <v-btn color="primary" dark nuxt to="/modeles">
        <v-icon>mdi-chevron-left</v-icon> Retour</v-btn
      >
      <v-btn color="primary" dark :to="`/modeles/modifier/${slug}`"
        >Modifier</v-btn
      >
    </div>
    <v-row class="font-bold">
      <v-col cols="4"
        >Redacteur : <b> {{ redacteur }}</b></v-col
      >
      <v-col cols="4"
        >Langue: <b> {{ language }}</b></v-col
      >
      <v-col cols="4"
        >Type: <b> {{ type }}</b>
      </v-col>
      <v-col cols="12">
        <h3>Champs:</h3>
        <v-row v-for="ch in champs" :key="ch.name">
          <v-col cols="6"
            >Titre: <b> {{ ch.name }}</b></v-col
          >
          <v-col cols="6"
            >Type: <b> {{ ch.type }}</b></v-col
          >
        </v-row>
      </v-col>
      <v-col cols="12">
        <acte-document :libelle="libelle" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from "axios";
import MarkdownStore from "~/assets/store/MarkdownStore";
import ActeDocument from "../../components/actesComponents/ActeDocument.vue";
export default {
  components: { ActeDocument },
  async asyncData({ params }) {
    const slug = params.modele;
    return { slug };
  },
  data() {
    return {
      language: null,
      redacteur: "",
      libelle: null,
      boilerplate: "",
      type: "",
      champs: []
    };
  },
  created() {
    Axios.get("https://notaitre-api.herokuapp.com/model/" + this.slug)
      .then(resp => {
        this.libelle = resp.data[0].libelle;
        this.redacteur = resp.data[0].redacteur;
        this.language = resp.data[0].language;
        this.champs = JSON.parse(resp.data[0].champs);
        this.type = resp.data[0].type;
        this.boilerplate = resp.data[0].boilerPlate;
        MarkdownStore.data.markdown = this.boilerplate;
      })
      .catch(err => {});
  }
};
</script>
<style lang="css">
.font-bold {
  font-size: large;
}
</style>
