<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Titre"></v-text-field>
        </v-col>
        <v-col cols="12" v-for="champ in shema" :bind="champ.name">
          <v-sheet
            elevation="10"
            rounded="xl"
            v-if="champ.type === 'comparent'"
          >
            <v-sheet class="pa-3 primary" dark rounded="t-xl">
              <v-row>
                <v-col cols="9">
                  <h3>
                    <v-icon>mdi-account-outline</v-icon>
                    {{ champ.label + "(s)" }}
                  </h3>
                </v-col>
                <v-col cols="3" class="text-right">
                  <v-btn disabled icon>
                    <v-icon>mdi-account-outline</v-icon>
                  </v-btn>
                  <v-btn class="ml-2" icon @click="dialogChoix = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>
            <v-dialog v-model="dialogChoix" width="500">
              <v-card>
                <v-card-title class="headline grey lighten-2">
                  Choix de(s) Comparent(s)
                </v-card-title>

                <v-card-text>
                  <v-list shaped>
                    <v-list-item-group v-model="selectedItems" multiple>
                      <template v-for="(item, i) in items">
                        <v-divider
                          v-if="!item"
                          :key="`divider-${i}`"
                        ></v-divider>

                        <v-list-item
                          v-else
                          :key="`item-${i}`"
                          :value="item"
                          active-class="deep-purple--text text--accent-4"
                        >
                          <template v-slot:default="{ active }">
                            <v-list-item-content>
                              <v-list-item-title
                                v-text="item.name + ' : ' + item.identif"
                              ></v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-action>
                              <v-checkbox
                                :input-value="active"
                                color="deep-purple accent-4"
                              ></v-checkbox>
                            </v-list-item-action>
                          </template>
                        </v-list-item>
                      </template>
                    </v-list-item-group>
                  </v-list>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" text @click="selectItems(champ.name)">
                    Selectionner
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <div class="pa-4">
              <v-chip-group active-class="primary--text" column>
                <v-chip
                  v-for="comp in dynamicData.find((d) => (d.name = champ.name))
                    .data"
                  :key="comp"
                >
                  {{ comp }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-sheet>
          <!-- <v-select
            v-if="champ.type === 'comparent'"
            :items="comparents"
            item-value="id"
            item-text="nom"
            v-model="champ.name"
            :label="champ.label + '(s)'"
            :name="champ.name"
          ></v-select> -->
          <v-select
            v-else-if="champ.type === 'bien'"
            :items="['bien 1', 'bien 2']"
            v-model="champ.name"
            :label="champ.label"
            :name="champ.name"
          ></v-select>
          <v-text-field
            v-else
            :name="champ.name"
            :label="champ.label"
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-select
            :items="dossiers"
            v-model="dossier"
            label="Dossier"
            item-text="title"
            item-value="id"
          ></v-select>
        </v-col>
      </v-row>
      <v-btn color="primary" class="offset-10" @click="enregistrer" dark
        >Enregistrer</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import axios from 'axios'
import ComparentService from './../../assets/sevices/comparentService'
const comparentService = new ComparentService()
export default {
  name: "Acteform",
  data() {
    return {
      shema: [],
      champs: [],
      redacteur: '',
      fichier: '',
      dossier: '',
      libelle: '',
      comparents: [],
      dossiers: [],
      dynamicData: [],
      dialogChoix: false,
      items: [
        { id: 11, name: 'dinar ', identif: 'CD12132' },
        { id: 31, name: ' zakariae', identif: 'CD12132' },
        { id: 21, name: 'dinar zakariae', identif: 'CD12132' },
      ],
      selectedItems: [],
    }
  },
  props: ["model"],

  beforeCreate() {
    comparentService.getAllComparents().then(resp => {
      this.comparents = resp.data
    })
    axios.get('http://localhost:1337/dossiers').then(res => {
      this.dossiers = res.data
    })
  },
  created() {
    // this.shema = JSON.parse(this.model.champs);
    this.shema = this.model;
    this.model.forEach(chmp => {
      if (chmp.type === 'comparent') {
        this.dynamicData.push({
          name: chmp.name,
          data: [],
        });
      } else
        this.dynamicData.push({
          name: chmp.name,
          data: '',
        });
    });
  },
  methods: {
    selectItems(name) {

      // this.dynamicData.find(d => d.name = name).data.push(this.selectedItems);
      console.log(this.dynamicData);
      this.dialogChoix = false
    },
    enregistrer() {

      const chmps = document.querySelectorAll('input');
      chmps.forEach(chmp => {
        if (chmp.name != "") {
          this.champs.push(
            JSON.parse(`{"${chmp.name}" : "${chmp.value}"}`)
          )
        }
      });
      axios.post('http://localhost:1337/actes', {
        contenu: this.champs,
        model: this.model.id,
        redacteur: this.redacteur,
        fichier: this.fichier,
        dossierId: this.dossier,
        libelle: this.libelle,
        dateRedaction: new Date().toDateString()
      }).then(resp => {
        console.log(resp)
      }).catch(err => console.log(err))
    }
  }
}
</script>