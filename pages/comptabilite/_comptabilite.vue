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
        Comptabilié du Dossier: {{ titre }}
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
                  <v-select
                    :items="services"
                    v-model="service.id"
                    label="Services"
                    item-text="libelle"
                    item-value="id"
                  ></v-select>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                  <v-select
                    :items="['Entrée', 'Sortie']"
                    v-model="typeTrans"
                    label="Type de Transaction"
                  ></v-select>
                </v-col> -->
                <v-col cols="12" sm="6">
                  <v-select
                    :items="[
                      { label: 'Espece', value: 'Espece' },
                      { label: 'Chèque', value: 'Cheque' },
                    ]"
                    item-text="label"
                    item-value="value"
                    v-model="typePay"
                    label="Mode de paiement"
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
                <v-col cols="12" md="6" v-if="typePay === 'Cheque'">
                  <v-text-field
                    v-model="numCheque"
                    label="Chèque N˚"
                  ></v-text-field>
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
      <!-- <v-card-text class="py-0">
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
      </v-card-text> -->
      <v-card-text class="py-3">
        <v-simple-table fixed-header height="420px" dense>
          <template v-slot:default>
            <thead>
              <tr class="text-center">
                <th class="text-center" rowspan="2">Date</th>
                <th class="text-center" rowspan="2">Libelle</th>
                <th class="text-center" colspan="3">Etude</th>
                <th class="text-center" colspan="3">Client</th>
              </tr>
              <tr>
                <th>Recette</th>
                <th>Dépense</th>
                <th>Solde</th>
                <th>Recette</th>
                <th>Dépense</th>
                <th>Solde</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="trans in transactions" :key="trans.id">
                <td>{{ trans.dateTrans }}</td>
                <td class="d-flex justify-lg-space-between">
                  {{ trans.libelle }}
                  <v-btn
                    v-if="trans.service.type === 'recette'"
                    icon
                    small
                    color="primary"
                    @click="printRecu(trans.id)"
                    ><v-icon>mdi-file-document</v-icon></v-btn
                  >
                </td>
                <td v-if="trans.service.partie === 'etude'">
                  {{ trans.service.type === "recette" ? trans.valeur : "" }}
                </td>
                <td v-else></td>
                <td v-if="trans.service.partie === 'etude'">
                  {{ trans.service.type === "depense" ? trans.valeur : "" }}
                </td>
                <td v-else></td>
                <td v-if="trans.service.partie === 'etude'">
                  {{
                    trans.service.type === "depense"
                      ? -trans.valeur
                      : trans.valeur
                  }}
                </td>
                <td v-else></td>
                <td v-if="trans.service.partie === 'client'">
                  {{ trans.service.type === "recette" ? trans.valeur : "" }}
                </td>
                <td v-else></td>
                <td v-if="trans.service.partie === 'client'">
                  {{ trans.service.type === "depense" ? trans.valeur : "" }}
                </td>
                <td v-else></td>
                <td v-if="trans.service.partie === 'client'">
                  {{
                    trans.service.type === "depense"
                      ? -trans.valeur
                      : trans.valeur
                  }}
                </td>
                <td v-else></td>
              </tr>
              <tr>
                <td></td>
                <td>TVA</td>
                <td></td>
                <td>{{ tva }}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td class="bordered">{{ totalEtudeRecette }} DHs</td>
                <td class="bordered">{{ totalEtudeDepense }} DHs</td>
                <td class="bordered">
                  {{ totalEtudeRecette - totalEtudeDepense }} DHs
                </td>
                <td class="bordered">{{ totalClientRecette }} DHs</td>
                <td class="bordered">{{ totalClientDepense }} DHs</td>
                <td class="bordered">
                  {{ totalClientRecette - totalClientDepense }} DHs
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card-text>
    </v-card>
    <v-dialog
      v-model="recuDialog"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> Imprimer le Reçu </v-card-title>
        <v-card-text> </v-card-text>
        <v-card-actions class="d-flex justify-lg-space-around">
          <v-btn color="primary" @click="recuDialog = false">Anuller</v-btn>
          <v-btn
            color="primary"
            :href="recuLink"
            target="_blank"
            @click="recuDialog = false"
            >Imprimer le Reçu</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      service: {},
      libelle: '',
      typeTrans: '',
      typePay: '',
      numCheque: '',
      comparent: null,
      valeur: null,
      comparentList: [],
      comparents: '',
      error: '',
      loading: false,
      snackbar: false,
      services: [],
      totalEtudeRecette: 0,
      totalEtudeDepense: 0,
      totalClientRecette: 0,
      totalClientDepense: 0,
      tva: 0,
      recuDialog: false,
      recuLink: '',
      titre: '',
    }
  },
  created() {
    Axios.get('http://localhost:1337/transaction/comptabilite/' + this.comp).then(resp => {
      this.transactions = resp.data;
      const transetude = resp.data.filter(trans => trans.service.partie === 'etude');
      const transClient = resp.data.filter(trans => trans.service.partie === 'client');

      transetude.forEach(trans => {
        if (trans.service.type === 'recette')
          this.totalEtudeRecette += trans.valeur;
        if (trans.service.type === 'depense') {
          this.tva += (trans.valeur * trans.service.tva) / 100;
          this.totalEtudeDepense += trans.valeur;
        }
      });

      transClient.forEach(trans => {
        if (trans.service.type === 'recette')
          this.totalClientRecette += trans.valeur;
        if (trans.service.type === 'depense')
          this.totalClientDepense += trans.valeur;
      });
      this.totalEtudeDepense += this.tva;
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
    Axios.get('http://localhost:1337/dossiers/' + this.comp).then(resp => {
      this.titre = resp.data.identifiant + " / " + resp.data.libelle
      JSON.parse(resp.data.comparents).forEach(element => {
        Axios.get('http://localhost:1337/comparent/' + element).then(c => {
          this.comparentList.push(c.data.comparent[0]);
        }).catch((err) => {
          this.error = err;
          this.snackbar = true;
        });
      });
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
    Axios.get('http://localhost:1337/service').then(resp => {
      this.services = resp.data;
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
  },
  methods: {
    ajouter() {
      this.dialog = false;
      this.loading = true;
      this.service = this.services.find(ser => ser.id === this.service.id);
      Axios.post('http://localhost:1337/transaction/', {
        comptabilite: this.comp,
        libelle: this.service.libelle,
        typeTrans: this.typeTrans,
        typePay: this.typePay,
        comparent: this.comparents,
        valeur: this.valeur,
        numCheque: this.numCheque,
        service: this.service,
      }).then(resp => {
        if (resp.data.recu !== null) {
          this.recuDialog = true;
          this.recuLink = `http://localhost:1337/${resp.data.recu}`;

        }
        const today = new Date();
        this.transactions.push({
          id: resp.data.transaction.identifiers[0].id,
          comptabilite: this.comp,
          libelle: this.service.libelle,
          typeTrans: this.typeTrans,
          typePay: this.typePay,
          comparent: this.comp,
          valeur: this.valeur,
          service: this.service,
          dateTrans: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
        });
        //this.calcule();
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.error = err;
        this.snackbar = true;
      });
    },
    printRecu(id) {
      const trans = this.transactions.find(tra => tra.id === id);
      this.loading = true;
      Axios.post('http://localhost:1337/recu', {
        somme: trans.valeur,
        libelle: trans.libelle,
        dateTrans: trans.dateTrans,
        client: trans.comparent
      }).then(resp => {
        console.log(resp.data);
        this.loading = false;
        this.recuDialog = true;
        this.recuLink = `http://localhost:1337/${resp.data}`;
      }).catch((err) => {
        this.loading = false;
        this.error = err;
        this.snackbar = true;
      });
    },
    calcule() {
      const transetude = resp.data.filter(trans => trans.service.partie === 'etude');
      const transClient = resp.data.filter(trans => trans.service.partie === 'client');

      transetude.forEach(trans => {
        if (trans.service.type === 'recette')
          this.totalEtudeRecette += trans.valeur;
        if (trans.service.type === 'depense') {
          this.tva += (trans.valeur * trans.service.tva) / 100;
          this.totalEtudeDepense += trans.valeur;
        }
      });

      transClient.forEach(trans => {
        if (trans.service.type === 'recette')
          this.totalClientRecette += trans.valeur;
        if (trans.service.type === 'depense')
          this.totalClientDepense += trans.valeur;
      });
      this.totalEtudeDepense += this.tva;
    }
  },

}
</script>
<style scoped>
  th{
    text-transform: uppercase;
    border: 1px solid black;
  }
  thead{
    border: 1px solid black;
  }
  td{
    border-left: 1px solid black;
    border-right: 1px solid black;
  }
  .bordered, table{
    border: 1px solid black;
  }
</style>