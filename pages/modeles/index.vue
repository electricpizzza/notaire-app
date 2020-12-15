<template>
  <v-card>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-folder-outline</v-icon>
        Models
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/modeles/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter un model</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="modeles"
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
            <v-col cols="12" md="6"
              ><h1>
                <b>{{ item.libelle }}</b>
              </h1></v-col
            >
            <v-col>
              <div class="offset-7 ma-3">
                <v-btn color="primary" nuxt :to="'./modeles/' + item.id"
                  >Consulter</v-btn
                >
                <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./modeles/modifier/' + item.id"
                  disabled
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
import axios from 'axios'

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
        { text: 'type', value: 'type' },
        { text: 'Language', value: 'language' },
        { text: 'Redacteur', value: 'redacteur' },
        { text: '', value: 'data-table-expand' },
      ],
      modeles: [],
    }
  },
  beforeCreate() {
    axios.get('http://localhost:1337/model').then(resp => {
      this.modeles = resp.data;
    })
  },
  created() {
    this.success = this.$route.query.success
  },
}
</script>