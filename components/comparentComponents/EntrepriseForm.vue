<template>
  <v-form v-if="comparent" ref="form" v-model="valid" lazy-validation>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparant / Personne Morale
    </h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="raisonSocialeAr"
            name="raisonSociale"
            label="اسم الشركة"
            reverse
            dir="rtl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="ice"
            v-model="ice"
            name="ice"
            label="I.C.E"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="rc"
            v-model="rc"
            name="rc"
            label="R.C"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="cnss"
            v-model="cnss"
            name="cnss"
            label="C.N.S.S"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="IDF" label="I.F"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="RS" label="R.S"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="capital" label="Capital"></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field v-model="tel" label="Telephone"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Adresse"
            v-bind="Adresse"
            label="Adresse"
            name="Adresse"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="AdresseAr"
            v-bind="AdresseAr"
            label="العنوان"
            reverse
            dir="rtl"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-card>
            <div
              class="d-flex justify-md-space-between"
              style="color: #295075; padding: 30px"
            >
              <h4 class="pa-5 text-primary">Représentant :</h4>
              <h4 class="pa-5 text-primary">:المسؤول</h4>
            </div>
            <v-row class="pa-5">
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="representant.nom"
                  label="Nom & Prenom"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="representant.nomAr"
                  label="الاسم الشخصي و العائلي"
                  reverse
                  dir="rtl"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-select
                  :items="[
                    'CIN',
                    'Carte de séjour',
                    'Acte de naissance',
                    'Permis de conduire'
                  ]"
                  v-model="representant.typeId"
                  label="Type d'identification"
                ></v-select>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="representant.identification"
                  label="Identification du Representant"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="representant.address"
                  textarea
                  label="Addresse du Representant"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="representant.addressAr"
                  textarea
                  label="العنوان الشخصي"
                  reverse
                  dir="rtl"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
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
import ComparentService from "./../../assets/sevices/comparentService.js";
const comparentService = new ComparentService();
export default {
  props: {
    comparent: {
      type: Object
    },
    modifier: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    valid: true,
    dialogComp: false,
    comp: "",
    name: "",
    representant: {
      nom: "",
      nomAR: "",
      address: "",
      addressAr: "",
      typeId: "",
      identification: ""
    },
    raisonSociale: "",
    raisonSocialeAr: "",
    ice: "",
    rc: "",
    IDF: "",
    RS: "",
    capital: "",
    tel: "",
    cnss: "",
    Adresse: "",
    AdresseAr: "",
    representants: [],
    select: null,
    checkbox: false,
    selectedItems: [],
    headersComp: [
      { text: "ID", value: "id" },
      { text: "Nom de Comparant", value: "type" },
      { text: "Nom de Comparant", value: "nom" }
    ],
    snackbar: false,
    error: ""
  }),
  beforeCreate() {
    Axios.get("http://localhost:1337/comparent")
      .then(resp => {
        this.representants = resp.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  },
  created() {
    if (this.modifier) {
      this.raisonSociale = this.comparent.raisonSociale;
      this.raisonSocialeAr = this.comparent.raisonSocialeAr;
      this.ice = this.comparent.ice;
      this.rc = this.comparent.rc;
      this.IDF = this.comparent.IDF;
      this.cnss = this.comparent.cnss;
      this.representant = this.comparent.representant;
      this.Adresse = this.comparent.Adresse;
      this.AdresseAr = this.comparent.AdresseAr;
      this.RS = this.comparent.RS;
      this.tel = this.comparent.tel;
      this.capital = this.comparent.capital;
    } else this.raisonSociale = this.comparent.nom;
  },

  methods: {
    selectComparant() {
      this.representant = this.selectedItems;
      this.selectedItems = [];
      this.dialogComp = false;
    },
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    enregistrer() {
      if (this.modifier) {
        this.edit();
      } else
        comparentService
          .saveEntreprise(
            this.comparent.id,
            this.raisonSociale,
            this.raisonSocialeAr,
            this.ice,
            this.rc,
            this.IDF,
            this.cnss,
            this.representant,
            this.Adresse,
            this.AdresseAr,
            this.RS,
            this.tel,
            this.capital
          )
          .then(resp => {
            this.$router.push(
              `/comparent?success=Comparent était bien enregistré`
            );
          })
          .catch(err => {
            this.error = err;
            this.snackbar = true;
          });
    },
    edit() {
      comparentService
        .editEntreprise(
          this.comparent.comparent,
          this.raisonSociale,
          this.raisonSocialeAr,
          this.ice,
          this.rc,
          this.IDF,
          this.cnss,
          this.representant,
          this.Adresse,
          this.AdresseAr,
          this.RS,
          this.tel,
          this.capital
        )
        .then(resp => {
          this.$router.push(`/comparent?success=Comparent était bien Modifié`);
        })
        .catch(err => {
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>
