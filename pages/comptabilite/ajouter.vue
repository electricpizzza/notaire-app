<template>
  <v-container grid-list-xs> </v-container>
</template>
<script>
import Axios from 'axios'
export default {
  data() {
    return {
      dossier: null,
      description: '',
      dossCombo: []
    }
  },
  created() {
    Axios.get('http://localhost:1337/dossiers').then(resp => {
      this.dossCombo = resp.data;
    })
  }
}
</script>