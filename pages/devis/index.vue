<template>
  <v-card>
    <!-- Delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="650px">
      <v-card>
        <v-card-title class="headline">
          Êtes-vous sûr de bien vouloir supprimer ce devis?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogDelete = false"
            >Non</v-btn
          >
          <v-btn color="error darken-1" text @click="deleteItemConfirm"
            >Oui, Supprimer</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-cash</v-icon> Devis
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/devis/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter un devis</v-btn
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
                      <th class="text-left">Libelle</th>
                      <th class="text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="article in item.articles" :key="article.ref">
                      <td>SERV0{{ article.id }}</td>
                      <td>{{ article.libelle }}</td>
                      <td>{{ article.total }} DHS</td>
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
                  :href="`https://notaitre-api.herokuapp.com/${item.link}`"
                  :download="`https://notaitre-api.herokuapp.com/${item.link}`"
                  target="_blank"
                  >Telecharger</v-btn
                >
                <!-- <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./devis/modifier/' + item.id"
                  disabled
                  >Modifier</v-btn
                > -->
                <v-btn color="error lighten-1" @click="openDelete(item.id)"
                  >Suprimer</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      todelete: null,
      dialogDelete: false,
      search: "",
      expanded: [],
      headers: [
        {
          text: "ID",
          align: "start",
          filterable: false,
          value: "id"
        },
        { text: "maitre", value: "maitre" },
        { text: "Client", value: "client.nom" },
        { text: "Date validité de Devis", value: "dateDevis" },
        { text: "", value: "data-table-expand" }
      ],
      devis: []
    };
  },
  beforeCreate() {
    Axios.get("https://notaitre-api.herokuapp.com/devis").then(resp => {
      this.devis = resp.data;
      console.log(this.devis);
    });
  },
  methods: {
    openDelete(id) {
      this.todelete = id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      Axios.delete(`https://notaitre-api.herokuapp.com/devis/${this.todelete}`)
        .then(resp => {
          this.devis = this.devis.filter(fac => fac.id !== this.todelete);
          this.dialogDelete = false;
          this.todelete = null;
        })
        .catch(err => console.error(err));
    }
  }
};
</script>
<style lang="css">
b {
  color: dodgerblue;
  font-size: large;
}
</style>
