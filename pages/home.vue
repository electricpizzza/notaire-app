<template>
  <v-card class="ma-0" min-height="80vh">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-dialog v-model="dialogDos" width="700" persistent>
      <v-card>
        <v-card-title class="headline lighten-2">
          Choisir un Dossier
        </v-card-title>
        <v-card-text>
          <v-row v-if="dossiers.length === 0">
            <v-col cols="4" class="pa-3">
              <v-text-field
                v-model="dossierSearch"
                label="N˚ Dossier"
                prepend-icon="mdi-folder-outline"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pa-3">
              <v-text-field
                v-model="compSearch"
                prepend-icon="mdi-account-outline"
                label="Nom de Comparant"
              ></v-text-field>
            </v-col>
            <v-col cols="4" class="pa-3">
              <v-text-field
                v-model="bienSearch"
                prepend-icon="mdi-domain"
                label="Titre foncier"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-card
                v-for="dossier in dossiers"
                :key="dossier.id"
                class="mx-15"
              >
                <v-checkbox
                  :label="dossier.libelle"
                  v-model="selected"
                  :value="dossier"
                ></v-checkbox>
                <h3 class="pa-5">
                  <v-icon large color="primary">mdi-folder-outline</v-icon>
                  {{ dossier.libelle }}
                </h3>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-progress-circular
            v-if="loading"
            indeterminate
            color="primary"
          ></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn color="error lighten-1" outlined @click="closeDialog">
            Anuller
          </v-btn>
          <v-btn
            v-if="dossiers.length === 0"
            outlined
            color="primary"
            @click="rechercher"
            :disabled="
              bienSearch === '' && compSearch === '' && dossierSearch === ''
            "
          >
            <v-icon>mdi-magnify</v-icon> Rechercher
          </v-btn>
          <v-btn v-else color="primary" outlined @click="openDoc">
            <v-icon fab>mdi-plus</v-icon> Ouvrir Dossier(s)
          </v-btn>
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
    <!-- <v-card-title class="py-6 px-12">
      <v-row v-if="dossiers.length === 0">
        <v-col cols="4" class="pa-3">
          <v-text-field
            v-model="dossierSearch"
            label="N˚ Dossier"
            prepend-icon="mdi-folder-outline"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pa-3">
          <v-text-field
            v-model="compSearch"
            prepend-icon="mdi-account-outline"
            label="Nom de Comparant"
          ></v-text-field>
        </v-col>
        <v-col cols="4" class="pa-3">
          <v-text-field
            v-model="bienSearch"
            prepend-icon="mdi-domain"
            label="Titre foncier"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            outlined
            color="primary"
            @click="rechercher"
            :disabled="
              bienSearch === '' && compSearch === '' && dossierSearch === ''
            "
          >
            <v-icon>mdi-magnify</v-icon> Rechercher
          </v-btn>
        </v-col>
      </v-row>
      <v-row v-else>
        <v-col cols="12">
          <v-card v-for="dossier in dossiers" :key="dossier.id" class="mx-15">
            <v-checkbox
              :label="dossier.libelle"
              v-model="selected"
              :value="dossier"
            ></v-checkbox>
            <h3 class="pa-5">
              <v-icon large color="primary">mdi-folder-outline</v-icon>
              {{ dossier.libelle }}
            </h3>
          </v-card>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn outlined color="primary" class="mx-12" @click="openDoc">
              <v-icon fab>mdi-plus</v-icon> Ouvrir Dossier(s)
            </v-btn>
          </v-col>
        </v-col>
      </v-row>
    </v-card-title> -->
    <v-tabs v-model="tab" background-color="primary lighten-2" dark>
      <v-tab v-for="doc in docs" :key="doc.id">
        <v-icon left dark> mdi-folder </v-icon>
        {{ doc.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab" class="workspace">
      <v-btn fab color="#3860ff" dark top right absolute @click="openDialog">
        <v-icon>mdi-magnify</v-icon>
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
        <v-card color="basil" text class="pa-2">
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
              <v-icon color="error lighten-1"> mdi-close-circle </v-icon>
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
    singleSelect: false,
    selected: [],
    docs: [],
    dossierSearch: '',
    compSearch: '',
    bienSearch: '',
    loading: false,
    snackbar: false,
    error: '',
  }),
  methods: {
    closeTab(id) {
      this.docs = this.docs.filter(doc => doc.id != id)
      dossierSotre.closeDossier(id);
    },
    openDoc() {
      this.docs.push(...this.selected)
      dossierSotre.addDossier(...this.selected);
      this.toBeOpen = null;
      this.dialogDos = false;
      this.dossiers = [];
    },
    openDialog() {
      this.toBeOpen = null;
      this.dialogDos = true;
    },
    closeDialog() {
      this.toBeOpen = null;
      this.dialogDos = false;
      this.dossiers = [];
    },
    rechercher() {
      this.loading = true;
      axios.get(`http://localhost:1337/dossiers?dossier=${this.dossierSearch}&comp=${this.compSearch}&bien=${this.bienSearch}`).then(resp => {
        console.log(resp.data);
        if (resp.data.length !== undefined) {
          this.dossiers = resp.data;
        } else {
          this.docs.push(resp.data)
          this.closeDialog();
          dossierSotre.addDossier(resp.data);
        }
        this.loading = false;
        this.dossierSearch = '';
        this.bienSearch = '';
        this.compSearch = '';
      }).catch(err => {
        console.log(err);
        this.loading = false;
        this.snackbar = true;
        this.error = "Aucun dossier n'est trouvé avec ces coordonnes";
        this.dossierSearch = '';
        this.bienSearch = '';
        this.compSearch = '';
        this.closeDialog();
      })
    }

  },
  created() {
    // const usr = auth.user
    console.log(dossierSotre);
    this.docs = dossierSotre.data.dossiers;
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