<template>
  <v-card>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-cash</v-icon> Factures
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/factures/ajouter">
        <v-icon>mdi-plus</v-icon> Ajouter un factures
      </v-btn>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="factures"
      :expanded.sync="expanded"
      single-expand="true"
      :search="search"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="mx-4">
            <v-col cols="12"
              ><b>Client: </b>{{ item.client.nom }}, Habite á
              {{ item.client.address }}</v-col
            >

            <v-col cols="12">
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Ref</th>
                      <th class="text-left">Description</th>
                      <th class="text-left">Remise</th>
                      <th class="text-left">Tva</th>
                      <th class="text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="article in item.articles" :key="article.ref">
                      <td>{{ article.ref }}</td>
                      <td>{{ article.description }}</td>
                      <td>{{ article.remise }}</td>
                      <td>{{ article.tva }}</td>
                      <td>{{ article.total }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
            <v-col cols="12" class="px-4 text-right"
              ><b>Total TTC: </b>{{ item.total }} DHS</v-col
            >
            <v-col cols="12">
              <div class="offset-7">
                <v-btn
                  color="primary"
                  dark
                  href="http://localhost:1337/uploads/factures/facture-RKLSD12-8-12-2020.pdf"
                  download="facture-RKLSD12-7-12-2020.pdf"
                  target="_blank"
                  >Telecharger</v-btn
                >
                <v-btn
                  color="success"
                  nuxt
                  :to="'./factures/modifier/' + item.id"
                  disabled
                  >Modifier</v-btn
                >
                <v-btn color="error">Suprimer</v-btn>
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
        { text: 'maitre', value: 'maitre' },
        { text: 'Date validité de factures', value: 'datefactures' },
        { text: '', value: 'data-table-expand' },
      ],
      factures: [],
    }
  },
  beforeCreate() {
    Axios.get('http://localhost:1337/facture').then(resp => {
      this.factures = resp.data;
      console.log(this.factures);
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