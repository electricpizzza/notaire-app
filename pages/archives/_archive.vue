<template>
  <div>
    <v-overlay :value="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        v-model="loading"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <v-card>
      <v-card-title primary-title>
        <h2>{{ "Archive : " + titre }}</h2>
      </v-card-title>
      <v-card-text>
        <p>{{ description }}</p>
        <v-btn outlined color="primary" dark @click="addFileDialog = true">
          Ajouter un ficher
        </v-btn>
        <v-btn
          outlined
          color="info"
          dark
          target="_blank"
          :href="`https://notaitre-api.herokuapp.com/${mainFile}`"
          download
        >
          Telecharger l'Archive
        </v-btn>

        <v-dialog
          v-model="addFileDialog"
          scrollable
          persistent
          :overlay="false"
          width="500px"
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title primary-title> Ajouter un ficher </v-card-title>
            <v-card-text>
              <div
                v-for="(file, index) in newFiles"
                :key="index"
                class="img-show ma-3"
              >
                <img src="" alt="" srcset="" />
                <span>{{ file.name }}</span>
              </div>
              <input
                type="file"
                id="file"
                ref="file"
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                multiple
                v-on:change="fileUpload()"
                class="img-field ma-3"
              />
            </v-card-text>
            <v-card-actions>
              <v-btn
                outlined
                color="error lighten-1"
                dark
                @click="addFileDialog = false"
              >
                Anuller
              </v-btn>
              <v-btn outlined color="primary" dark @click="addFile">
                Ajouter
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="12" md="4" v-for="(file, index) in files" :key="index">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Attachement</div>
              <v-list-item-title class="headline mb-1">
                File {{ index + 1 }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ file.replace("uploads/", "") }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img
                :src="`https://notaitre-api.herokuapp.com/${file}`"
                alt=""
                srcset=""
              />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              color="info"
              :href="`https://notaitre-api.herokuapp.com/${file}`"
              target="_blank"
              class="px-5"
            >
              Ouvrir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  async asyncData({ params }) {
    const archive = params.archive;
    return { archive };
  },
  data() {
    return {
      titre: "",
      dossier: 1,
      description: "",
      mainFile: "",
      files: [],
      addFileDialog: false,
      newFiles: [],
      loading: false,
      error: "",
      snackbar: false
    };
  },
  created() {
    Axios.get(
      `https://notaitre-api.herokuapp.com/archive/${this.archive}`
    ).then(resp => {
      this.titre = resp.data.titre;
      this.description = resp.data.description;
      this.mainFile = resp.data.mainFile;
      this.files = [...resp.data.filesPath];
    });
  },
  methods: {
    fileUpload() {
      this.newFiles.push(...this.$refs.file.files);
    },
    addFile() {
      this.loading = false;
      let formData = new FormData();
      this.newFiles.forEach(file => {
        formData.append("files", file, file.name);
      });

      Axios.post(
        `https://notaitre-api.herokuapp.com/archive/addFiles/${this.archive}`,
        formData
      )
        .then(resp => {
          this.files = [...resp.data.filesPath];
          this.addFileDialog = false;
          this.newFiles = [];
        })
        .catch(err => {
          this.loading = false;
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>
<style lang="css">
.img-field::-webkit-file-upload-button {
  color: white;
  display: inline-block;
  background: #1cb6e0;
  border: none;
  padding: 7px 15px;
  font-weight: 700;
  border-radius: 3px;
  white-space: nowrap;
  cursor: pointer;
  font-size: 10pt;
  width: 100px;
  height: 100px;
}
</style>
