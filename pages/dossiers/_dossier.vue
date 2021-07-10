<template>
  <div>
    <v-card class="ma-2">
      <dossier v-if="dossier" :dossier="dossier" />
    </v-card>
  </div>
</template>
<script>
import Axios from "axios";
import DossierService from "./../../assets/sevices/dossierService";
import Dossier from "~/components/dossiers/Dossier.vue";
const dossierService = new DossierService();
export default {
  components: { Dossier },
  async asyncData({ params }) {
    const doss = params.dossier;
    return { doss };
  },
  data() {
    return {
      dossier: null
    };
  },
  created() {
    Axios.get(`https://notaitre-api.herokuapp.com/dossiers/${this.doss}`).then(
      resp => {
        this.dossier = resp.data;
        console.log(this.dossier);
      }
    );
  }
};
</script>
