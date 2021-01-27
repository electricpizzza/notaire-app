<template>
  <v-stepper v-model="e1">
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
    <v-stepper-header>
      <v-stepper-step @click="e1 = 1" :complete="e1 > 1" step="1">
        Creation Dossier
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">
        Comparants & Biens
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3"> Attachments </v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card class="mb-12" min-height="60vh">
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="identifiant"
                  label="Identifiant"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field v-model="libelle" label="Libelle"></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="NatureDossiers"
                  v-model="nature"
                  label="Nature"
                  item-value="value"
                  item-text="libelle"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="notaire"
                  label="Notaire"
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
                      label="Date Ouverture"
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
                      label="Date de Fermeture"
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
              <v-col cols="12" sm="6">
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
              <v-col cols="12" sm="6">
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
                          <v-icon>mdi-domain</v-icon>
                          Bien(s)
                        </h3>
                      </v-col>
                      <v-col cols="3" class="text-right">
                        <v-btn disabled icon>
                          <v-icon>mdi-domain</v-icon>
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
          <v-btn color="primary" @click="e1 = 3"> Continuer </v-btn>
          <!-- <v-btn color="primary" @click="enregistrer"> Terminer </v-btn> -->
          <v-btn text nuxt to="/dossiers"> Anuller </v-btn>
        </div>
      </v-stepper-content>

      <v-stepper-content step="3" c>
        <v-card class="mb-12" min-height="60vh">
          <h4 style="color: gray" class="ml-3">Fichiers :</h4>
          <v-row>
            <v-col cols="12" class="file-show">
              <div
                v-for="(file, index) in files"
                :key="index"
                class="img-show ma-3"
              >
                <img src="" alt="" srcset="" />
                <span>{{ file.name }}</span>
              </div>
              <input
                type="file"
                id="file"
                ref="file"
                @change="fileUpload"
                class="img-field ma-3"
                multiple
              />
            </v-col>
          </v-row>
        </v-card>
        <div class="offset-7">
          <v-btn color="primary" @click="e1 = 2">
            <v-icon>mdi-chevron-left</v-icon> Retour
          </v-btn>
          <v-btn color="primary" @click="enregistrer"> Terminer </v-btn>

          <v-btn text nuxt to="/dossiers"> Anuller </v-btn>
        </div>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      e1: 1,
      menu: false,
      menu1: false,
      headersComp: [
        { text: 'ID', value: 'id' },
        { text: 'Nom de Comparant', value: 'type' },
        { text: 'Nom de Comparant', value: 'nom' },
      ],
      headersBien: [
        { text: 'ID', value: 'id' },
        { text: 'Libelle', value: 'libelle' },
        { text: 'Type', value: 'type' },
      ],

      search: '',
      identifiant: '',
      nature: '',
      libelle: '',
      description: '',
      dateOuverture: new Date().toISOString().split('T')[0],
      dateFermeture: null,
      Bien: [],
      Comparant: [],
      notaire: '',
      dialogBien: false,
      dialogComp: false,
      compList: [],
      bienList: [],
      selectedItems: [],
      NatureDossiers: [],
      attachmentList: [],
      files: [],
      loading: false,
      snackbar: false,
      error: '',
    }
  },
  beforeCreate() {
    axios.get('http://localhost:1337/bien').then(resp => {
      this.bienList = resp.data
    }).catch((err) => {
      this.error = err;
      this.snackbar = true;
    });
    axios
      .get('http://localhost:1337/comparent', { mode: 'cors' })
      .then((resp) => {
        this.compList = resp.data
      }).catch(err => {
        this.error = err;
        this.snackbar = true;
      });
    axios.get('http://localhost:1337/data').then(resp => {
      this.NatureDossiers = resp.data.NatureDossier;
    });
  },
  watch: {
    nature: (newnature, oldnature) => {
      axios.get('http://localhost:1337/data').then(resp => {
        this.attachmentList = resp.data.NatureDossier.find(n => n.value = newnature).attachements
      }).catch((err) => {
        this.error = err;
        this.snackbar = true;
      });
    }
  },
  methods: {
    fileUpload() {
      this.testimage = this.$refs.file.files[0].webkitRelativePath;
      this.files.push(...this.$refs.file.files);
    },
    selectComparant() {
      this.Comparant = this.selectedItems
      this.selectedItems = []
      this.dialogComp = false
    },
    selectBien() {
      this.Bien = this.selectedItems
      this.selectedItems = []
      this.dialogBien = false
    },
    openComp() {
      this.dialogComp = true
    },
    openBien() {
      this.dialogBien = true
    },
    enregistrer() {

      this.loading = true;
      const comps = [];
      const bins = [];

      this.Comparant.forEach(Comp => {
        comps.push(Comp.id)
      });
      this.Bien.forEach(b => {
        bins.push(b.id)
      });

      axios.post('http://localhost:1337/dossiers', {
        title: `${this.libelle} -  ${this.nature}`,
        nature: this.nature,
        identifiant: this.identifiant,
        description: this.description,
        libelle: this.libelle,
        dateOuverture: this.dateOuverture,
        dateFermeture: this.dateFermeture,
        Bien: JSON.stringify(bins),
        Comparent: JSON.stringify(comps),
        NomMaitre: this.notaire,
      }).then(resp => {
        console.log(resp);
        let formData = new FormData();
        this.files.forEach(file => {
          formData.append('files', file, name.name);
        });
        formData.append('titre', this.libelle);
        formData.append('dossier', resp.data.identifiers[0].id);
        formData.append('description', this.description);
        axios.post('http://localhost:1337/archive', formData).then(arch => {
          this.loading = false;
          this.$router.push(
            `/dossiers?success=Dossiers est bien enregistré`
          )
        }).catch(err => {
          this.error = err;
          this.loading = false;
          this.snackbar = true;
        });
      }).catch(err => {
        this.error = err;
        this.loading = false;
        this.snackbar = true;
      })
    }
  },
}
</script>
<style lang="css">
  .img-field::-webkit-file-upload-button {
    color: white;
    display: inline-block;
    background: #1CB6E0;
    border: none;
    padding: 7px 15px;
    font-weight: 700;
    border-radius: 3px;
    white-space: nowrap;
    cursor: pointer;
    font-size: 10pt;
    width:100px;
    height:100px;
  }
  .img-show{
    width: 100px;
    height: 100px;
    background-color: lightcyan;
    background-image: url('/_nuxt/assets/placeholder.png');
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .file-show{
    display: flex;
    flex-wrap: wrap;
  }
</style>