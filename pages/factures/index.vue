<template>
  <v-card>
    <!-- Delete dialog -->
    <v-dialog v-model="dialogDelete" max-width="650px">
      <v-card>
        <v-card-title class="headline">
          Êtes-vous sûr de bien vouloir supprimer cette facture?
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
                  :href="`http://localhost:1337/${item.link}`"
                  :download="`http://localhost:1337/${item.link}`"
                  target="_blank"
                  >Telecharger</v-btn
                >
                <!-- <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./factures/modifier/' + item.id"
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
      dialogDelete: false,
      search: "",
      expanded: [],
      todelete: null,
      headers: [
        {
          text: "ID",
          align: "start",
          value: "id"
        },
        { text: "maitre", value: "maitre" },
        { text: "Date de création", value: "dateFacture" },
        { text: "", value: "data-table-expand" }
      ],
      factures: []
    };
  },
  beforeCreate() {
    Axios.get("http://localhost:1337/facture").then(resp => {
      this.factures = resp.data;
      console.log(this.factures);
    });
  },
  methods: {
    openDelete(id) {
      this.todelete = id;
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      Axios.delete(`http://localhost:1337/facture/${this.todelete}`)
        .then(resp => {
          this.factures = this.factures.filter(fac => fac.id !== this.todelete);
          this.dialogDelete = false;
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
