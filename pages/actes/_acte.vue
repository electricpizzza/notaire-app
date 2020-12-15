<template>
  <v-container>
    <h1 style="color: #295075; padding: 30px">{{ libelle }}</h1>
    <v-row>
      <v-col cols="12" class="d-flex justify-end px-5">
        Date de redaction : <b> {{ dateRedaction.toString().split(" ")[0] }}</b>
      </v-col>
      <!-- <v-col cols="12" sm="6">
          Redacteur : {{ redacteur }}
        </v-col>
        <v-col cols="12" sm="6">
          Acte de Model : {{model}}
        </v-col>
        <v-col cols="12" sm="6">
          Acte de Model : {{model}}
        </v-col>
        <v-col cols="12" sm="6" v-for="(content, index) in contenu" :key="index">
          {{content}}
        </v-col> -->
      <v-col cols="12">
        <div v-html="fichier" class="ma-5 acte"></div>
      </v-col>
      <v-col>
        <v-btn color="primary" dark nuxt to="/actes">
          <v-icon>mdi-chevron-left</v-icon> Retourner
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Axios from 'axios'
export default {
  async asyncData({ params }) {
    const slug = params.acte
    return { slug }
  },
  data() {
    return {
      contenu: '',
      model: '',
      redacteur: '',
      fichier: '',
      dossierId: '',
      libelle: '',
      dateRedaction: new Date().getUTCDate(),
    }
  },
  created() {
    Axios.get('http://localhost:1337/actes/' + this.slug).then(resp => {
      console.log(resp.data[0]);
      this.contenu = JSON.parse(resp.data[0].contenu);
      this.model = resp.data[0].model;
      this.redacteur = resp.data[0].redacteur;
      this.dateRedaction = resp.data[0].dateRedaction;
      this.libelle = resp.data[0].libelle;
      this.fichier = resp.data[0].fichier;
    })
  },
}
</script>
<style lang="css" scoped>
h1{
  text-align:center;
}
.acte{
  padding:20px;
  border: 1px solid black;
  border-radius:20px
}
  
</style>