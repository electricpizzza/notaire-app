<template>
  <v-form ref="form" v-model="valid" lazy-validation>
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
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparant / Personne Physique
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
      <v-col cols="6">
        <v-text-field v-model="nationalite" label="Nationalité"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
          v-model="nationaliteAr"
          label="الجنسية"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="Adresse" label="Adresse"></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          v-model="AdresseAr"
          label="عنوان"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field v-model="fonction" label="Profession"></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          v-model="fonctionAr"
          label="مهنة"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field v-model="tel" label="Telephone"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomPereFr"
          v-model="nomPereFr"
          label="Nom du Pere"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomPereAr"
          v-model="nomPereAr"
          label="اسم الاب"
          reverse
          dir="rtl"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomMereFr"
          v-model="nomMereFr"
          label="Nom De Mere"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomMereAr"
          v-model="nomMereAr"
          label="اسم الأم"
          reverse
          dir="rtl"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-select
          :items="situations"
          v-model="situation"
          label="Situation Familiale"
          item-value="situ"
          item-text="lib"
        ></v-select>
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
        <v-text-field
          v-model="lieuxNaissance"
          label="Lieu de Naissance"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          v-model="lieuxNaissanceAr"
          label="مكان الولادة"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" v-if="situation && situation === 'marie'">
        <v-text-field
          name="nomCompanionFr"
          v-model="nomCompanionFr"
          label="Nom Companion"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" v-if="situation && situation === 'marie'">
        <v-text-field
          name="nomCompanionAr"
          v-model="nomCompanionAr"
          label="اسم الزوج/الزوجة"
          reverse
          dir="rtl"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
        <v-select
          :items="idTypes"
          v-model="typeIdentification"
          label="Type Identification"
        ></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <v-text-field
          name="Identification"
          v-model="Identification"
          label="Identification"
          id="Identification"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="4">
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
      <v-col cols="12"> </v-col>
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
import ComparentService from "./../../assets/sevices/comparentService";
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
    menu: false,
    menu2: false,
    nomFr: "",
    nomAr: "",
    prenomFr: "",
    prenomAr: "",
    nationalite: "",
    nationaliteAr: "",
    fonction: "",
    fonctionAr: "",
    nomPereFr: "",
    nomPereAr: "",
    nomMereFr: "",
    nomMereAr: "",
    situation: "",
    tel: "",
    nomCompanionFr: "",
    nomCompanionAr: "",
    typeIdentification: "",
    Identification: "",
    lieuxNaissance: "",
    lieuxNaissanceAr: "",
    Adresse: "",
    AdresseAr: "",
    IdentificationValable: new Date().toISOString().substr(0, 0),
    dateNaissance: new Date().toISOString().substr(0, 0),
    situations: [
      { situ: "celibataire", lib: "Célibataire" },
      { situ: "marie", lib: "Marié(e)" },
      { situ: "divorce", lib: "Divorcé(e)" },
      { situ: "veuf", lib: "Veuf(ve)" }
    ],
    idTypes: [
      "CIN",
      "Carte de séjour",
      "Acte de naissance",
      "Permis de conduire"
    ],
    snackbar: false,
    error: "",
    loading: false
  }),
  created() {
    if (this.modifier) {
      this.nomFr = this.comparent.nomFr;
      this.nomAr = this.comparent.nomAr;
      this.prenomFr = this.comparent.prenomFr;
      this.prenomAr = this.comparent.prenomAr;
      this.nationalite = this.comparent.nationalite;
      this.nationaliteAr = this.comparent.nationaliteAr;
      this.fonction = this.comparent.fonction;
      this.fonctionAr = this.comparent.fonctionAr;
      this.nomPereFr = this.comparent.nomPereFr;
      this.nomPereAr = this.comparent.nomPereAr;
      this.nomMereFr = this.comparent.nomMereFr;
      this.nomMereAr = this.comparent.nomMereAr;
      this.situation = this.comparent.situation;
      this.nomCompanionFr = this.comparent.nomCompanionFr;
      this.nomCompanionAr = this.comparent.nomCompanionAr;
      this.typeIdentification = this.comparent.typeIdentification;
      this.Identification = this.comparent.Identification;
      this.IdentificationValable = this.comparent.IdentificationValable;
      this.dateNaissance = this.comparent.dateNaissance;
      this.lieuxNaissance = this.comparent.lieuxNaissance;
      this.lieuxNaissanceAr = this.comparent.lieuxNaissanceAr;
      this.tel = this.comparent.tel;
      this.Adresse = this.comparent.Adresse;
      this.AdresseAr = this.comparent.AdresseAr;
    }
  },
  methods: {
    enregistrer() {
      this.loading = true;
      if (this.modifier) {
        this.edit();
      } else
        comparentService
          .createPerson(
            this.comparent,
            this.nomFr,
            this.nomAr,
            this.prenomFr,
            this.prenomAr,
            this.nationalite,
            this.nationaliteAr,
            this.fonction,
            this.fonctionAr,
            this.nomPereFr,
            this.nomPereAr,
            this.nomMereFr,
            this.nomMereAr,
            this.situation,
            this.nomCompanionFr,
            this.nomCompanionAr,
            this.typeIdentification,
            this.Identification,
            this.IdentificationValable,
            this.dateNaissance,
            this.lieuxNaissance,
            this.lieuxNaissanceAr,
            this.tel,
            this.Adresse,
            this.AdresseAr
          )
          .then(resp => {
            console.log(resp);
            this.loading = false;
            this.$router.push(
              `/comparent?success=Comparent était bien enregistré`
            );
          })
          .catch(err => {
            this.loading = false;
            this.error = err;
            this.snackbar = true;
          });
    },
    edit() {
      comparentService
        .editPerson(
          this.comparent,
          this.nomFr,
          this.nomAr,
          this.prenomFr,
          this.prenomAr,
          this.nationalite,
          this.nationaliteAr,
          this.fonction,
          this.fonctionAr,
          this.nomPereFr,
          this.nomPereAr,
          this.nomMereFr,
          this.nomMereAr,
          this.situation,
          this.nomCompanionFr,
          this.nomCompanionAr,
          this.typeIdentification,
          this.Identification,
          this.IdentificationValable,
          this.dateNaissance,
          this.lieuxNaissance,
          this.lieuxNaissanceAr,
          this.tel,
          this.Adresse,
          this.AdresseAr
        )
        .then(resp => {
          this.loading = false;
          this.$router.push(`/comparent?success=Comparent était bien Modifié`);
        })
        .catch(err => {
          this.error = err;
          this.loading = false;
          this.snackbar = true;
        });
    }
  }
};
</script>
<style>
.formTitle {
  color: deepskyblue;
}
</style>
