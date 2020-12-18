<template>
  <v-card>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-folder-outline</v-icon>
        Dossiers & Comptabilité
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="comptabilite"
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
            <v-col cols="12"><b>Description: </b>{{ item.description }}</v-col>
            <v-col cols="12">
              <div class="offset-9">
                <v-btn color="primary" nuxt :to="'./comptabilite/' + item.id"
                  >Consulter</v-btn
                >
                <!-- <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./comptabilite/modifier/' + item.id"
                  >Modifier</v-btn
                > -->
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
          value: 'id',
        },
        { text: 'Dossier', value: 'dossier' },
        { text: 'Description', value: 'description' },
        { text: '', value: 'data-table-expand' },
      ],
      comptabilite: [],
    }
  },

  created() {
    this.success = this.$route.query.success
    Axios.get('http://localhost:1337/comptabilite/').then(resp => {
      this.comptabilite = resp.data;
      console.log(resp.data);
    });
  },
}
</script>