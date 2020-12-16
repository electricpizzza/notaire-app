<template>
  <v-card>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-domain</v-icon> devis
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/devis/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter un bien</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="devis"
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
            <v-col cols="12" md="6"><b>Libelle: </b>{{ item.libelle }}</v-col>
            <v-col cols="12" md="6"><b>Type: </b>{{ item.type }}</v-col>
            <v-col cols="12" md="6">
              <b>Superfacie: </b>{{ item.Superficie }}
            </v-col>
            <v-col cols="12" md="6"><b>ANCFCC: </b>{{ item.ancfcc }}</v-col>
            <v-col cols="12"
              ><b>Address: </b>{{ item.address }}, {{ item.ville }}</v-col
            >
            <v-col cols="12"><b>Description: </b>{{ item.description }}</v-col>
            <v-col cols="12" md="6"><b>Valeur: </b>{{ item.valeur }} DHS</v-col>
            <v-col cols="12" md="6">
              <b>NB. Pieces: </b>{{ item.nb_piece }}
            </v-col>
            <v-col cols="12">
              <div class="offset-9">
                <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./devis/modifier/' + item.id"
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
        { text: 'Libelle', value: 'libelle' },
        { text: 'Type', value: 'type' },
        { text: 'Ville', value: 'ville' },
        { text: '', value: 'data-table-expand' },
      ],
      devis: [],
    }
  },
  beforeCreate() {
    Axios.get('http://localhost:1337/bien').then(resp => {
      this.devis = resp.data;

    })
  },
}
</script>
<style lang="css">
  b{
    color: dodgerblue;
    font-size: large;
  }
</style>