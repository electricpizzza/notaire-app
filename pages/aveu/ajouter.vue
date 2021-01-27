<template>
  <div class="ma-10">
    <h1 class="px-10">Ajouter un Aveu</h1>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Ajouter un Aveu </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                :items="dossiers"
                outlined
                v-model="info.dossier"
                label="Dossier"
                item-text="libelle"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="models"
                v-model="info.model"
                item-text="titre"
                value="ref"
                label="Mdele"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="['Français', 'العربية']"
                v-model="info.lang"
                label="Langue"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn outlined color="primary" nuxt to="/aveu">Anuller</v-btn>
          <v-btn color="primary" @click="rediger">Rediger</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <form>
      <v-row>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <div class="d-flex justify-lg-space-around">
            <h4>Statue du déclarant :</h4>
            <h4>صفة صاحب الإقرار:</h4>
          </div>
          <div class="d-flex justify-lg-space-around">
            <v-checkbox v-model="status" label="John" value="John"></v-checkbox>
            <v-checkbox
              v-model="status"
              label="Jacob"
              value="Jacob"
            ></v-checkbox>
            <v-checkbox v-model="status" label="John" value="John"></v-checkbox>
          </div>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  data() {
    return {
      dialog: true,
      info: {
        lang: '',
        dossier: null,
        model: null,
      },
      models: [],
      dossiers: [],
      status: '',
      recu: [
        { annee: 2020, num: '', date: '' }
      ]

    }
  },
  created() {
    Axios.get('http://localhost:1337/data').then(resp => {
      this.models = resp.data.modelAveu;
    }).catch((err) => {

    });
    Axios.get('http://localhost:1337/dossiers').then(resp => {
      this.dossiers = resp.data;
    })
  },
  methods: {
    rediger() {
      if (this.info.lang !== '' && this.info.dossier !== null && this.info.model !== null) {
        this.dialog = false;
      }
    }
  },
}
</script>

<style lang="scss" scoped>

</style>