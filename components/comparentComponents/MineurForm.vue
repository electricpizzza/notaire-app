<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparant / Personne Physique Mineur
    </h1>
    <v-row class="container">
      <v-col cols="12" sm="6">
        <v-text-field name="nomFr" v-model="nomFr" label="Nom"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomAr"
          v-model="nomAr"
          label="الاسم العائلي"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="prenomFr"
          v-model="prenomFr"
          label="Prenom"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="prenomAr"
          v-model="prenomAr"
          label="الاسم الشخصي"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          name="nationalite"
          v-model="nationalite"
          label="nationalite"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomPereFr"
          v-model="nomPereFr"
          label="Nom du Pere"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomPereAr"
          v-model="nomPereAr"
          label="اسم الاب"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomMereFr"
          v-model="nomMereFr"
          label="Nom De Mere"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomMereFr"
          v-model="nomMereAr"
          label="اسم الأم"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dateNaissance"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateNaissance"
              label="Date Naissance"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="dateNaissance" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.menu.save(dateNaissance)">
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="idTypes"
          v-model="typeIdentification"
          label="Type Identification"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="Identification"
          label="Identification"
          id="Identification"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-menu
          ref="menu1"
          v-model="menu1"
          :close-on-content-click="false"
          :return-value.sync="IdentificationValable"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="IdentificationValable"
              label="Identification Valable Jusqu'à"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="IdentificationValable" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false"> Cancel </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu1.save(IdentificationValable)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="tetulles"
          v-model="tetulle"
          label="Tetulle"
          item-text="nom"
          item-value="id"
        ></v-select>
      </v-col>
    </v-row>
    <div class="d-flex justify-space-between mx-8">
      <v-btn color="primary" dark nuxt to="/comparent">
        <v-icon>mdi-chevron-left</v-icon> Retour</v-btn
      >
      <v-btn color="primary" dark @click="enregistrer">Enregistrer</v-btn>
    </div>
  </v-form>
</template>
<script>
import Axios from "axios";
import ComparentService from "./../../assets/sevices/comparentService";
const comparentService = new ComparentService();
export default {
  props: {
    modifier: {
      type: Boolean,
      default: false
    },
    comparent: {
      type: Object
    }
  },
  data: () => ({
    valid: true,
    menu: false,
    menu2: false,
    nomFr: "",
    nomAr: "",
    prenomFr: "",
    prenomAr: "",
    nationalite: "",
    nomPereFr: "",
    nomPereAr: "",
    nomMereFr: "",
    nomMereAr: "",
    typeIdentification: "",
    Identification: "",
    IdentificationValable: new Date().toISOString().substr(0, 0),
    dateNaissance: new Date().toISOString().substr(0, 0),
    tetulle: "",
    tetulles: [],
    idTypes: ["CIN", "Acte de naissance", "Permis de conduire"],
    snackbar: false,
    error: ""
  }),

  methods: {
    enregistrer() {
      if (this.modifier) {
        if (this.tetulle.id) {
          this.tetulle = this.tetulle.id;
        }
        comparentService
          .editMineur(
            this.comparent.comparent,
            this.nomFr,
            this.nomAr,
            this.prenomFr,
            this.prenomAr,
            this.nationalite,
            this.nomPereFr,
            this.nomPereAr,
            this.nomMereFr,
            this.nomMereAr,
            this.typeIdentification,
            this.Identification,
            this.IdentificationValable,
            this.dateNaissance,
            this.tetulle
          )
          .then(resp => {
            console.log(resp.date);
            this.$router.push(
              `/comparent?success=Comparent était bien Modifié`
            );
          })
          .catch(err => {
            this.error = err;
            this.snackbar = true;
          });
      } else
        comparentService
          .createMineur(
            this.comparent.id,
            this.nomFr,
            this.nomAr,
            this.prenomFr,
            this.prenomAr,
            this.nationalite,
            this.nomPereFr,
            this.nomPereAr,
            this.nomMereFr,
            this.nomMereAr,
            this.typeIdentification,
            this.Identification,
            this.IdentificationValable,
            this.dateNaissance,
            this.tetulle
          )
          .then(resp => {
            console.log(resp.date);
            this.$router.push(
              `/comparent?success=Comparent était bien enregistré`
            );
          })
          .catch(err => {
            this.error = err;
            this.snackbar = true;
          });
    }
  },

  beforeCreate() {},
  created() {
    Axios.get("https://notaitre-api.herokuapp.com/comparent").then(resp => {
      this.tetulles = resp.data.filter(
        tet =>
          tet.id != this.comparent.comparent &&
          tet.type != "PM" &&
          tet.type != "PPM"
      );
      if (this.modifier) {
        this.tetulle = this.tetulles.filter(
          tet => tet.id === this.comparent.tutelle
        )[0];
      }
    });
    if (this.modifier) {
      this.nomFr = this.comparent.nomFr;
      this.nomAr = this.comparent.nomAr;
      this.prenomFr = this.comparent.prenomFr;
      this.prenomAr = this.comparent.prenomAr;
      this.nationalite = this.comparent.nationalite;
      this.nomPereFr = this.comparent.nomPereFr;
      this.nomPereAr = this.comparent.nomPereAr;
      this.nomMereFr = this.comparent.nomMereFr;
      this.nomMereAr = this.comparent.nomMereAr;
      this.typeIdentification = this.comparent.typeIdentification;
      this.Identification = this.comparent.Identification;
      this.IdentificationValable = this.comparent.IdentificationValable;
      this.dateNaissance = this.comparent.dateNaissance;
    }
  }
};
</script>
