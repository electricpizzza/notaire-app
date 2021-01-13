<template>
  <div>
    <v-card>
      <v-card-media src="src" height="200px"> </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0 text-primary">Créer Une Factutre</h3>
          <div>Selection des services :</div>
        </div>
      </v-card-title>
      <v-card-text style="min-height: 65vh">
        <v-row>
          <v-col
            class="flex justify-center"
            cols="6"
            v-for="service in services"
            :key="service.id"
          >
            <v-checkbox
              :label="service.libelle"
              v-model="servicesChoix"
              :value="service"
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="flex justify-space-around">
        <v-btn color="primary" nuxt to="/devis">
          <v-icon>mdi-chevron-left</v-icon> Retour
        </v-btn>
        <v-btn flat color="primary" @click="continuer">
          Continuer <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
import Axios from 'axios'
import comptabiliteStore from './../../../assets/store/comptabiliteStore'
export default {
  data() {
    return {
      services: [],
      servicesChoix: []
    }
  },
  created() {
    Axios.get('http://localhost:1337/service').then(resp => {
      this.services = resp.data;
    }).catch(err => console.log(err));
  },
  methods: {
    continuer() {
      comptabiliteStore.services = this.servicesChoix;
      this.$router.push('/factures/ajouter/terminer')
    }
  },
}
</script>