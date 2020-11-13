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
            v-model="dossier"
            label="Dossier"
            item-text="libelle"
            :item-value="dossier"
          ></v-select>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="dialogDos = false"> Anuller </v-btn>
          <v-btn color="primary" text @click="dialogDos = false">
            Ouvrire
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
    <v-tabs v-model="tab" background-color="primary lighten-2" dark>
      <v-tab v-for="doc in docs" :key="doc.id">
        <v-icon left dark> mdi-folder </v-icon>
        {{ doc.title }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-btn
        fab
        color="#3860ff"
        dark
        top
        right
        absolute
        @click="dialogDos = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-tab-item v-for="doc in docs" :key="doc.id">
        <v-card color="basil" flat class="pa-2">
          <v-card-text>
            <v-btn
              elevation="2"
              icon
              small
              absolute
              right
              class="mt-3 mr-0"
              @click="closeTab(doc.id)"
            >
              <v-icon color="error"> mdi-close-circle </v-icon>
            </v-btn>
            <dossier class="ma-10" />
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
import _dossier from './dossiers/_dossier.vue';
export default {
  components: { DossierCard, _dossier },
  data: () => ({
    dossiers: [],
    dialogDos: false,
    tab: null,
    docs: [{ id: 0, title: "DOC 00" }, { id: 1, title: "DOC 01" }, { id: 2, title: "DOC 02" }, { id: 3, title: "DOC 03" }, { id: 4, title: "DOC 04" }]
  }),
  methods: {
    closeTab(id) {
      console.log(id);
      this.docs = this.docs.filter(doc => doc.id != id)
    }
  },
  created() {
    axios.get('http://localhost:1337/dossiers').then(resp => {
      console.log(resp);
      this.dossiers = resp.data
    })
  },
}
</script>