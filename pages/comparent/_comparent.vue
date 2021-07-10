<template>
  <v-container>
    <h1>mod</h1>
    <div v-if="comparent != null" class="mx-10 pa-10">
      <EntrepriseForm v-if="comparent.type === 'PM'" :comparent="comparent" />
      <PersonForm v-if="comparent.type === 'PP'" :comparent="comparent" />
      <MineurForm v-if="comparent.type === 'PPM'" :comparent="comparent" />
    </div>
    <v-btn color="primary" dark @click="comparent = { type: 'PM' }"></v-btn>
  </v-container>
</template>
<script>
import Axios from "axios";
import ComparentService from "../../assets/sevices/comparentService.js";
const comparentService = new ComparentService();
export default {
  name: "Modifier",
  async asyncData({ params }) {
    const id = params.comparent;
    return { id };
  },
  data() {
    return {
      comparent: null
    };
  },
  created() {
    console.log("this.id");
    Axios.get("https://notaitre-api.herokuapp.com/comparent/" + this.id)
      .then(resp => {
        this.comparent = resp.data.comparent[0];
        console.log(resp.data.comparent[0]);
      })
      .catch(err => {
        console.log("this error : ", err);
      });
  }
};
</script>
