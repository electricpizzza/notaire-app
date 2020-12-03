<template>
  <v-container class="pa-10">
    <h2>Créer Un Nouveau Archive</h2>
    <form>
      <v-row>
        <v-col cols="6" md="12">
          <v-text-field v-model="titre" label="Titre" id="id"></v-text-field>
        </v-col>
        <v-col cols="6" md="12">
          <v-text-field
            v-model="dossier"
            label="Dossier"
            id="id"
          ></v-text-field>
        </v-col>
        <h4 style="color: gray" class="ml-3">Fichiers :</h4>
        <v-col cols="12" class="file-show">
          <div
            v-for="(file, index) in files"
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
            v-on:change="fileUpload()"
            class="img-field ma-3"
            multiple
          />
        </v-col>
        <v-col cols="12">
          <v-textarea
            v-model="description"
            filled
            label="Description"
            auto-grow
          ></v-textarea>
        </v-col>
      </v-row>
      <v-btn color="primary" class="offset-10" dark @click="enregistrer"
        >Enregistrer</v-btn
      >
    </form>
  </v-container>
</template>
<script>
import Axios from 'axios';
export default {
  data() {
    return {
      files: [],
      dossier: '',
      titre: '',
      description: '',
    }
  },
  created() {

  },
  methods: {
    fileUpload() {
      this.files.push(...this.$refs.file.files);
      console.log(this.files);
    },
    enregistrer() {
      let formData = new FormData();
      this.files.forEach(file => {
        formData.append('files', file, name.name);
      });
      formData.append('titre', this.titre);
      formData.append('dossier', this.dossier);
      formData.append('description', this.dossier);
      Axios.post('http://localhost:1337/archive', formData).then(resp => {
        console.log(resp);
      }).catch(err => console.error(err))
    }
  },
}
</script>
<style lang="css">
  .img-field::-webkit-file-upload-button {
    color: white;
    display: inline-block;
    background: #1c81e0c0;
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
  .img-showd{
        width: 100px;
    height: 100px;
    background-color: gainsboro;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .file-show{
    display: flex;
    flex-wrap: wrap;
  }
</style>