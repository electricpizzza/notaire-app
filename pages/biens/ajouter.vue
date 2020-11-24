<template>
  <div class="mx-10 pa-10">
    <h1 class="ma-5">Ajouter Un Bien</h1>
    <form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field name="libelle" label="Libelle"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="type" label="Type"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="ville" label="Ville"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            name="nbPieces"
            label="Nombre de Pieces"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field name="address1" label="Address"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            name="address2"
            label="Address (Facultative)"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            name="description"
            label="Description"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="Immeuble" label="Immeuble"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="etage" label="Etage"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="valeur" label="Valeur(DHs)"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field name="ancfcc" label="ANCFCC"></v-text-field>
        </v-col>
      </v-row>
      <v-btn color="primary" class="offset-10" dark @click="enregistrer"
        >Enregistrer</v-btn
      >
    </form>
  </div>
</template>
<script>
import Axios from 'axios'
export default {
  data() {
    return {
      libelle: '',
      type: '',
      ville: "",
      Superficie: null,
      address: '',
      ville: '',
      description: '',
      etage: null,
      nb_piece: null,
      valeur: null,
      ancfcc: '',
    }
  },
  methods: {
    enregistrer() {
      Axios.post('http://localhost:1337/bien', {
        libelle: this.libelle,
        type: this.type,
        ville: this.ville,
        Superficie: this.Superficie,
        address: this.address,
        ville: this.ville,
        description: this.description,
        etage: this.etage,
        nb_piece: this.nb_piece,
        valeur: this.valeur,
        ancfcc: this.ancfcc,
      }).then(resp => {
        console.log(resp);
      }).catch(err => console.error(err))
    }
  },
}
</script>