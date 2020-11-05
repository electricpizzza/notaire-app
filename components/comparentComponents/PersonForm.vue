<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparent / Personne Physique
    </h1>
    <v-row class="container">
      <v-col cols="12" sm="6">
        <v-text-field name="nomFr" v-model="nomFr" label="Nom"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field
          name="nomAr"
          v-model="nomAr"
          label="الاسم الشخصي"
          reverse
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
          label="الاسم العائلي"
          reverse
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          name="nationalite"
          v-model="nationalite"
          label="Nationalite"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-text-field
          name="fonction"
          v-model="fonction"
          label="Fonction"
        ></v-text-field>
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
      <v-col
        cols="12"
        sm="6"
        v-if="
          situation &&
          (situation === 'mariAvecEnf' || situation === 'mariSansEnf')
        "
      >
        <v-text-field
          name="nomCompanionFr"
          v-model="nomCompanionFr"
          label="Nom Companion"
          id="id"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        v-if="
          situation &&
          (situation === 'mariAvecEnf' || situation === 'mariSansEnf')
        "
      >
        <v-text-field
          name="nomCompanionAr"
          v-model="nomCompanionAr"
          label="اسم الزوج/الزوجة"
          reverse
        ></v-text-field>
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
          v-model="Identification"
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
      <v-col cols="12"> </v-col>
    </v-row>
    <v-btn outline color="primary" class="offset-10" dark @click="enregistrer"
      >Enregistre</v-btn
    >
  </v-form>
</template>
<script>
import ComparentSeervice from './../../assets/sevices/comparentService'
const comparentSeervice = new ComparentSeervice()
export default {
  props: ["comparent"],
  data: () => ({
    valid: true,
    menu: false,
    menu2: false,
    nomFr: '',
    nomAr: '',
    prenomFr: '',
    prenomAr: '',
    nationalite: '',
    fonction: '',
    nomPereFr: '',
    nomPereAr: '',
    nomMereFr: '',
    nomMereAr: '',
    situation: '',
    nomCompanionFr: '',
    nomCompanionAr: '',
    typeIdentification: '',
    Identification: '',
    IdentificationValable: new Date().toISOString().substr(0, 0),
    dateNaissance: new Date().toISOString().substr(0, 0),
    situations: [
      { situ: "celibataire", lib: "Célibataire" },
      { situ: "mariAvecEnf", lib: "Marié avec enfant(s)" },
      { situ: "mariSansEnf", lib: "marié sans enfant(s)" },
      { situ: "divAvecEnf", lib: "Divorcé avec enfant(s)" },
      { situ: "divSansEnf", lib: "Divorcé sans enfant(s)" },
    ],
    idTypes: ['CIN', 'Acte de naissance', 'Permis de conduire'],
  }),

  methods: {
    enregistrer() {
      comparentSeervice.createPerson(
        this.comparent,
        this.nomFr,
        this.nomAr,
        this.prenomFr,
        this.prenomAr,
        this.nationalite,
        this.fonction,
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
        this.dateNaissance
      ).then(resp => {
        console.log(resp)
        this.$router.push(
          `/comparent?success=Comparent était bien enregistré`
        )
      }).catch(err => console.error(err))
    }
  },
}
</script>
<style>
  .formTitle{
    color: deepskyblue;
  }
</style>
