<template>
  <v-card class="mx-auto menu" max-width="700px">
    <v-snackbar v-model="snackbarErr" color="error">
      {{ error }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          text
          v-bind="attrs"
          @click="snackbarErr = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-img
      class="mx-auto"
      height="180px"
      width="180px"
      src="/_nuxt/assets/logo.jpeg"
    >
    </v-img>
    <v-card-title primary-title class="d-flex justify-center bg-dark">
      <h3>Vous êtes conecté au tant que Admin</h3>
    </v-card-title>
    <v-card-text class="mx-auto">
      <v-container class="d-flex flex-column justify-center px-lg-16">
        <v-btn
          outlined
          color="primary"
          large
          dark
          class="btn-menu my-1 mx-16 d-flex justify-start px-10"
        >
          <v-icon class="mr-10">mdi-gavel</v-icon> Redaction D'acte
        </v-btn>
        <v-btn
          outlined
          color="primary"
          large
          dark
          class="btn-menu my-1 mx-16 d-flex justify-start px-10"
        >
          <v-icon class="mr-10">mdi-calculator</v-icon>Comptabilité
        </v-btn>
        <v-btn
          outlined
          color="primary"
          large
          dark
          class="btn-menu my-1 mx-16 d-flex justify-start px-10"
          nuxt
          to="/home"
          ><v-icon class="mr-10">mdi-folder</v-icon> Gestion des Dossier
        </v-btn>
        <v-btn
          outlined
          color="primary"
          large
          dark
          class="btn-menu my-1 mx-16 d-flex justify-start px-10"
        >
          <v-icon class="mr-10">mdi-cog</v-icon>Paramétre
        </v-btn>
        <div class="d-flex my-1 mx-16 d-flex justify-start px-10">
          <span class="mt-1">Etat du serveur</span>
          <v-btn
            text
            :color="etatServeur === 'Deconecté' ? 'error' : 'success'"
            dark
            @click="connetToSever"
            >{{ etatServeur }}
          </v-btn>
        </div>
      </v-container>
    </v-card-text>
    <v-card-actions class="d-flex justify-center bg-dark">
      <v-btn color="primary darken-4" dark>
        <v-icon class="mr-1">mdi-logout</v-icon>
        <!-- {{ etatServeur === "Conecté" ? "Conecté" : "Deconecté" }} -->
        Se deconnecter
      </v-btn>
      <v-btn color="error" outlined dark>
        <v-icon class="mr-1">mdi-close</v-icon> Quitter</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script>
import Axios from 'axios';
export default {
  layout: 'empty',
  data() {
    return {
      etatServeur: 'Deconecté',
      error: '',
      snackbarErr: false,
    }
  },
  methods: {
    connetToSever() {
      if (this.etatServeur === "Deconecté") {
        Axios.get('http://localhost:1337').then(resp => {
          console.log(resp.data);
          this.etatServeur = "Conecté";
          this.snackbarErr = false;
          this.error = '';
        }).catch(err => {
          console.log(err);
          this.error = 'Erreur: Echeque de conexion, Veuillez consulter vos serveures';
          this.snackbarErr = true;
        })
        // this.etatServeur = "Conecté";
      }
    }
  },
  created() {
    Axios.get('https://notair-api.herokuapp.com').then(resp => {
      console.log(resp.data);
      this.etatServeur = "Conecté";
      this.snackbarErr = false;
      this.error = '';
    }).catch(err => {
      console.log(err);
      this.error = 'Erreur: Echeque de conexion, Veuillez consulter vos serveurs';
      this.snackbarErr = true;
    })
  }
}
</script>
<style lang="css" scope>
    .menu{
      background-image: url('https://raw.githubusercontent.com/electricpizzza/BloodDonation/master/public/img/background.png');
    }
    .bg-dark{
      background-color:#2195f3;
    }
</style>