<template>
  <div>
    <div class="text-center container">
      <h1>Ajouter Un Model d'un Modele</h1>
      <v-dialog v-model="dialog" width="500">
        <v-card>
          <v-card-title class="headline lighten-2">
            Créer un Model
          </v-card-title>

          <v-card-text>
            <v-select
              :items="languages"
              v-model="language"
              label="Language"
              item-text="titre"
              item-value="value"
            ></v-select>
            <v-text-field v-model="libelle" label="Libelle"></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" text nuxt to="/modeles"> Anuller </v-btn>
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
          <v-col cols="12" sm="6"
            ><v-text-field v-model="type" label="Type d'Acte"></v-text-field>
          </v-col>
          <v-col cols="12" sm="6"
            ><v-text-field v-model="redacteur" label="Redacteur"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-row>
              <v-col cols="12" sm="9"><h3>Les champs</h3></v-col>
              <v-col cols="12" sm="3">
                <v-btn flat color="primary" small @click="addChamps">
                  <v-icon>mdi-plus</v-icon> Ajouter Un Champ
                </v-btn></v-col
              >
            </v-row>
          </v-col>

          <v-col cols="12" v-for="i in nbCamps" v-bind="i">
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  :name="'champs' + i"
                  :label="'champs ' + i"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-select
                  :items="['Text', 'Numero', 'Bien', 'Comparent', 'Dossier']"
                  :name="'TypeChamps' + i"
                  :label="'Type Du champs ' + i"
                ></v-select>
              </v-col>
            </v-row>
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
export default {
  name: "AjouterActe",
  data() {
    return {
      model: null,
      language: null,
      redacteur: '',
      libelle: null,
      type: '',
      champs: [],
      dialog: this.language && this.libelle ? false : true,
      nbCamps: 2,
      languages: [{ 'titre': 'Français', 'value': 'Fr' }, { 'titre': 'العربية', 'value': 'Ar' }]
    }
  },
  beforeCreate() {

  },
  methods: {
    addChamps() {
      this.nbCamps++;
    },
    enregistrer() {
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
      console.log(this.champs);
      // axios.post('http://localhost:1337/model', {

      // })
    }
  }
}
</script>