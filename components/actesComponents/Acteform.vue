<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Titre"></v-text-field>
        </v-col>
        <v-col cols="12" v-for="champ in schema" :bind="champ.name">
          <v-sheet
            elevation="10"
            rounded="xl"
            v-if="champ.type === 'comparent'"
          >
            <v-dialog
              v-model="dynamicData.find((d) => d.nom == champ.name).dialogChoix"
              width="500"
            >
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
                    Selectionner {{ champ.name }}(s)
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                  <v-btn
                    class="ml-2"
                    icon
                    @click="
                      dynamicData.find(
                        (d) => d.nom == champ.name
                      ).dialogChoix = true
                    "
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-sheet>

            <div class="pa-4">
              <v-chip-group active-class="primary--text" column>
                <v-chip
                  v-for="comp in dynamicData.find((d) => d.nom == champ.name)
                    .data"
                  :key="comp"
                >
                  {{ comp.name }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-sheet>
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
        <v-col cols="12"> </v-col>
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
      schema: [],
      champs: [],
      modelActuel: '',
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
    this.schema = JSON.parse(this.model.champs);
    console.log(this.schema);
    var id = 0;
    const objs = [];
    this.schema.forEach(chmp => {
      if (chmp.type === 'comparent') {
        id++;
        objs.push({
          id,
          dialogChoix: false,
          nom: chmp.name,
          data: [],
        });
      }
    });
    this.dynamicData = objs;
  },
  watch: {
    model: () => {
      // this.schema = JSON.parse(this.model.champs)
    }
  },
  methods: {
    selectItems(name) {

      this.dynamicData.find(d => d.nom == name).data = [...this.selectedItems];
      this.dynamicData.find(d => d.nom == name).dialogChoix = false
      this.selectedItems = [];
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
      this.dynamicData.forEach(chmp => {
        const objs = [];
        chmp.data.forEach(element => {
          objs.push(element.id)
        });
        this.champs.push(
          JSON.parse(`{"${chmp.nom}" : "${[...objs]}"}`)
        )
      });
      console.log(JSON.stringify({
        contenu: this.champs,
        model: this.model.id,
        redacteur: this.redacteur,
        fichier: this.fichier,
        dossierId: this.dossier,
        libelle: this.libelle,
        dateRedaction: new Date().getUTCDate()
      }));
      axios.post('http://localhost:1337/actes', {
        contenu: this.champs,
        model: this.model.id,
        redacteur: this.redacteur,
        fichier: this.fichier,
        dossierId: this.dossier,
        libelle: this.libelle,
        data: this.dynamicData,
        dateRedaction: new Date().toDateString()
      }).then(resp => {
        this.$router.push(
          `/actes?success=Acte est bien enregistré`
        )
      }).catch(err => console.log(err))
    }
  }
}
</script>