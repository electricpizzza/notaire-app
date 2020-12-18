<template>
  <v-card>
    <v-snackbar v-model="snackbar" color="success lighten-1" top timeout="5000">
      {{ success }}

      <template v-slot:action="{ attrs }">
        <v-btn icon fav small v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-folder-outline</v-icon>
        Dossiers
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/dossiers/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter un dossier</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="dossiers"
      :expanded.sync="expanded"
      :single-expand="true"
      :search="search"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="mx-4">
            <v-col cols="12" md="6"> <b>Titre: </b>{{ item.title }} </v-col>
            <v-col cols="12" md="6"><b>Libelle: </b>{{ item.libelle }}</v-col>
            <v-col cols="12" md="6"><b>Nature: </b>{{ item.nature }}</v-col>
            <v-col cols="12" md="6"><b>Maitre: </b>{{ item.NomMaitre }}</v-col>
            <v-col cols="12"><b>Description: </b>{{ item.description }}</v-col>
            <v-col cols="12">
              <div class="offset-7">
                <v-btn color="primary" nuxt :to="'./dossiers/' + item.id"
                  >Consulter</v-btn
                >
                <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./dossiers/modifier/' + item.id"
                  >Modifier</v-btn
                >
                <v-btn color="error lighten-1">Suprimer</v-btn>
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Axios from 'axios'
import DossierService from './../../assets/sevices/dossierService.js'
const dossierService = new DossierService()

export default {
  data() {
    return {
      search: '',
      expanded: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'identifiant',
        },
        { text: 'Titre', value: 'title' },
        { text: 'Nature', value: 'nature' },
        { text: 'Maitre', value: 'NomMaitre' },
        { text: '', value: 'data-table-expand' },
      ],
      dossiers: [],
      snackbar: false,
    }
  },

  created() {
    this.success = this.$route.query.success;
    if (this.success != null) {
      this.snackbar = true;
    }
    Axios.get('http://localhost:1337/dossiers').then(resp => {
      this.dossiers = resp.data;
      console.log(resp.data);
    })
  },
}
</script>