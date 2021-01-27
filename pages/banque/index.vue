<template>
  <div>
    <v-dialog
      v-model="dialogDel"
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          Voulez vous vraiment suprimer cette banque ?
        </v-card-title>
        <v-card-actions class="d-flex justify-lg-space-around">
          <v-btn color="primary" @click="cancel">Non</v-btn>
          <v-btn color="error lighten-1" @click="del">Oui, Suprimer</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title>
        <h3 class="formTitle" style="color: #295075; padding: 30px">Banques</h3>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="primary" nuxt to="/banque/ajouter"
          >Ajouter une Banque</v-btn
        >
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="banques"
        :expanded.sync="expanded"
        :single-expand="true"
        :search="search"
        item-key="id"
        show-expand
        class="elevation-1"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <div class="d-flex justify-end">
              <v-btn color="success" nuxt :to="'/banque/modifier/' + item.id"
                >Modifier</v-btn
              >
              <v-btn color="error lighten-1" @click="remove(item.id)"
                >Suprimer</v-btn
              >
            </div>
          </td>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Tite',
          align: 'start',
          sortable: false,
          value: 'nom',
        },
        { text: 'Agence', value: 'Agence' },
        { text: 'Ville', value: 'ville' },
      ],
      banques: [],
      dialogDel: false,
      loading: false,
      toDelete: null,
    }
  },
  created() {
    Axios.get('http://localhost:1337/comparent/banques').then(resp => {
      console.log(resp);
      this.banques = resp.data;
    })
  },
  methods: {
    remove(id) {
      this.dialogDel = true;
      this.toDelete = id;
    },
    del() {
      this.loading = true
      Axios.delete('http://localhost:1337/comparent/' + this.toDelete).then(resp => {
        console.log(resp.data);
        this.loading = false;
        this.dialogDel = false;
        this.banques = this.banques.filter(bnq => bnq.id !== this.toDelete)
      }).catch((err) => {
        console.error(err);
        this.loading = false;
        this.dialogDel = false;
      });
    },
    cancel() {
      this.toDelete = null;
      this.dialogDel = false;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>