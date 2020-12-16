<template>
  <v-form v-if="comparent" ref="form" v-model="valid" lazy-validation>
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparent / Personne Morale
    </h1>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
            value="id"
            text="nom"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="ice"
            v-model="ice"
            name="ice"
            label="I.C.E"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="rc"
            v-model="rc"
            name="rc"
            label="R.C"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="cnss"
            v-model="cnss"
            name="cnss"
            label="C.N.S.S"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            v-model="representant"
            name="representant"
            :items="representants"
            label="Representant"
            item-value="id"
            item-text="nom"
            multiple
          ></v-select>
        </v-col>
        <!-- <v-col cols="12">
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
                    :items="representants"
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
                  <v-btn class="ml-2" icon @click="dialogComp = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>

            <div class="pa-4">
              <v-simple-table rounded="t-xl" v-if="representant.length != 0">
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">ID</th>
                      <th class="text-left">Type</th>
                      <th class="text-left">Nom de Representant</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="comp in representant" :key="comp.id">
                      <td>{{ comp.id }}</td>
                      <td>{{ comp.type }}</td>
                      <td>{{ comp.nom }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </div>
          </v-sheet>
        </v-col> -->
        <v-col cols="12">
          <v-text-field
            v-model="Adresse"
            v-bind="Address"
            label="Adresse"
            name="Adresse"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6"> </v-col>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
    <div class="d-flex justify-space-between mx-8">
      <v-btn color="primary" dark nuxt to="/comparent"> <v-icon>mdi-chevron-left</v-icon> Retourner</v-btn>    
      <v-btn color="primary" dark @click="enregistrer">Enregistrer</v-btn>
    </div>
  </v-form>
</template>
<script>
import Axios from 'axios';
import ComparentService from './../../assets/sevices/comparentService.js'
const comparentService = new ComparentService()
export default {
  props: {
    comparent: {
      type: Object
    },
    modifier: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    valid: true,
    dialogComp: false,
    comp: '',
    name: '',
    representant: '',
    raisonSociale: '',
    ice: '',
    rc: '',
    cnss: '',
    Adresse: '',
    representants: [],
    select: null,
    checkbox: false,
    selectedItems: [],
    headersComp: [
      { text: 'ID', value: 'id' },
      { text: 'Nom de Comparant', value: 'type' },
      { text: 'Nom de Comparant', value: 'nom' },
    ],
  }),
  beforeCreate() {
    Axios.get('http://localhost:1337/comparent').then((resp) => {
      this.representants = resp.data
    });
  },
  created() {
    if (this.modifier) {
      this.raisonSociale = this.comparent.raisonSociale;
      this.ice = this.comparent.ice;
      this.rc = this.comparent.rc;
      this.If = this.comparent.If;
      this.cnss = this.comparent.cnss;
      this.representant = this.comparent.representant;
      this.Adresse = this.comparent.Adresse;
    } else
      this.raisonSociale = this.comparent.nom
  },

  methods: {
    selectComparant() {
      this.representant = this.selectedItems
      this.selectedItems = []
      this.dialogComp = false
    },
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    enregistrer() {
      if (this.modifier) {
        this.edit();
      } else
        comparentService
          .saveEntreprise(
            this.comparent.id,
            this.raisonSociale,
            this.ice,
            this.rc,
            this.If,
            this.cnss,
            this.representant,
            this.Adresse
          )
          .then((resp) => {
            this.$router.push(
              `/comparent?success=Comparent était bien enregistré`
            )
          }).catch(err => console.error(err))
    },
    edit() {
      comparentService.editEntreprise(
        this.comparent.comparent,
        this.raisonSociale,
        this.ice,
        this.rc,
        this.If,
        this.cnss,
        this.representant,
        this.Adresse
      ).then(resp => {
        this.$router.push(
          `/comparent?success=Comparent était bien Modifié`
        )
      }).catch(err => console.log(err))
    }
  },
}
</script>
