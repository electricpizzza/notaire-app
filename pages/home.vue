<template>
  <v-card class="ma-0" min-height="80vh">
    <v-dialog v-model="dialogDos" width="500" persistent>
      <v-card>
        <v-card-title class="headline lighten-2">
          Choisire un Dossier
        </v-card-title>

        <v-card-text>
          <v-select
            :items="dossiers"
            v-model="toBeOpen"
            label="Dossier"
            item-text="libelle"
            item-value="id"
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="closeDialog"> Anuller </v-btn>
          <v-btn color="primary" text @click="openDoc"> Ouvrire </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-title class="text-center justify-center py-6">
      <img
        src="~/assets/logo.jpeg"
        alt="Logo"
        width="80px"
        height="80px"
        class="mx-3"
      />
      <h1 class="font-weight-bold basil--text" style="color: #193f70">
        Notary
      </h1>
    </v-card-title>
    <v-tabs v-model="tab" background-color="primary lighten-2" dark>
      <v-tab v-for="doc in docs" :key="doc.id">
        <v-icon left dark> mdi-folder </v-icon>
        {{ doc.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="workspace">
      <v-btn fab color="#3860ff" dark top right absolute @click="openDialog">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container v-if="docs.length === 0">
        <img
          src="~/assets/undraw_folder_39kl.svg"
          alt="Logo"
          width="100%"
          height="370vh"
          class="mx-3"
        />
        <v-btn color="#0092d6" dark class="open-btn" @click="openDialog"
          >Ouvrir un Dossier</v-btn
        >
      </v-container>
      <v-tab-item v-for="doc in docs" :key="doc.id">
        <v-card color="basil" flat class="pa-2">
          <v-card-text>
            <v-btn
              elevation="2"
              icon
              small
              absolute
              right
              style="z-index: 9999"
              class="mt-3 mr-0"
              @click="closeTab(doc.id)"
            >
              <v-icon color="error"> mdi-close-circle </v-icon>
              <v-tooltip bottom>
                <span>Fermer</span>
              </v-tooltip>
            </v-btn>
            <dossier class="ma-5" :dossier="doc" />
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
    <v-card-text class="text-center"> </v-card-text>
  </v-card>
</template>
<script>
import axios from 'axios'
import DossierCard from '~/components/dossiers/DossierCard.vue';
import dossierSotre from './../assets/store/dossierSotre'
import auth from './../assets/store/authStore'
export default {
  components: { DossierCard },
  // middleware: 'authentification',
  data: () => ({
    dossiers: [],
    dialogDos: false,
    tab: null,
    toBeOpen: null,
    docs: []
  }),
  methods: {
    closeTab(id) {
      this.docs = this.docs.filter(doc => doc.id != id)
      dossierSotre.closeDossier(id);
    },
    openDoc() {
      axios.get(`http://localhost:1337/dossiers/${this.toBeOpen}`).then(resp => {
        this.docs.push(resp.data)
        dossierSotre.addDossier(resp.data);
        this.toBeOpen = null;
        this.dialogDos = false;
      }).catch(err => console.error(err))
    },
    openDialog() {
      this.toBeOpen = null;
      this.dialogDos = true;
    },
    closeDialog() {
      this.toBeOpen = null;
      this.dialogDos = false;
    },


  },
  created() {
    // const usr = auth.user

    axios.get('http://localhost:1337/dossiers').then(resp => {
      this.dossiers = resp.data
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>
<style lang="css" scoped>
  .v-card{
    background-image: url('https://raw.githubusercontent.com/electricpizzza/BloodDonation/master/public/img/background.png');
  }
  .v-data-table {
    background: whitesmoke;
  }
  .open-btn{
    position:absolute;
    top: 250px;
    right: 41%;

  }
</style>