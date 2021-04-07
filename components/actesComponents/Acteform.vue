<template>
  <v-container>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        v-model="loading"
      ></v-progress-circular>
    </v-overlay>
    <v-form>
      <v-row>
        <v-col cols="6">
          <v-text-field v-model="libelle" label="Titre"></v-text-field>
        </v-col>
        <v-col cols="6">
          <v-select
            :items="dossiers"
            v-model="dossier"
            label="Dossier"
            item-text="title"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="6" v-for="(champ, index) in schema" :key="index">
          <v-sheet
            elevation="10"
            rounded="xl"
            v-if="champ.type === 'comparent'"
          >
            <v-dialog
              v-model="dynamicData.find(d => d.nom == champ.name).dialogChoix"
              width="500"
            >
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
                      :items="items"
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
                        d => d.nom == champ.name
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
                  v-for="comp in dynamicData.find(d => d.nom == champ.name)
                    .data"
                  :key="comp.id"
                >
                  {{ comp.nom }}
                </v-chip>
              </v-chip-group>
            </div>
          </v-sheet>
          <v-select
            v-else-if="champ.type === 'bien'"
            :items="biens"
            item-text="libelle"
            item-value="id"
            v-model="data[index]"
            :label="champ.label"
            :name="champ.name"
          ></v-select>
          <v-text-field
            v-else
            :name="champ.name"
            :label="champ.label"
            v-model="data[index]"
            @change="changed"
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <!-- <acte-document :value="document" :libelle="libelle" :model="model" :data="data"/> -->
        </v-col>
      </v-row>
      <v-btn color="primary" class="offset-10" @click="enregistrer" dark
        >Enregistrer</v-btn
      >
    </v-form>
  </v-container>
</template>
<script>
import axios from "axios";
import ComparentService from "./../../assets/sevices/comparentService";
import RichEditor from "../RichEditor.vue";
const comparentService = new ComparentService();
export default {
  components: { RichEditor },
  name: "Acteform",
  data() {
    return {
      search: "",
      schema: [],
      champs: [],
      modelActuel: "",
      redacteur: "",
      fichier: "",
      dossier: "",
      libelle: "",
      comparents: [],
      biens: [],
      dossiers: [],
      dynamicData: [],
      dialogChoix: false,
      document: "",
      data: [],
      items: [],
      headersComp: [
        { text: "ID", value: "id" },
        { text: "Nom de Comparant", value: "type" },
        { text: "Nom de Comparant", value: "nom" }
      ],
      selectedItems: [],
      snackbar: false,
      error: "",
      loading: false
    };
  },
  props: ["model", "oldContenu", "id"],

  beforeCreate() {
    comparentService.getAllComparents().then(resp => {
      this.items = resp.data;
    });
    axios
      .get("http://localhost:1337/dossiers")
      .then(res => {
        this.dossiers = res.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
    axios
      .get("http://localhost:1337/bien")
      .then(res => {
        this.biens = res.data;
      })
      .catch(err => {
        this.error = err;
        this.snackbar = true;
      });
  },
  created() {
    if (this.model) {
      this.schema = JSON.parse(this.model.champs);
    } else {
      this.schema = this.oldContenu;
      this.oldContenu.forEach(element => {});
    }
    var id = 0;
    const objs = [];
    this.schema.forEach(chmp => {
      if (chmp.type === "comparent") {
        id++;
        objs.push({
          id,
          dialogChoix: false,
          nom: chmp.name,
          type: chmp.type,
          data: []
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
    changed() {
      // console.log(this.data);
    },
    selectItems(name) {
      this.dynamicData.find(d => d.nom == name).data = [...this.selectedItems];
      this.dynamicData.find(d => d.nom == name).dialogChoix = false;
      this.selectedItems = [];
    },
    enregistrer() {
      this.loading = true;
      const chmps = document.querySelectorAll("input");
      chmps.forEach(chmp => {
        if (chmp.name !== "") {
          if (chmp.type === "hidden") {
            const bin = this.biens.find(b => b.id === Number(chmp.value));
            console.log(this.biens.find(bi => bi.id === Number(chmp.value)));
            this.champs.push({
              name: chmp.name,
              type: "bien",
              value: bin
            });
          } else {
            this.champs.push({
              name: chmp.name,
              type: chmp.type,
              value: chmp.value
            });
          }
        }
      });
      this.dynamicData.forEach(chmp => {
        const objs = [];
        chmp.data.forEach(element => {
          objs.push(element.id);
        });
        if (chmp.type === "comparent") {
          const comps = [];
          objs.forEach(comp => {
            axios.get(`http://localhost:1337/comparent/${comp}`).then(resp => {
              comps.push(resp.data.comparentInfo[0]);
              this.champs.push({
                name: chmp.nom,
                type: chmp.type,
                value: [...comps]
              });
            });
          });
        } else {
          this.champs.push({
            name: chmp.nom,
            type: chmp.type,
            value: [...objs]
          });
        }
      });

      if (this.model) {
        console.log({
          contenu: this.champs,
          model: this.model.id,
          redacteur: this.redacteur,
          fichier: this.fichier,
          dossierId: this.dossier,
          libelle: this.libelle,
          data: this.champs
        });
        setTimeout(() => {
          axios
            .post("http://localhost:1337/actes", {
              contenu: this.champs,
              model: this.model.id,
              redacteur: this.redacteur,
              fichier: this.fichier,
              dossierId: this.dossier,
              libelle: this.libelle,
              data: this.champs,
              dateRedaction: new Date().toDateString()
            })
            .then(resp => {
              this.$router.push(`/actes?success=Acte est bien enregistré`);
            })
            .catch(err => {
              this.error = err;
              this.snackbar = true;
              this.loading = false;
            });
        }, 1000);
      } else {
        axios
          .put("http://localhost:1337/actes" + this.id, {
            contenu: this.champs,
            model: this.model.id,
            redacteur: this.redacteur,
            fichier: this.fichier,
            dossierId: this.dossier,
            libelle: this.libelle,
            data: this.dynamicData,
            dateRedaction: new Date().toDateString()
          })
          .then(resp => {
            this.$router.push(`/actes?success=Acte est bien enregistré`);
          })
          .catch(err => {
            this.error = err;
            this.snackbar = true;
          });
      }
    }
  }
};
</script>
