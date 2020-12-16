<template>
  <div class="mx-10 pa-10">
    <div class="text-center container">
      <h1>Ajouter Un Model</h1>
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
      <v-dialog v-model="dialog" width="500" persistent>
        <v-card>
          <v-card-title class="headline lighten-2">
            Créer un Model
          </v-card-title>

          <v-card-text>
            <v-select
              :items="languages"
              v-model="language"
              label="Langue"
              item-text="titre"
              item-value="value"
            ></v-select>
            <v-text-field v-model="libelle" label="Libelle"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error lighten-1" text nuxt to="/modeles">
              Anuller
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="dialog = language && libelle ? false : true"
            >
              Continuer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
          <v-col cols="12" sm="6" v-for="i in nbCamps" :key="i">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :name="'champs' + i"
                  :label="'champs ' + i"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="[
                    { value: 'text', label: 'Text' },
                    { value: 'numero', label: 'Numero' },
                    { value: 'bien', label: 'Bien' },
                    { value: 'comparent', label: 'Comparent' },
                    { value: 'Dossier', label: 'Dossier' },
                  ]"
                  :name="'TypeChamps' + i"
                  :label="'Type Du champs ' + i"
                  item-text="label"
                  item-value="value"
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
            />
          </v-col>
        </v-row>
      </v-form>
      <v-btn color="primary" class="offset-10" dark @click="enregistrer"
        >Enregistrer</v-btn
      >
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MarkdownStore from './../../assets/store/MarkdownStore'
export default {
  name: "AjouterActe",
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
      dialog: this.language && this.libelle ? false : true,
      nbCamps: 2,
      languages: [{ 'titre': 'Français', 'value': 'Fr' }, { 'titre': 'العربية', 'value': 'Ar' }]
    }
  },
  beforeCreate() {
    axios.get('http://localhost:1337/data').then(resp => {
      console.log(resp.data);
      this.typeActes = resp.data.typeActe;
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
        axios.post('http://localhost:1337/model', {
          language: this.language,
          redacteur: this.redacteur,
          libelle: this.libelle,
          type: this.type,
          champs: this.champs,
          boilerplate: this.boilerplate,
        }).then(resp => {
          this.$router.push(
            `/modeles?success=Acte est bien enregistré`
          )
        }).catch(err => {
          this.error = err + "!! Veuillez se conecter au serveur S.V.P.";
          console.log(err)
        })
      }
    }
  }
}
</script>
