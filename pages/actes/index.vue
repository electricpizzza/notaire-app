<template>
  <v-card>
    <v-snackbar v-model="error" color="error lighten-1">
      {{ errorText }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="error = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-folder-outline</v-icon>
        Actes
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/actes/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter un Acte</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="actes"
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
            <v-col cols="12">
              <h1>
                <b>{{ item.libelle }}</b>
              </h1>
            </v-col>
            <v-col cols="12">
              <div class="d-flex justify-end ma-3">
                <v-btn color="primary" nuxt :to="'./actes/' + item.id"
                  >Consulter</v-btn
                >
                <!-- <v-btn
                  color="success lighten-1"
                  nuxt
                  :to="'./actes/modifier/' + item.id"
                  >Modifier</v-btn
                > -->
                <v-btn color="error lighten-1" @click="remove(item.id)"
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
import axios from "axios";

export default {
  data() {
    return {
      search: "",
      expanded: [],
      headers: [
        {
          text: "ID",
          align: "start",
          filterable: false,
          value: "id"
        },
        { text: "Libelle", value: "libelle" },
        { text: "Date de Redaction", value: "dateRedaction" },
        { text: "Redacteur", value: "redacteur" },
        { text: "", value: "data-table-expand" }
      ],
      actes: [],
      error: false,
      errorText: ""
    };
  },
  beforeCreate() {
    axios
      .get("http://localhost:1337/actes")
      .then(resp => {
        this.actes = resp.data;
      })
      .catch(err => {
        this.error = true;
        this.errorText = "veuillez verifier votre connexion !!";
      });
  },
  created() {
    this.success = this.$route.query.success;
  },
  methods: {
    remove(id) {
      axios
        .delete("http://localhost:1337/actes/" + id)
        .then(resp => {
          this.actes = this.actes.filter(acte => acte.id !== id);
        })
        .catch(err => {
          this.error = true;
          this.errorText = err + "veuillez verifier votre connexion !!";
        });
    }
  }
};
</script>
