<template>
  <v-card class="mx-auto">
    <v-card-text class="text-left">
      <div>Doss0{{ dossier.id }}</div>
      <p class="display-1 text--primary text-capitalize">
        {{ dossier.libelle }}
      </p>
      <v-row class="text-capitalize ma-3">
        <v-col cols="12" md="6">
          <b>Nature Du dossier:</b> {{ dossier.nature }}
        </v-col>
        <v-col cols="12" md="6">
          <b>Notaire Du dossier:</b> {{ dossier.NomMaitre }}
        </v-col>
        <v-col cols="12" md="6">
          <b>date ouverture:</b> {{ dossier.dateOuverture }}
        </v-col>
        <v-col cols="12" md="6" v-if="dossier.dateFermeture">
          <b>date de Fermeture:</b> {{ dossier.dateFermeture }}
        </v-col>
        <v-col cols="12" md="6" v-else>
          <v-btn outline color="error" @click="fermerDossier" dark
            >Fermer Dossier</v-btn
          >
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
      <div class="text--primary">
        <v-card class="my-5">
          <v-card-title>
            <h2 style="color: #508bd7" class="mr-4 mt-2">Comparant(s):</h2>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn color="primary" dark fab icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headersComp"
            :items="comparents"
            :search="search"
          ></v-data-table>
        </v-card>
        <v-card class="my-5">
          <v-card-title>
            <h2 style="color: #508bd7" class="mr-4 mt-2">Bien(s):</h2>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn color="primary" dark fab icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headersBien"
            :items="biens"
            :search="search"
          ></v-data-table>
        </v-card>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col cols="12" md="8">
          <v-btn text color="teal accent-4" @click="reveal = true">
            Actes & Documents
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn
            color="success"
            class="ms-4"
            nuxt
            :to="`http://localhost:3000/dossiers/modifier/${dossier.id}`"
            >Modifier</v-btn
          >
          <v-btn color="error" class="ms-2" @click="deleteDossier"
            >Suprimer</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">Origin</p>
          <p>
            late 16th century (as a noun denoting a place where alms were
            distributed): from medieval Latin eleemosynarius, from late Latin
            eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
import ComparentService from './../../assets/sevices/comparentService'
import BienService from './../../assets/sevices/bienService'
import Axios from 'axios'
import dossierSotre from '~/assets/store/dossierSotre'

const comparentService = new ComparentService()
const bienService = new BienService()

export default {
  props: {
    dossier: {
      type: Object,
    }
  },
  data: () => ({
    reveal: false,
    search: '',
    dateFermeture: null,
    headersComp: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Type', value: 'type' },
      { text: 'Nom / Raison Social', value: 'nom' },
      { text: 'Date Ajout', value: 'dateAjout' },
    ],
    headersBien: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Libelle', value: 'libelle' },
      { text: 'Type', value: 'type' },
      { text: 'Ville', value: 'ville' },
      { text: '', value: 'data-table-expand' },
    ],
    comparents: [],
    biens: [],
  }),
  created() {
    const comps = JSON.parse(this.dossier.comparents);
    const lesBiens = JSON.parse(this.dossier.bien);
    comps.forEach(comparent => {
      comparentService.getOneComparent(comparent).then(resp => {
        this.comparents.push(resp.data.comparent[0])
      }).catch(err => console.log(err))
    });

    // lesBiens.forEach(bien => {
    //   bienService.getOneBien(bien).then(resp => {
    //     console.log(resp);
    //     this.biens.push(resp.data)
    //   })
    // });

    bienService.getAllBiens(resp => {
      this.biens = resp.data;
    })
  },

  methods: {
    fermerDossier() {
      Axios.put(`http://localhost:1337/dossiers/close/${this.dossier.id}`).then(resp => {
        console.log(resp);
        const today = new Date()
        this.dossier.dateFermeture = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`
      }).catch(err => console.error(err))
    }
  },
  deleteDossier() {
    Axios.delete(`http://localhost:13f37/dossiers/${this.dossier.id}`).then(resp => {
      dossierSotre.deleteDossier(this.dossier.id)
    }).catch(err => console.error(err))
  }

}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>