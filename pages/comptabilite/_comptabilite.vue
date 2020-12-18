<template>
  <v-container>
    <v-overlay :value="loading">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card>
      <h1 style="color: #295075; padding: 30px">
        Comptabiliée du dossier Hamid Idrissi
      </h1>
      <div class="d-flex justify-space-between">
        <v-btn color="primary" nuxt to="/comptabilite">
          <v-icon>mdi-chevron-left</v-icon> Retour
        </v-btn>
        <v-dialog v-model="dialog" width="500" persistent>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              Ajouter Une Transaction
            </v-btn>
          </template>

          <v-card>
            <v-card-title class="headline grey lighten-2">
              Ajouter Une Transaction
            </v-card-title>

            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="libelle"
                    label="Libelle"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="['Entrée', 'Sortie']"
                    v-model="typeTrans"
                    label="Type de Transaction"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="[
                      { label: 'Espece', value: 'Espece' },
                      { label: 'Cheque', value: 'Cheque' },
                      { label: 'Virment Bancaire', value: 'Virment' },
                    ]"
                    item-text="label"
                    item-value="value"
                    v-model="typePay"
                    label="Method de Payment"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field v-model="valeur" label="Valeur"></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="comparentList"
                    v-model="comparents"
                    item-text="nom"
                    item-value="id"
                    label="Comparant"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="pink" text @click="dialog = false"> Annuler </v-btn>
              <v-btn color="primary" text @click="ajouter"> Ajouter </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card>
    <v-card>
      <v-card-text class="py-0">
        <v-row>
          <v-col cols="12" sm="6">
            <h3 class="text-center ma-5" style="color: #17a66d">
              Tableaux des transactions Entrées
            </h3>
            <v-data-table
              :headers="headers"
              :items="transactions.filter((tr) => tr.typeTrans === 'Entrée')"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-col>
          <v-col cols="12" sm="6">
            <h3 class="text-center ma-5" style="color: #ff3d71">
              Tableaux des transactions Sorties
            </h3>
            <v-data-table
              :headers="headers"
              :items="transactions.filter((tr) => tr.typeTrans === 'Sortie')"
              item-key="name"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import Axios from 'axios'
export default {
  async asyncData({ params }) {
    const comp = params.comptabilite;
    return { comp }
  },
  data() {
    return {
      dialog: false,
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'libelle', value: 'libelle' },
        { text: 'typePay', value: 'typePay' },
        { text: 'valeur (DHS)', value: 'valeur' },
        { text: 'Date de Transaction', value: 'dateTrans' },
      ],
      transactions: [],
      libelle: '',
      typeTrans: '',
      typePay: '',
      comparent: null,
      valeur: null,
      comparentList: [],
      comparents: '',
      error: '',
      loading: false,
      snackbar: false,
    }
  },
  created() {
    Axios.get('http://localhost:1337/transaction/comptabilite/' + this.comp).then(resp => {
      this.transactions = resp.data;
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
    Axios.get('http://localhost:1337/dossiers/' + this.comp).then(resp => {
      JSON.parse(resp.data.comparents).forEach(element => {
        Axios.get('http://localhost:1337/comparent/' + element).then(c => {
          this.comparentList.push(c.data.comparent[0]);
          console.log(this.comparentList);
        }).catch((err) => {
          this.error = err;
          this.snackbar = true;
        });
      });
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
  },
  methods: {
    ajouter() {
      this.dialog = false;
      this.loading = false;
      Axios.post('http://localhost:1337/transaction/', {
        comptabilite: this.comp,
        libelle: this.libelle,
        typeTrans: this.typeTrans,
        typePay: this.typePay,
        comparent: this.comparents,
        valeur: this.valeur,
      }).then(resp => {
        const today = new Date();
        this.transactions.push({
          id: resp.data.identifiers[0].id,
          comptabilite: this.comp,
          libelle: this.libelle,
          typeTrans: this.typeTrans,
          typePay: this.typePay,
          comparent: this.comp,
          valeur: this.valeur,
          dateTrans: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        });
      }).catch((err) => {
        this.loading = false;
        this.error = err;
        this.snackbar = true;
      });
    }
  },
}
</script>