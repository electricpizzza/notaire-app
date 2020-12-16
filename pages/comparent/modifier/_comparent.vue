<template>
<v-container>
   <div v-if="this.comparent!=null" class="mx-10 pa-10">
    <EntrepriseForm
      v-if="type === 'PM'"
      :comparent="comparent"
      :modifier="true"
    />
    <PersonForm v-if="type === 'PP'" :comparent="comparent" modifier="true" />
    <MineurForm v-if="type === 'PPM'" :comparent="comparent" modifier="true" />
  </div>
</v-container>
</template>
<script>
import Axios from 'axios'
import ComparentService from '../../../assets/sevices/comparentService.js'
const comparentService = new ComparentService()
export default {
  name: 'Ajoter',
  async asyncData({ params }) {
    const comparent = params.comparent
    return { comparent }
  },
  data() {
    return {
      comparent: null,
      type: null,
    }
  },
  beforeCreate() {

  },
  created() {
    Axios.get('http://localhost:1337/comparent/'+this.comparent).then(resp => {
      if (resp.data.comparentInfo[0]===undefined)
        this.$router.push('/comparent/ajouter?id='+resp.data.comparent[0].id);
      this.type = resp.data.comparent[0].type
      this.comparent = resp.data.comparentInfo[0];
    });
  },
}
</script>
