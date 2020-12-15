<template>
  <v-container>
    <div v-if="comparent!=null" class="mx-10 pa-10">
    <EntrepriseForm v-if="comparent.type === 'PM'" :comparent="comparent" />
    <PersonForm v-if="comparent.type === 'PP'" :comparent="comparent" />
    <MineurForm v-if="comparent.type === 'PPM'" :comparent="comparent" />
  </div>
  </v-container>
</template>
<script>
import Axios from 'axios'
import ComparentService from '../../assets/sevices/comparentService.js'
const comparentService = new ComparentService()
export default {
  name: 'Ajoter',
  data() {
    return {
      comparent: null,
    }
  },
  created() {
    Axios.get('http://localhost:1337/comparent/'+this.$route.query.id).then(resp => {
      this.comparent = resp.data.comparent[0];
      console.log(resp.data.comparent[0]);
    }).catch(err => {
      console.log("this error : " , err);
    });
  },
}
</script>
