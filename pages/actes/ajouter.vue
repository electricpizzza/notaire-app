<template>
  <div>
    <div class="text-center">
      <h1>
        Ajouter Un Acte
        <span v-if="model"
          >de : <b>{{ model.libelle }}</b></span
        >
      </h1>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline lighten-2">
            Choisire un Model
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
            <v-btn color="primary" text @click="dialog = false">
              Choisire
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
import axios from 'axios'
export default {
  name: "AjouterActe",
  data() {
    return {
      model: null,
      dialog: this.model ? false : true,
      models: [],
    }
  },
  beforeCreate() {
    axios.get('http://localhost:1337/model').then(resp => {
      this.models = resp.data;
    })
  }
}
</script>