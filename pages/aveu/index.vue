<template>
  <v-card>
    <v-snackbar v-model="snackbar" color="success lighten-1" top timeout="5000">
      {{ success }}

      <template v-slot:action="{ attrs }">
        <v-btn icon fav small v-bind="attrs" @click="snackbar = false">
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
    <v-card-title>
      <h3 class="ma-5">
        <v-icon class="mr-4" color="primary" large>mdi-domain</v-icon> إقرار
      </h3>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-btn color="primary" class="ma-5" nuxt to="/aveu/ajouter"
        ><v-icon>mdi-plus</v-icon> Ajouter</v-btn
      >
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="aveus"
      :expanded.sync="expanded"
      :single-expand="true"
      :search="search"
      item-key="id"
      show-expand
      class="elevation-1"
    >
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          <v-row class="mx-4">
            <v-col cols="12">
              <div class="offset-7">
                <v-btn
                  color="primary"
                  nuxt
                  target="_blank"
                  :to="'/aveu/' + item.id"
                  >Imprimer</v-btn
                >
                <v-btn color="success" nuxt :to="'/aveu/modifier/' + item.id"
                  >Modifier</v-btn
                >
                <v-btn color="error lighten-1" @click="remove(item.id)"
                  >Suprimer</v-btn
                >
              </div>
            </v-col>
          </v-row>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      aveus: [],
      loading: false,
      search: '',
      snackbar: false,
      success: null,
      expanded: [],
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'id',
        },
        { text: 'Status', value: 'status' },
        { text: '', value: 'data-table-expand' },
      ],
      error: '',
    }
  },
  created() {
    Axios.get('http://localhost:1337/aveu').then(resp => {
      console.log(resp.data);
      this.aveus = resp.data;
    }).catch(err => {
      console.error(err);
    });
    this.success = this.$route.query.success
    if (this.success != null) {
      this.snackbar = true;
    }
  },
  methods: {
    remove(id) {
      this.loading = true;
      Axios.delete('http://localhost:1337/aveu/' + id).then(resp => {
        this.aveus = this.aveus.filter(aveu => aveu.id !== id);
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>