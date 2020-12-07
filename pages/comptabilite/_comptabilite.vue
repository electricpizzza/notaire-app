<template>
  <v-container>
    <v-card>
      <h1>Comptabiliée du dossier Hamid Idrissi</h1>
      <v-dialog v-model="dialog" width="500" persistent>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" class="offset-9" v-on="on">
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
                <v-text-field v-model="libelle" label="Libelle"></v-text-field>
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
                  :items="['Espece', 'Cheque', 'virment Banquaire']"
                  v-model="typePay"
                  label="Method de Payment"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="valeur" label="Valeur"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="[
                    { nom: 'ZAKARIA DINAR', id: 1 },
                    { nom: 'Hamid Idrissi', id: 2 },
                  ]"
                  v-model="typePay"
                  item-text="nom"
                  item-value="id"
                  label="Comparent"
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
      transactions: [
        {
          id: 1,
          comptabilite: 1,
          libelle: 'Frais Notaire',
          typeTrans: 'Entrée',
          typePay: 'Cheque',
          comparent: 1,
          valeur: 1129,
          dateTrans: '12-12-2020',
        },
        {
          id: 2,
          comptabilite: 1,
          libelle: 'ANCFCC',
          typeTrans: 'Entrée',
          typePay: 'Cheque',
          comparent: 1,
          valeur: 1129,
          dateTrans: '12-12-2020',
        },
        {
          id: 3,
          comptabilite: 1,
          libelle: 'ANCFCC',
          typeTrans: 'Sortie',
          typePay: 'Cheque',
          comparent: 1,
          valeur: 1129,
          dateTrans: '12-12-2020',
        },
        {
          id: 4,
          comptabilite: 1,
          libelle: 'Frais Notaire',
          typeTrans: 'Entrée',
          typePay: 'Cheque',
          comparent: 1,
          valeur: 1129,
          dateTrans: '12-12-2020',
        }
      ],
      libelle: '',
      typeTrans: '',
      typePay: '',
      comparent: null,
      valeur: null,
    }
  },
  created() {
    console.log(this.comp);

    Axios.get('http://localhost:1337/transaction/comptabilite/' + this.comp).then(resp => {
      console.log(resp.data);
      this.transactions = resp.data;
    }).catch(err => console.log(err));
  },
  methods: {
    ajouter() {

      this.transactions.push({
        comptabilite: this.comp,
        libelle: this.libelle,
        typeTrans: this.typeTrans,
        typePay: this.typePay,
        comparent: this.comp,
        valeur: this.valeur,
      });
      this.dialog = false;
      Axios.post('http://localhocst:1337/comptabilite/', {
        comptabilite: this.comp,
        libelle: this.libelle,
        typeTrans: this.typeTrans,
        typePay: this.typePay,
        comparent: this.comp,
        valeur: this.valeur,
      }).then(resp => {
        console.log(resp.data);
      }).catch(err => console.log(err));
    }
  },
}
</script>