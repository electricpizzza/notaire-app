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
          <v-text-field
            v-model="reference"
            prepend-icon="mdi-cash"
            label="Reference"
          ></v-text-field>
        </div>
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
              <v-btn text color="primary" @click="menu = false">
                Anuller
              </v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(dateDevis)">
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <!-- <div>
          <v-text-field
            v-model="termes"
            prepend-icon="mdi-pencil"
            label="Termes & Condition"
          ></v-text-field>
        </div> -->
        <div>
          <v-text-field
            v-model="maitre"
            prepend-icon="mdi-glasses"
            label="Maitre"
          ></v-text-field>
        </div>
        <div>
          <v-select
            :items="['Espece', 'Cheque', 'Virment']"
            v-model="payment"
            label="Mode de Paiement"
            prepend-icon="mdi-cash-multiple"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="6" ms="12" class="mt-5">
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
      <v-col cols="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Réf.</th>
                <th class="text-left">Libelle</th>
                <th class="text-left">Tarife</th>
                <!-- <th class="text-left">%T.V.A.</th> -->
                <th class="text-left">Total</th>
                <th class="text-left"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="article in articles" :key="article.id">
                <td>
                  {{ "SR00" + article.id }}
                </td>
                <td>
                  {{ article.libelle.toUpperCase() }}
                </td>

                <td>
                  <v-text-field
                    reverse
                    name="pu"
                    @input="calTotal(article.id)"
                    style="width: 150px"
                    v-model="article.pu"
                  ></v-text-field>
                </td>
                <!-- <td>
                  <v-text-field
                    disabled
                    name="tva"
                    v-model="article.tva"
                    style="width: 50px"
                  ></v-text-field>
                </td> -->
                <td>{{ article.total }} Dhs</td>
                <td>
                  <v-btn
                    outlined
                    color="error lighten-1"
                    x-small
                    dark
                    icon
                    fab
                    @click="removeRow(article.id)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="8" ms="12">
        <v-btn text color="primary" small @click="ajDialog = true">
          <v-icon>mdi-plus</v-icon> Ajouter Une Ligne
        </v-btn>
        <v-dialog
          v-model="ajDialog"
          persistent
          :overlay="false"
          max-width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title primary-title> Ajouter Un service </v-card-title>
            <v-card-text>
              <v-tabs v-model="value" color="primary" slider-color="primary">
                <v-tab ripple> Choix de service </v-tab>
                <v-tab ripple> Autre </v-tab>
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12">
                          <v-select
                            :items="items"
                            item-text="libelle"
                            item-value="id"
                            v-model="fromItems"
                            label="Service"
                          ></v-select>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                      <v-btn color="error lighten-2" @click="ajDialog = false"
                        >Anuller</v-btn
                      >
                      <v-btn color="primary" @click="addRow">Ajouter</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="serviceToAdd.libelle"
                            label="Libelle"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                          <v-text-field
                            v-model="serviceToAdd.tva"
                            label="TVA(%)"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-card-text>
                    <v-card-actions class="d-flex justify-end">
                      <v-btn color="error lighten-2" @click="ajDialog = false"
                        >Anuller</v-btn
                      >
                      <v-btn color="primary" @click="addRow">Ajouter</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card-text>
            <v-spacer></v-spacer>
          </v-card>
        </v-dialog>
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
                <td class="text-right">{{ total - remisG }} HDS</td>
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
import Axios from "axios";
import DevisStore from "~/assets/store/devisStore";
import comptabiliteStore from "./../../../assets/store/comptabiliteStore";
export default {
  data() {
    return {
      dateDevis: new Date().toISOString().substr(0, 0),
      termes: "",
      Comparant: null,
      search: "",
      dialogComp: false,
      total: 0,
      remisG: 0,
      maitre: "Mr Mohammed LOUTFI",
      payment: "",
      reference: "1",
      snackbar: false,
      error: "",
      client: { nom: "", address: "" },
      articles: [],
      ajDialog: false,
      items: [],
      serviceToAdd: {
        libelle: "",
        tva: 0
      },
      fromItems: ""
    };
  },
  created() {
    this.articles = comptabiliteStore.services;
    Axios.get("http://localhost:1337/devis/count")
      .then(resp => {
        const ref = (resp.data + 1) / 10000;
        this.reference =
          new Date().getFullYear() + ref.toString().replace("0.", "/");
      })
      .catch(err => console.log(err));
    Axios.get("http://localhost:1337/service")
      .then(resp => {
        this.items = resp.data;
      })
      .catch(err => console.log(err));
  },
  methods: {
    addRow() {
      if (this.serviceToAdd.libelle === "" && this.fromItems !== "") {
        const row = this.items.find(item => item.id === this.fromItems);
        this.articles.push(row);
      } else {
        const row = {
          id: "AJ" + this.articles.length,
          libelle: this.serviceToAdd.libelle,
          pu: 0,
          tva: this.serviceToAdd.tva,
          total: 0,
          class: ""
        };
        this.articles.push(row);
      }
      this.fromItems = "";
      this.serviceToAdd = {
        libelle: "",
        tva: 0
      };
      this.ajDialog = false;
    },
    removeRow(id) {
      this.articles = this.articles.filter(art => art.id !== id);
    },
    calTotal(id) {
      const article = this.articles.find(art => art.id === id);
      article.total =
        parseFloat(article.pu) +
        (parseFloat(article.pu) * parseFloat(article.tva)) / 100;
      this.total = 0;
      this.articles.forEach(article => {
        this.total += parseFloat(article.total);
      });
    },
    enregistrer() {
      Axios.post("http://localhost:1337/devis", {
        articles: this.articles,
        reference: this.reference,
        remisG: this.remisG,
        total: this.total,
        dateDevis: this.dateDevis,
        termes: this.termes,
        maitre: this.maitre,
        payment: this.payment,
        client: this.client
      })
        .then(resp => {
          this.$router.push("/devis");
        })
        .catch(err => {
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>
<style lang="css">
.tr:hover {
  background-color: #fff;
}
</style>
