<template>
  <v-stepper v-model="e1">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">
        Creation Dossier
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Comparants & Biens
      </v-stepper-step>

      <v-divider></v-divider>

      <!-- <v-stepper-step step="3"> Attachments </v-stepper-step> -->
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" min-height="60vh">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="libelle"
                  label="Libelle Du Dossier"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="nature"
                  label="Nature Du Dossier"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="notaire"
                  label="Notaire Du Dossier"
                  id="id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="dateOuverture"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateOuverture"
                      label="Date Ouverture Du Dossier"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateOuverture" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(dateOuverture)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  :return-value.sync="dateFermeture"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dateFermeture"
                      label="Date de Fermeture Du Dossier"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="dateFermeture" no-title scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu1 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu1.save(dateFermeture)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description"
                  auto-grow
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <div class="offset-9">
          <v-btn color="primary" @click="e1 = 2"> Continuer </v-btn>

          <v-btn text nuxt to="/dossiers"> Anuller </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card class="mb-12" min-height="60vh">
          <v-container fluid>
            <v-row justify="center">
              <v-col cols="12">
                <v-dialog v-model="dialogComp" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Choix de(s) Comparant(s)
                    </v-card-title>
                    <v-card-text>
                      <v-list shaped>
                        <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="search"
                              append-icon="mdi-magnify"
                              label="Chercher"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-btn dark small color="primary">
                              <v-icon>mdi-plus</v-icon> Nouveau
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-data-table
                          v-model="selectedItems"
                          :headers="headersComp"
                          :items="compList"
                          item-key="id"
                          show-select
                          :search="search"
                          class="elevation-1"
                        >
                        </v-data-table>
                      </v-list>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="selectComparant">
                        Selectionner
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
                          Comparant(s)
                        </h3>
                      </v-col>
                      <v-col cols="3" class="text-right">
                        <v-btn disabled icon>
                          <v-icon>mdi-account-outline</v-icon>
                        </v-btn>
                        <v-btn class="ml-2" icon @click="openComp">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>

                  <div class="pa-4">
                    <v-simple-table rounded="t-xl" v-if="Comparant.length != 0">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">ID</th>
                            <th class="text-left">Type</th>
                            <th class="text-left">
                              Nom / Raison Sociale du Comparant
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="comp in Comparant" :key="comp.id">
                            <td>{{ comp.id }}</td>
                            <td>{{ comp.type }}</td>
                            <td>{{ comp.nom }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-sheet>
              </v-col>
              <v-col cols="12">
                <v-dialog v-model="dialogBien" width="500">
                  <v-card>
                    <v-card-title class="headline grey lighten-2">
                      Choix de(s) Bien(s)
                    </v-card-title>
                    <v-card-text>
                      <v-list shaped>
                        <v-row>
                          <v-col cols="9">
                            <v-text-field
                              v-model="search"
                              append-icon="mdi-magnify"
                              label="Chercher"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-col>
                          <v-col cols="3">
                            <v-btn dark small color="primary">
                              <v-icon>mdi-plus</v-icon> Nouveau
                            </v-btn>
                          </v-col>
                        </v-row>
                        <v-data-table
                          v-model="selectedItems"
                          :headers="headersBien"
                          :items="bienList"
                          item-key="id"
                          show-select
                          :search="search"
                          class="elevation-1"
                        >
                        </v-data-table>
                      </v-list>
                    </v-card-text>
                    <v-divider></v-divider>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="primary" text @click="selectBien">
                        Selectionner
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
                          Bien(s)
                        </h3>
                      </v-col>
                      <v-col cols="3" class="text-right">
                        <v-btn disabled icon>
                          <v-icon>mdi-account-outline</v-icon>
                        </v-btn>
                        <v-btn class="ml-2" icon @click="openBien">
                          <v-icon>mdi-plus</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-sheet>

                  <div class="pa-4">
                    <v-simple-table rounded="t-xl" v-if="Bien.length != 0">
                      <template v-slot:default>
                        <thead>
                          <tr>
                            <th class="text-left">Libelle du Bien</th>
                            <th class="text-left">Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="comp in Bien" :key="comp.id">
                            <td>{{ comp.libelle }}</td>
                            <td>{{ comp.type }}</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </div>
                </v-sheet>
              </v-col>
            </v-row>
          </v-container>
        </v-card>

        <div class="offset-7">
          <v-btn color="primary" @click="e1 = 1">
            <v-icon>mdi-chevron-left</v-icon> Retour
          </v-btn>
          <v-btn color="primary" @click="enregistrer"> Terminer </v-btn>
          <v-btn text nuxt to="/dossiers"> Anuller </v-btn>
        </div>
      </v-stepper-content>
      <!-- 
      <v-stepper-content step="3" c>
        <v-card class="mb-12" min-height="60vh"></v-card>
        <div class="offset-9">
          <v-btn color="primary" @click="enregistrer"> Terminer </v-btn>

          <v-btn text nuxt to="/dossiers"> Anuller </v-btn>
        </div>
      </v-stepper-content> -->
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import axios from "axios";
import ComparentService from "~/assets/sevices/comparentService";
import Axios from "axios";
const comparentService = new ComparentService();
export default {
  async asyncData({ params }) {
    const doss = params.dossier;
    return { doss };
  },
  data() {
    return {
      e1: 1,
      menu: false,
      menu1: false,
      headersComp: [
        { text: "ID", value: "id" },
        { text: "Nom de Comparant", value: "type" },
        { text: "Nom de Comparant", value: "nom" }
      ],
      headersBien: [
        { text: "ID", value: "id" },
        { text: "Libelle", value: "libelle" },
        { text: "Type", value: "type" }
      ],

      search: "",
      nature: "",
      libelle: "",
      description: "",
      dateOuverture: null,
      dateFermeture: null,
      Bien: [],
      Comparant: [],
      notaire: "",
      dialogBien: false,
      dialogComp: false,
      compList: [],
      bienList: [],
      selectedItems: [],
      snackbar: false,
      error: ""
    };
  },
  created() {
    axios
      .get(`https://notaitre-api.herokuapp.com/dossiers/${this.doss}`)
      .then(resp => {
        this.nature = resp.data.nature;
        this.description = resp.data.description;
        this.libelle = resp.data.libelle;
        this.dateOuverture = resp.data.dateOuverture;
        this.dateFermeture = resp.data.dateFermeture;
        this.notaire = resp.data.NomMaitre;

        console.log(resp.data);
        JSON.parse(resp.data.comparents).forEach(comp => {
          Axios.get(`https://notaitre-api.herokuapp.com/comparent/${comp}`)
            .then(c => {
              this.Comparant.push(c.data.comparent[0]);
            })
            .catch(err => {
              this.error = err;
              this.snackbar = true;
            });
        });
        JSON.parse(resp.data.bien).forEach(bien => {
          Axios.get(`https://notaitre-api.herokuapp.com/bien/${bien}`)
            .then(b => {
              this.Bien.push(b.data);
            })
            .catch(err => {
              this.error = err;
              this.snackbar = true;
            });
        });
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  },
  beforeCreate() {
    axios
      .get("https://notaitre-api.herokuapp.com/bien")
      .then(resp => {
        this.bienList = resp.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
    axios
      .get("https://notaitre-api.herokuapp.com/comparent", { mode: "cors" })
      .then(resp => {
        this.compList = resp.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  },

  methods: {
    selectComparant() {
      this.Comparant = this.selectedItems;
      this.selectedItems = [];
      this.dialogComp = false;
    },
    selectBien() {
      this.Bien = this.selectedItems;
      this.selectedItems = [];
      this.dialogBien = false;
    },
    openComp() {
      this.selectedItems = this.Comparant;
      this.dialogComp = true;
    },
    openBien() {
      this.selectedItems = this.Bien;
      this.dialogBien = true;
    },
    enregistrer() {
      const comps = [];
      const bins = [];

      this.Comparant.forEach(Comp => {
        comps.push(Comp.id);
      });
      this.Bien.forEach(b => {
        bins.push(b.id);
      });

      axios
        .put(`https://notaitre-api.herokuapp.com/dossiers/${this.doss}`, {
          title: `${this.libelle} -  ${this.nature}`,
          nature: this.nature,
          description: this.description,
          libelle: this.libelle,
          dateOuverture: this.dateOuverture,
          dateFermeture: this.dateFermeture,
          Bien: JSON.stringify(bins),
          Comparent: JSON.stringify(comps),
          NomMaitre: this.notaire
        })
        .then(resp => {
          this.$router.push(`/dossiers?success=Dossiers est bien enregistré`);
        })
        .catch(err => {
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>
