<template>
  <v-container class="pa-10">
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
            accept="image/jpeg,image/jpg,image/png,application/pdf"
            @change="fileUpload"
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
      <img :src="testimage" alt="" srcset="" />
      <v-btn color="primary" class="offset-10" dark @click="enregistrer">
        Enregistrer
      </v-btn>
    </form>
  </v-container>
</template>
<script>
import Axios from "axios";
export default {
  data() {
    return {
      files: [],
      dossier: "",
      titre: "",
      description: "",
      testimage: "",
      loading: false,
      error: "",
      snackbar: false
    };
  },
  created() {},
  methods: {
    fileUpload() {
      this.testimage = this.$refs.file.files[0].webkitRelativePath;
      this.files.push(...this.$refs.file.files);
    },
    enregistrer() {
      this.loading = true;
      let formData = new FormData();
      this.files.forEach(file => {
        formData.append("files", file, file.name);
      });
      formData.append("titre", this.titre);
      formData.append("dossier", this.dossier);
      formData.append("description", this.description);
      Axios.post("http://localhost:1337/archive", formData)
        .then(resp => {
          this.loading = false;
          this.$router.push(`/archives?success=Archive est bien enregistré`);
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
.img-show {
  width: 100px;
  height: 100px;
  background-color: lightcyan;
  background-image: url("/_nuxt/assets/placeholder.png");
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.file-show {
  display: flex;
  flex-wrap: wrap;
}
</style>
