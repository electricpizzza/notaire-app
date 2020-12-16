<template>
  <v-container>
      <h1 class="text-center">{{ libelle }}</h1>
      <v-row class="font-bold">
          <v-col cols="4">Redacteur : <b> {{redacteur}}</b></v-col>
          <v-col cols="4">Langue: <b> {{language}}</b></v-col>
          <v-col cols="4">Type: <b> {{type}}</b> </v-col>
          <v-col cols="12">
              <h3>Champs: </h3>
              <v-row v-for="ch in champs" :key="ch.name">
                  <v-col cols="6">Titre: <b> {{ch.name}}</b></v-col>
                  <v-col cols="6">Type: <b> {{ch.type}}</b></v-col>
              </v-row>
          </v-col>
        <v-col cols="12">
            <RichEditor :libelle="libelle" :value="libelle"/>
        </v-col>
      </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  async asyncData({ params }) {
    const slug = params.modele
    return { slug }
  },
  data() {
    return {
      language: null,
      redacteur: '',
      libelle: null,
      boilerplate: '',
      type: '',
      champs: [],
    }
  },
  created() {
    Axios.get('http://localhost:1337/model/'+this.slug).then(resp => {
      console.log(resp.data[0]);
        this.libelle = resp.data[0].libelle;
        this.redacteur = resp.data[0].redacteur;
        this.language = resp.data[0].language;
        this.champs = JSON.parse(resp.data[0].champs);
        this.type = resp.data[0].type;

    })
  },
}
</script>
<style lang="css">
    .font-bold{
        font-size: large;
    }
</style>