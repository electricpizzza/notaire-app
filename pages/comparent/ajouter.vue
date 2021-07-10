<template>
  <v-container>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <div v-if="comparent != null" class="mx-10 pa-10">
      <EntrepriseForm v-if="comparent.type === 'PM'" :comparent="comparent" />
      <PersonForm v-if="comparent.type === 'PP'" :comparent="comparent" />
      <MineurForm v-if="comparent.type === 'PPM'" :comparent="comparent" />
    </div>
  </v-container>
</template>
<script>
import Axios from "axios";
import ComparentService from "../../assets/sevices/comparentService.js";
const comparentService = new ComparentService();
export default {
  name: "Ajoter",
  data() {
    return {
      comparent: null,
      snackbar: false,
      error: ""
    };
  },
  created() {
    Axios.get(
      "https://notaitre-api.herokuapp.com/comparent/" + this.$route.query.id
    )
      .then(resp => {
        this.comparent = resp.data.comparent[0];
        console.log(resp.data.comparent[0]);
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  }
};
</script>
