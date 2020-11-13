<template>
  <v-data-table
    :headers="headers"
    :items="comparents"
    sort-by="calories"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-alert dense text type="success" dismissible v-if="success">
        {{ success }}
      </v-alert>
      <v-toolbar flat class="pa-10">
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
                  <v-col v-if="editedItem.mineur" cols="12" sm="6">
                    <v-select
                      v-model="editedItem.comparent"
                      label="Tutell"
                      :items="comparents"
                      item-text="nom"
                      item-value="id"
                      autocomplete
                    ></v-select>
                  </v-col>
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="headline"
              >Are you sure you want to delete this item?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
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
const comparentService = new ComparentService()
export default {
  data: () => ({
    dialog: false,
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
      axios
        .get('http://localhost:1337/comparent', { mode: 'cors' })
        .then((resp) => {
          this.comparents = resp.data
        })
        .catch((err) => console.error(err))
    },
    editItem(item) {
      this.editedIndex = this.comparents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.comparents.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.comparents.splice(this.editedIndex, 1)
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
