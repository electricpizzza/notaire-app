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
    <h1 class="ma-5">Modifier la Banque</h1>
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
import Axios from "axios";
export default {
  async asyncData({ params }) {
    const slug = params.banque;
    return { slug };
  },
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
  created() {
    this.loading = true;
    Axios.get("https://notaitre-api.herokuapp.com/comparent/" + this.slug)
      .then(resp => {
        this.libelle = resp.data.comparentInfo[0].libelle;
        this.libelleAr = resp.data.comparentInfo[0].libelleAr;
        this.ville = resp.data.comparentInfo[0].ville;
        this.villeAr = resp.data.comparentInfo[0].villeAr;
        this.Agence = resp.data.comparentInfo[0].Agence;
        this.AgenceAr = resp.data.comparentInfo[0].AgenceAr;
        this.tel = resp.data.comparentInfo[0].tel;
        this.addresse = resp.data.comparentInfo[0].addresse;
        this.addresseAr = resp.data.comparentInfo[0].addresseAr;
        this.loading = false;
      })
      .catch(err => {
        this.loading = false;
        this.error = err;
        this.snackbar = true;
      });
  },
  methods: {
    enregistrer() {
      this.loading = true;

      Axios.put(
        "https://notaitre-api.herokuapp.com/comparent/banque" + this.slug,
        {
          libelle: this.libelle,
          libelleAr: this.libelleAr,
          Agence: this.Agence,
          AgenceAr: this.AgenceAr,
          addresse: this.addresse,
          addresseAr: this.addresseAr,
          tel: this.tel,
          ville: this.ville,
          villeAr: this.villeAr
        }
      )
        .then(resp => {
          this.$router.push("/banque?success=Banque était bien ajouté");
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
