<template>
  <div class="pa-5">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <div class="text-center">
      <h1>
        Ajouter Un Acte
        <span v-if="model"
          >de : <b>{{ model.libelle }}</b></span
        >
      </h1>
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title class="headline lighten-2">
            Choisir un Model
          </v-card-title>

          <v-card-text>
            <v-select
              :items="models"
              v-model="model"
              label="Model"
              item-text="libelle"
              :item-value="model"
            ></v-select>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error lighten-1" text nuxt to="/actes">
              Anuller
            </v-btn>
            <v-btn color="primary" text @click="dialog = false">
              Choisir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-if="model">
      <Acteform :model="model" />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import model1 from "./../../assets/model1.json";
export default {
  name: "AjouterActe",
  data() {
    return {
      model: null,
      dialog: this.model ? false : true,
      models: [],
      snackbar: false,
      error: ""
    };
  },
  beforeCreate() {
    axios
      .get("https://notaitre-api.herokuapp.com/model")
      .then(resp => {
        this.models = resp.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  }
};
</script>
