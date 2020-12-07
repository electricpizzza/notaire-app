<template>
  <div class="mx-10 pa-10">
    <h1 class="ma-5">Ajouter Un Bien</h1>
    <form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Libelle"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :items="bineTypes"
            v-model="type"
            label="Type"
            item-text="libelle"
            item-value="value"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="ville" label="Ville"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="nb_piece"
            label="Nombre de Pieces"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="Superficie"
            type="number"
            label="Superficie(m2)"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="address" label="Address"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="address1"
            label="Address (Facultative)"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="description"
            label="Description"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="Immeuble" label="Immeuble"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="etage" label="Etage"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="valeur" label="Valeur(DHs)"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="ancfcc" label="ANCFCC"></v-text-field>
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
      Superficie: 0,
      address: '',
      address1: '',
      ville: '',
      description: '',
      etage: 0,
      nb_piece: 0,
      valeur: 0,
      ancfcc: '',
      Immeuble: '',
      terrainType: '',
      bineTypes: []
    }
  },
  methods: {
    enregistrer() {
      Axios.post('http://localhost:1337/bien', {
        libelle: this.libelle,
        type: this.type,
        ville: this.ville,
        Superficie: this.Superficie,
        address: this.address + " " + this.address1,
        ville: this.ville,
        description: this.description,
        etage: this.etage,
        nb_piece: this.nb_piece,
        valeur: this.valeur,
        ancfcc: this.ancfcc,
        Immeuble: this.Immeuble,
        terrainType: this.terrainType,
      }).then(resp => {
        this.$router.push(
          `/biens?success=Dossiers est bien enregistré`
        )
      }).catch(err => console.error(err))
    }
  },
  created() {
    Axios.get('http://localhost:1337/data').then(resp => {
      console.log(resp.data.typeBien);
      this.bineTypes = resp.data.typeBien;
    })
  }
}
</script>