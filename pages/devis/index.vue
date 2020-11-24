<template>
  <div class="ma-10">
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
                label="Date Devis"
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
          <v-select
            :items="termes"
            v-model="value"
            label="Termes & Condition"
          ></v-select>
        </div>
      </v-col>
      <v-col cols="6" ms="12">
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
                    <th class="text-left">ID</th>
                    <th class="text-left">Type</th>
                    <th class="text-left">Nom / Raison Sociale du Comparant</th>
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
      <v-col cols="12" v-for="i in articles" :key="i">
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
                  <v-text-field name="ref" style="width: 50px"></v-text-field>
                </td>
                <td rowspan="2">
                  <v-textarea
                    name="description"
                    label="Description"
                  ></v-textarea>
                </td>
                <td>
                  <v-text-field name="qte" style="width: 50px"></v-text-field>
                </td>
                <td>
                  <v-text-field name="pu" style="width: 50px"></v-text-field>
                </td>
                <td>
                  <v-text-field
                    name="remise"
                    style="width: 50px"
                  ></v-text-field>
                </td>
                <td>
                  <v-text-field name="tva" style="width: 50px"></v-text-field>
                </td>
                <td>
                  {{ total }}
                </td>
                <td>
                  <v-btn outline color="error" x-small dark icon fab>
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </td>
              </tr>
              <tr>
                <td colspan="2"></td>
                <td colspan="6">
                  <v-select
                    :items="items"
                    v-model="value"
                    label="label"
                  ></v-select>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col cols="8" ms="12">
        <v-btn flat color="primary" small @click="addRow">
          <v-icon>mdi-plus</v-icon> Ajouter Une Ligne
        </v-btn>
      </v-col>
      <v-col cols="4" ms="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Remise Global:</th>
                <th class="text-left">
                  <v-text-field name="remisG" id="id"></v-text-field>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Total H.T.</td>
                <td class="text-right">HDS</td>
              </tr>
              <tr>
                <td>Total TTC</td>
                <td class="text-right">HDS</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dateDevis: new Date().toISOString().substr(0, 0),
      termes: '',
      Comparant: null,
      search: '',
      dialogComp: false,
      total: '',
      articles: [
        { ref: '', description: '', qte: '', pu: '', tva: '' },
        { ref: '', description: '', qte: '', pu: '', tva: '' },
      ],
    }
  },
  methods: {
    addRow() {
      this.articles.push(this.articles.length)
    }
  },
}
</script>
<style lang="css">
  .tr:hover{
    background-color: #fff;
  }
</style>
