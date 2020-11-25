<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        {{ "Archive : " + titre }}
      </v-card-title>
      <v-card-text>
        <v-btn
          outlined
          color="primary"
          x-small
          dark
          @click="addFileDialog = true"
        >
          Ajouter un ficher
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
              <v-btn outlined color="error" dark @click="addFileDialog = false">
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
      <v-col cols="4" v-for="file in files" :key="file">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Attachement</div>
              <v-list-item-title class="headline mb-1">
                File 1
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img :src="`http://localhost:1337/${file}`" alt="" srcset="" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              :href="`http://localhost:1337/${file}`"
              target="_blank"
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
      files: [],
      addFileDialog: false,
      newFiles: [],
    }
  },
  created() {
    Axios.get(`http://localhost:1337/archive/${this.archive}`).then(resp => {
      this.titre = resp.data.titre;
      this.description = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel natus facilis provident! Quidem, labore excepturi nulla reiciendis illo possimus aspernatur accusamus inventore obcaecati consectetur blanditiis, facere amet perspiciatis, ex sunt.';
      const filesTab = JSON.parse(resp.data.filesPath);
      this.files = [...filesTab]

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
        const filesTab = JSON.parse(resp.data.filesPath);
        this.files = [...filesTab];
        this.addFileDialog = false;
        this.newFiles = [];

      }).catch(err => console.error(err))
    }
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