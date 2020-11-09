<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Titre"></v-text-field>
        </v-col>
        <v-col cols="12" v-for="champ in shema" :bind="champ.name">
          <v-select
            v-if="champ.type === 'comparent'"
            :items="comparents"
            item-value="id"
            item-text="nom"
            v-model="champ.name"
            :label="champ.label"
            :name="champ.name"
          ></v-select>
          <v-select
            v-else-if="champ.type === 'bien'"
            :items="['bien 1', 'bien 2']"
            v-model="champ.name"
            :label="champ.label"
            :name="champ.name"
          ></v-select>
          <v-text-field
            v-else
            :name="champ.name"
            :label="champ.label"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="dossiers"
            v-model="dossier"
            label="Dossier"
            item-text="title"
            item-value="id"
          ></v-select>
        </v-col>
      </v-row>
      <v-btn color="primary" class="offset-10" @click="enregistrer" dark
        >Enregistrer</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import axios from 'axios'
import ComparentService from './../../assets/sevices/comparentService'
const comparentService = new ComparentService()
export default {
  name: "Acteform",
  data() {
    return {
      shema: [],
      champs: [],
      redacteur: '',
      fichier: '',
      dossier: '',
      libelle: '',
      comparents: [],
      dossiers: []
    }
  },
  props: ["model"],

  beforeCreate() {
    comparentService.getAllComparents().then(resp => {
      this.comparents = resp.data
    })
    axios.get('http://localhost:1337/dossiers').then(res => {
      this.dossiers = res.data
    })
  },
  created() {
    this.shema = JSON.parse(this.model.champs);

  },
  methods: {
    enregistrer() {

      const chmps = document.querySelectorAll('input');
      chmps.forEach(chmp => {
        if (chmp.name != "") {
          this.champs.push(
            JSON.parse(`{"${chmp.name}" : "${chmp.value}"}`)
          )
        }
      });
      axios.post('http://localhost:1337/actes', {
        contenu: this.champs,
        model: this.model.id,
        redacteur: this.redacteur,
        fichier: this.fichier,
        dossierId: this.dossier,
        libelle: this.libelle,
        dateRedaction: new Date().toDateString()
      }).then(resp => {
        console.log(resp)
      }).catch(err => console.log(err))
    }
  }
}
</script>