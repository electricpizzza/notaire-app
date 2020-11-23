<template>
  <v-data-iterator
    :items="items"
    :items-per-page.sync="itemsPerPage"
    :page="page"
    :search="search"
    :sort-by="sortBy.toLowerCase()"
    :sort-desc="sortDesc"
    hide-default-footer
    color="primary"
    class="ma-0"
  >
    <template v-slot:header>
      <v-toolbar dark color="blue darken-3" class="mb-1">
        <v-text-field
          v-model="search"
          clearable
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field>
        <template v-if="$vuetify.breakpoint.mdAndUp">
          <v-spacer></v-spacer>
          <v-select
            v-model="sortBy"
            flat
            solo-inverted
            hide-details
            :items="keys"
            prepend-inner-icon="mdi-magnify"
            label="Sort by"
          ></v-select>
          <v-spacer></v-spacer>
          <v-btn outline color="primary" dark @click="dialog = true"
            >Ajouter</v-btn
          >
          <v-dialog v-model="dialog" width="900">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Créer Un nouveau archive
              </v-card-title>

              <v-card-text>
                <v-row justify="center">
                  <v-col>
                    <v-text-field
                      v-model="titre"
                      label="Titre"
                      id="id"
                    ></v-text-field>
                    <v-select
                      :items="items"
                      v-model="dossier"
                      label="Dossier"
                    ></v-select>
                  </v-col>
                  <v-col cols="12">
                    <v-sheet elevation="10" rounded="xl">
                      <v-sheet
                        class="pa-3 primary text-right"
                        dark
                        rounded="t-xl"
                      >
                        <v-btn icon @click="seeFile">
                          <v-icon>mdi-content-save-cog-outline</v-icon>
                        </v-btn>

                        <v-btn class="ml-2" icon>
                          <v-icon>mdi-check-bold</v-icon>
                        </v-btn>
                      </v-sheet>

                      <div class="pa-4">
                        <v-chip-group active-class="primary--text" column>
                          <v-chip v-for="tag in tags" :key="tag">
                            {{ tag }}
                          </v-chip>
                          <v-file-input
                            accept="image/*"
                            label="File input"
                            v-model="file"
                          ></v-file-input>
                        </v-chip-group>
                      </div>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="valider"> Valider </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-toolbar>
    </template>

    <template v-slot:default="props">
      <v-row>
        <v-col
          v-for="item in props.items"
          :key="item.name"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card class="mx-auto" max-width="344" outlined>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="overline mb-4">Archive</div>
                <v-list-item-title class="headline mb-1">
                  {{ item.titre }}
                </v-list-item-title>
                <v-list-item-subtitle
                  >Greyhound divisely hello coldly
                  fonwderfully</v-list-item-subtitle
                >
              </v-list-item-content>

              <v-list-item-avatar
                tile
                size="80"
                color="grey"
              ></v-list-item-avatar>
            </v-list-item>

            <v-card-actions>
              <v-btn
                outlined
                rounded
                text
                color="primary"
                class="offset-7"
                nuxt
                :to="`/archives/${item.id}`"
              >
                Consulter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-slot:footer>
      <v-row class="ma-2" align="center" justify="center">
        <span class="grey--text">Items per page</span>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              text
              color="primary"
              class="ml-2"
              v-bind="attrs"
              v-on="on"
            >
              {{ itemsPerPage }}
              <v-icon>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(number, index) in itemsPerPageArray"
              :key="index"
              @click="updateItemsPerPage(number)"
            >
              <v-list-item-title>{{ number }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-spacer></v-spacer>

        <span class="mr-4 grey--text">
          Page {{ page }} of {{ numberOfPages }}
        </span>
        <v-btn fab dark color="blue darken-3" class="mr-1" @click="formerPage">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-btn fab dark color="blue darken-3" class="ml-1" @click="nextPage">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-row>
    </template>
  </v-data-iterator>
</template>
<script>
import Axios from 'axios'

export default {
  data() {
    return {
      dialog: false,
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 4,
      sortBy: 'titre',
      keys: [
        'titre',
        'Dossier',
        'Description'
      ],
      tags: [],
      items: [],
      file: null,
      titre: '',
      dossier: null,
      description: '',
      files: [],
    }
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage)
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name')
    },
  },
  created() {
    Axios.get('http://localhost:1337/archive').then(resp => {
      this.items = resp.data
      console.log(resp.data);
    }).catch(err => console.error(err))
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number
    },
    seeFile() {
      console.log(this.file);
    },
    valider() {

      let formData = new FormData();
      console.log(formData);

      // formData.append('files', this.file);
      formData.append('titre', this.titre);
      console.log(formData);

      // formData.append('dossiers', this.dossier);
      // Axios.post('http://localhost:1337/archive', {
      //   data: formData
      // }
      // ).then(resp => {
      //   console.log(resp);
      // })
    },
  },
}
</script>
<style lang="css" scoped>
  .v-card{
    background-image: url('https://raw.githubusercontent.com/electricpizzza/BloodDonation/master/public/img/background.png');
  }
</style>