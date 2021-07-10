<template>
  <div class="mx-10 pa-10">
    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="ma-5">Ajouter Une Banque</h1>
    <form action="">
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="libelle" label="Banque"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="libelleAr"
            reverse
            label="اسم البنك"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="Agence" label="Agence"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="AgenceAr" reverse label="وكالة"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            textearia
            v-model="addresse"
            label="Adresse"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            textearia
            v-model="addresseAr"
            reverse
            label="العنوان"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="ville" label="Ville"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="villeAr"
            reverse
            label="المدينة"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="tel" label="Télèphone"></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-md-space-around">
          <v-btn color="primary" nuxt to="/banque">
            <v-icon>mdi-chevron-left</v-icon> Retour
          </v-btn>
          <v-btn color="primary" @click="enregistrer">Eenregistrer</v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import ComparentService from "./../../assets/sevices/comparentService";
import Axios from "axios";
const comparentService = new ComparentService();
export default {
  data() {
    return {
      libelle: "",
      Agence: "",
      addresse: "",
      libelleAr: "",
      AgenceAr: "",
      addresseAr: "",
      tel: "",
      ville: "",
      villeAr: "",
      snackbar: false,
      error: "",
      loading: false
    };
  },
  created() {},
  methods: {
    enregistrer() {
      this.loading = true;
      comparentService
        .createComparent(this.libelle, "B")
        .then(comp => {
          Axios.post("https://notaitre-api.herokuapp.com/comparent/banque", {
            comparent: comp.data.raw.insertId,
            libelle: this.libelle,
            libelleAr: this.libelleAr,
            Agence: this.Agence,
            AgenceAr: this.AgenceAr,
            addresse: this.addresse,
            addresseAr: this.addresseAr,
            tel: this.tel,
            ville: this.ville,
            villeAr: this.villeAr
          })
            .then(resp => {
              this.$router.push("/banque?success=Banque était bien ajouté");
            })
            .catch(err => {
              this.loading = false;
              this.error = err;
              this.snackbar = true;
            });
        })
        .catch(err => {
          this.loading = false;
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
