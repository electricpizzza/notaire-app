<template>
  <div>
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
          :href="`http://localhost:1337/${mainFile}`"
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
              <img :src="`http://localhost:1337/${file}`" alt="" srcset="" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              color="info"
              :href="`http://localhost:1337/${file}`"
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
import Axios from 'axios'
export default {
  async asyncData({ params }) {
    const archive = params.archive
    return { archive }
  },
  data() {
    return {
      titre: '',
      dossier: 1,
      description: '',
      mainFile: '',
      files: [],
      addFileDialog: false,
      newFiles: [],
    }
  },
  created() {
    Axios.get(`http://localhost:1337/archive/${this.archive}`).then(resp => {
      this.titre = resp.data.titre;
      this.description = resp.data.description;
      this.mainFile = resp.data.mainFile;
      this.files = [...resp.data.filesPath]

    })
  },
  methods: {
    fileUpload() {
      this.newFiles.push(...this.$refs.file.files);
    },
    addFile() {
      let formData = new FormData();
      this.newFiles.forEach(file => {
        formData.append('files', file, name.name);
      });

      Axios.post(`http://localhost:1337/archive/addFiles/${this.archive}`, formData).then(resp => {

        this.files = [...resp.data.filesPath];
        this.addFileDialog = false;
        this.newFiles = [];

      }).catch(err => console.error(err))
    },

  },

}
</script>
<style lang="css">
  .img-field::-webkit-file-upload-button {
    color: white;
    display: inline-block;
    background: #1CB6E0;
    border: none;
    padding: 7px 15px;
    font-weight: 700;
    border-radius: 3px;
    white-space: nowrap;
    cursor: pointer;
    font-size: 10pt;
    width:100px;
    height:100px;
  }
</style>