<template>
  <div class="container">
    <div class="large-12 medium-12 small-12 cell">
      <label
        >File
        <input
          type="file"
          id="file"
          ref="file"
          v-on:change="handleFileUpload()"
        />
      </label>
      <button v-on:click="submitFile()">Submit</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  /*
    Defines the data used by the component
  */
  data() {
    return {
      file: ''
    }
  },

  methods: {
    /*
      Submits the file to the server
    */
    submitFile() {
      /*
              Initialize the form data
          */
      let formData = new FormData();

      /*
          Add the form data we need to submit
      */
      formData.append('files', this.file, 'file.jpg');
      formData.append('titre', 'Archive 2');
      formData.append('dossier', 1);
      const data = formData.getAll('files');

      /*
        Make the request to the POST /single-file URL
      */
      Axios.post('http://localhost:1337/archive',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function (resp) {
        console.log('SUCCESS!!', resp);

      })
        .catch(function () {
          console.log('FAILURE!!');
        });
    },

    /*
      Handles a change on the file upload
    */
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
}
</script>