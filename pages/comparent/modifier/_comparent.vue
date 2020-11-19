<template>
  <div v-if="comparent">
    <EntrepriseForm
      v-if="type === 'PM'"
      :comparent="comparent"
      :modifier="true"
    />
    <PersonForm v-if="type === 'PP'" :comparent="comparent" modifier="true" />
    <MineurForm v-if="type === 'PPM'" :comparent="comparent" modifier="true" />
  </div>
</template>
<script>
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
    comparentService.getOneComparent(this.comparent).then((resp) => {
      this.type = resp.data.comparent[0].type
      this.comparent = resp.data.comparentInfo[0];
    })
  },
}
</script>
