<template>
  <div class="mx-10 pa-10">
    <div class="text-center container">
      <h1>Modifier Un Model</h1>
      <v-alert
        border="left"
        color="red"
        dense
        type="error"
        dismissible
        v-if="error"
      >
        {{ error }}
      </v-alert>
    </div>
    <div v-if="!model">
      <v-form>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select
              :items="typeActes"
              v-model="type"
              label="Type d'Acte"
              item-text="libelle"
              item-value="value"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6"
            ><v-text-field v-model="redacteur" label="Redacteur"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" v-for="(champ, index) in champs" :key="index">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :name="'champs' + index"
                  :label="'champs ' + index"
                  :value="champ.name"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="[
                    { value: 'text', label: 'Text' },
                    { value: 'numero', label: 'Numero' },
                    { value: 'bien', label: 'Bien' },
                    { value: 'comparent', label: 'Comparant' },
                    { value: 'Dossier', label: 'Dossier' },
                  ]"
                  :name="'TypeChamps' + index"
                  :label="'Type Du champs ' + index"
                  item-text="label"
                  item-value="value"
                  :value="champ.type"
                ></v-select>
              </v-col>
              <v-btn
                outlined
                color="pink"
                class="mt-7"
                icon
                fab
                @click="deleChemps(i)"
                x-small
              >
                <v-icon x-small>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="9"><h3>Les champs</h3></v-col>
              <v-col cols="12" sm="3">
                <v-btn text color="primary" small @click="addChamps">
                  <v-icon>mdi-plus</v-icon> Ajouter Un Champ
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12">
            <RichEditor
              v-if="libelle"
              :libelle="libelle"
              :redacteur="redacteur"
              :type="type"
              :value="boilerplate"
            />
          </v-col>
        </v-row>
      </v-form>
      <div class="d-flex justify-space-between">
        <v-btn color="primary" dark nuxt to="/modeles">
          <v-icon>mdi-chevron-left</v-icon> Retour</v-btn
        >
        <v-btn color="primary" dark @click="enregistrer">Enregistrer</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MarkdownStore from './../../../assets/store/MarkdownStore'
export default {
  name: "ModifierModel",
  async asyncData({ params }) {
    const slug = params.modele
    return { slug }
  },
  data() {
    return {
      typeActes: [],
      model: null,
      error: null,
      language: null,
      redacteur: '',
      libelle: null,
      boilerplate: '',
      type: '',
      champs: [],
      nbCamps: 2,
      languages: [{ 'titre': 'Français', 'value': 'Fr' }, { 'titre': 'العربية', 'value': 'Ar' }]
    }
  },
  beforeCreate() {
    axios.get('http://localhost:1337/data').then(resp => {
      this.typeActes = resp.data.typeActe;
    })
  },
  created() {
    axios.get('http://localhost:1337/model/' + this.slug).then(resp => {
      console.log(resp.data[0]);
      this.libelle = resp.data[0].libelle;
      this.redacteur = resp.data[0].redacteur;
      this.language = resp.data[0].language;
      this.champs = JSON.parse(resp.data[0].champs);
      this.type = resp.data[0].type;
      this.boilerplate = resp.data[0].boilerplate;
      MarkdownStore.data.markdown = resp.data[0].boilerPlate;
    })
  },
  methods: {
    addChamps() {
      this.nbCamps++;
    },
    deleChemps(index) {
      this.nbCamps--;
    },
    enregistrer() {
      this.boilerplate = MarkdownStore.data.markdown;
      const inputs = document.querySelectorAll('input');
      const wanted = [];
      this.champs = [];
      for (let index = 0; index < inputs.length; index++) {
        const element = inputs[index];
        if (element.name != "") {
          wanted.push(element)
        }
      }
      for (let index = 0; index < wanted.length - 1; index += 2) {
        const champ = {
          name: wanted[index].value.replace(" ", ""),
          type: wanted[index + 1].value,
          label: wanted[index].value,
        }
        this.champs.push(champ)
      }


      if (this.language === null || this.redacteur === '' || this.libelle === null || this.type === '' || this.champs === []) {
        this.error = "Veuillez Bien Saisire les données S.V.P."
      } else {
        axios.put('http://localhost:1337/model/' + this.slug, {
          language: this.language,
          redacteur: this.redacteur,
          libelle: this.libelle,
          type: this.type,
          champs: this.champs,
          boilerplate: MarkdownStore.data.markdown,
        }).then(resp => {
          MarkdownStore.data.markdown = '';
          this.$router.push(
            `/modeles?success=Acte est bien Modifier`
          )
        }).catch(err => {
          this.error = err + "!! Veuillez se conecter au serveur S.V.P. !!";
          console.log(err)
        })
      }
    }
  }
}
</script>
