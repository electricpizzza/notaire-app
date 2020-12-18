<template>
  <div class="ma-10">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-row>
      <v-col cols="12">
        <h1>Nouveau Devis</h1>
      </v-col>
      <v-col cols="6" ms="12">
        <div>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="dateDevis"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateDevis"
                label="Date Validiter de Devis"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="dateDevis" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(dateDevis)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <div>
          <v-text-field
            v-model="termes"
            prepend-icon="mdi-pencil"
            label="Termes & Condition"
            id="id"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="maitre"
            prepend-icon="mdi-glasses"
            label="Maitre"
            id="id"
          ></v-text-field>
        </div>
        <div>
          <v-select
            :items="['Espece', 'Cheque', 'Virment']"
            v-model="payment"
            label="Mode de Payment"
            prepend-icon="mdi-cash-multiple"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="6" ms="12" class="mt-5">
        <div>
          <v-text-field
            v-model="reference"
            prepend-icon="mdi-identification"
            label="Reference"
          ></v-text-field>
        </div>
        <v-dialog v-model="dialogComp" width="500">
          <v-card>
            <v-card-title class="headline grey lighten-2">
              Client
            </v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nom / Raison Sociale"
                    v-model="client.nom"
                    prepend-icon="mdi-account"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Adresse"
                    prepend-icon="mdi-map"
                    v-model="client.address"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="dialogComp = false">
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-sheet elevation="10" rounded="xl">
          <v-sheet class="pa-3 primary" dark rounded="t-xl">
            <v-row>
              <v-col cols="9">
                <h3>
                  <v-icon>mdi-account-outline</v-icon>
                  Client
                </h3>
              </v-col>
              <v-col cols="3" class="text-right">
                <v-btn disabled icon>
                  <v-icon>mdi-account-outline</v-icon>
                </v-btn>
                <v-btn class="ml-2" icon @click="dialogComp = true">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-sheet>

          <div class="pa-4">
            <v-simple-table rounded="t-xl">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Nom / Raison Sociale du Clien</th>
                    <th class="text-left">Adress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{{ client.nom }}</td>
                    <td>{{ client.address }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </v-sheet>
      </v-col>
      <v-col cols="12" v-for="article in articles" :key="article.index">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Réf.</th>
                <th class="text-left">Description</th>
                <th class="text-left">Qté.</th>
                <th class="text-left">PU.</th>
                <th class="text-left">Remise</th>
                <th class="text-left">%T.V.A.</th>
                <th class="text-left">Total</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <v-text-field
                    name="ref"
                    @change="calTotal(article.index)"
                    v-model="article.ref"
                    style="width: 50px"
                  ></v-text-field>
                </td>
                <td rowspan="2">
                  <v-textarea
                    name="description"
                    @change="calTotal(article.index)"
                    v-model="article.description"
                    label="Description"
                  ></v-textarea>
                </td>
                <td>
                  <v-text-field
                    name="qte"
                    @change="calTotal(article.index)"
                    v-model="article.qte"
                    style="width: 50px"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    name="pu"
                    @change="calTotal(article.index)"
                    style="width: 50px"
                    v-model="article.pu"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    name="remise"
                    @change="calTotal(article.index)"
                    v-model="article.remise"
                    style="width: 50px"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field
                    name="tva"
                    @change="calTotal(article.index)"
                    v-model="article.tva"
                    style="width: 50px"
                  ></v-text-field>
                </td>
                <td>{{ article.total }} Dhs</td>
                <td>
                  <v-btn
                    outlined
                    color="error lighten-1"
                    x-small
                    dark
                    icon
                    fab
                    @click="removeRow(article.index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td colspan="6">
                  <v-select
                    :items="items"
                    v-model="article.class"
                    label="Classifiacation"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="8" ms="12">
        <v-btn text color="primary" small @click="addRow">
          <v-icon>mdi-plus</v-icon> Ajouter Une Ligne
        </v-btn>
      </v-col>
      <v-col cols="4" ms="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Remise Global:</th>
                <th class="text-left d-inline">
                  <v-text-field v-model="remisG"></v-text-field>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total H.T.</td>
                <td class="text-right">{{ total }} HDS</td>
              </tr>
              <tr>
                <td>Total TTC</td>
                <td class="text-right">
                  {{ total - remisG + (total - remisG) * 0.2 }} HDS
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="12">
        <v-btn class="offset-10 mt-7" color="primary" dark @click="enregistrer"
          >Enregistrer</v-btn
        >
      </v-col>
    </v-row>
  </div>
</template>
<script>
import Axios from 'axios';
import DevisStore from '~/assets/store/devisStore'
export default {
  data() {
    return {
      dateDevis: new Date().toISOString().substr(0, 0),
      termes: '',
      Comparant: null,
      search: '',
      dialogComp: false,
      total: 0,
      remisG: 0,
      maitre: '',
      payment: '',
      reference: '',
      snackbar: false,
      error: '',
      client: { nom: '', address: '' },
      articles: [
        { index: 0, ref: '', description: '', remise: 0, qte: 0, pu: 0, tva: 0, total: 0, class: '' }
      ],
    }
  },
  methods: {
    addRow() {
      const row = { index: this.articles.length, ref: '', description: '', remise: 0, qte: 0, pu: 0, tva: 0, total: 0, class: '' };
      this.articles.push(row)
    },
    removeRow(index) {
      this.articles = this.articles.filter(art => art.index !== index)
    },
    calTotal(index) {
      const article = this.articles.find(art => art.index === index);
      article.total = article.pu * article.qte - article.remise + (article.tva / 100) * (article.pu * article.qte - article.remise)
      console.log(article.total);
      this.total = 0;
      this.articles.forEach(article => {
        this.total += article.total
      });
    },
    enregistrer() {
      Axios.post('http://localhost:1337/devis', {
        articles: this.articles,
        reference: this.reference,
        remisG: this.remisG,
        total: this.total,
        dateDevis: this.dateDevis,
        termes: this.termes,
        maitre: this.maitre,
        payment: this.payment,
        client: this.client
      }).then(resp => {
        console.log(resp);
        this.$router.push("/devis")
      }).catch((err) => {
        this.error = err;
        this.snackbar = true;
      });
    }
  },
}
</script>
<style lang="css">
  .tr:hover{
    background-color: #fff;
  }
</style>
