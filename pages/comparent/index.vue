<template>
  <v-data-table
    :headers="headers"
    :items="comparents"
    sort-by="calories"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-snackbar
        v-model="snackbar"
        color="success lighten-1"
        top
        timeout="5000"
      >
        {{ success }}

        <template v-slot:action="{ attrs }">
          <v-btn icon fav small v-bind="attrs" @click="snackbar = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
      </v-snackbar>

      <v-toolbar flat class="pa-10 mb-6">
        <v-toolbar-title class="ma-5">
          <v-icon class="mr-5" large color="primary">mdi-account-group</v-icon>
          Comparants
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Chercher un comparant"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Ajouter un comparant
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-radio-group v-model="editedItem.type" row>
                      <v-radio label="Personne Physique" value="PP"></v-radio>
                      <v-radio label="Personne Morale" value="PM"></v-radio>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="editedItem.nom"
                      label="Nom / Raison Social"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    v-if="editedItem.type === 'PP' || editedItem.mineur"
                    cols="12"
                    sm="6"
                  >
                    <v-checkbox
                      v-model="editedItem.mineur"
                      label="Mineur"
                      color="secondary"
                      :value="editedItem.mineur"
                      hide-details
                    ></v-checkbox>
                  </v-col>
                  <!-- <v-col v-if="editedItem.mineur" cols="12" sm="6">
                    <v-select
                      v-model="editedItem.comparent"
                      label="Tutell"
                      :items="comparents"
                      item-text="nom"
                      item-value="id"
                      autocomplete
                    ></v-select>
                  </v-col> -->
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Annuler </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Suivant </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="650px">
          <v-card>
            <v-card-title class="headline">
              Êtes-vous sûr de bien vouloir supprimer ce Comparant?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Non</v-btn>
              <v-btn color="error darken-1" text @click="deleteItemConfirm"
                >Oui, Supprimer</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'
import ComparentService from './../../assets/sevices/comparentService'
import Axios from 'axios'
const comparentService = new ComparentService()
export default {
  data: () => ({
    dialog: false,
    snackbar: false,
    search: '',
    success: null,
    types: { PP: "Personne Physique", PM: "Personne Morale", PPM: "Personne Physique Mineur" },
    dialogForm: false,
    dialogDelete: false,
    headers: [
      { text: 'ID', value: 'id', align: 'start', sortable: false },
      { text: 'Type', value: 'type' },
      { text: 'Nom / Raison social', value: 'nom' },
      { text: "Date d'ajout", value: 'dateAjout' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    comparents: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      type: '',
      nom: '',
      dateAjout: '',
      mineur: false
    },
    defaultItem: {
      id: null,
      type: '',
      nom: '',
      dateAjout: '',
      mineur: false
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Ajouter Nouveau Comparent' : 'Modifier Comparent'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
  },

  methods: {
    initialize() {
      this.success = this.$route.query.success
      if (this.success != null) {
        this.snackbar = true;
      }
      axios
        .get('http://localhost:1337/comparent', { mode: 'cors' })
        .then((resp) => {
          this.comparents = resp.data
        })
        .catch((err) => console.error(err))
    },
    editItem(item) {
      this.$router.push(
        `/comparent/modifier/${item.id}`
      )
    },

    deleteItem(item) {
      this.dialogDelete = true
      this.editedIndex = item.id;
    },

    deleteItemConfirm() {

      console.log(this.editedIndex);
      Axios.delete('http://localhost:1337/comparent/' + this.editedIndex).then(resp => {
        this.comparents = this.comparents.filter(comp => comp.id !== this.editedIndex);
        axios
          .get('http://localhost:1337/comparent', { mode: 'cors' })
          .then((resp) => {
            this.comparents = resp.data
          })
          .catch((err) => console.error(err))
        this.dialogDelete = false;
      }).catch(err => console.error(err));
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.comparents[this.editedIndex], this.editedItem)
      } else {
        this.editedItem.type = this.editedItem.mineur ? 'PPM' : this.editedItem.type
        comparentService.createComparent(this.editedItem.nom, this.editedItem.type)
          .then((resp) => {
            this.$router.push(
              `/comparent/ajouter?id=${resp.data.identifiers[0].id}`
            )
          })
          .catch((err) => console.log(err))
      }
      this.close()
    },
  },
}
</script>
