<template>
  <div class="mx-10 pa-10">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="ma-5">Modifier Le Bien</h1>
    <form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Titre Foncier"></v-text-field>
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
          <v-text-field v-model="valeur" label="Valeur(DHs)"></v-text-field>
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
        <v-col cols="12" md="4">
          <v-text-field v-model="ville" label="Ville"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="Immeuble" label="Immeuble"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="etage" label="Etage"></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field
            v-model="description"
            label="Description"
            textarea
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-text-field v-model="ancfcc" label="ANCFCC"></v-text-field>
        </v-col> -->
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
  async asyncData({ params }) {
    const slug = params.bien
    return { slug }
  },
  data() {
    return {
      libelle: '',
      type: '',
      ville: "",
      Superficie: null,
      address: '',
      address1: '',
      ville: '',
      description: '',
      etage: null,
      nb_piece: null,
      valeur: null,
      ancfcc: '',
      Immeuble: '',
      terrainType: '',
      snackbar: false,
      error: '',
    }
  },
  methods: {
    enregistrer() {
      Axios.put('http://localhost:1337/bien/' + this.slug, {
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
          '/biens?success=Bien est bien modifié'
        )
      }).catch((err) => {
        this.error = err;
        this.snackbar = true;
      });
    }
  },
  created() {
    Axios.get('http://localhost:1337/data').then(resp => {
      this.bineTypes = resp.data.typeBien;
    })
    Axios.get('http://localhost:1337/bien/').then(resp => {
      this.libelle = resp.data[0].libelle;
      this.type = resp.data[0].type;
      this.ville = resp.data[0].ville;
      this.Superficie = resp.data[0].Superficie;
      this.address = resp.data[0].address;
      this.ville = resp.data[0].ville;
      this.description = resp.data[0].description;
      this.etage = resp.data[0].etage;
      this.nb_piece = resp.data[0].nb_piece;
      this.valeur = resp.data[0].valeur;
      this.ancfcc = resp.data[0].ancfcc;
      this.Immeuble = resp.data[0].Immeuble;
      this.terrainType = resp.data[0].terrainType;
    });
  },
}
</script>