<template>
  <div v-if="comparent" class="mx-10 pa-10">
    <EntrepriseForm v-if="comparent.type === 'PM'" :comparent="comparent" />
    <PersonForm v-if="comparent.type === 'PP'" :comparent="comparent" />
    <MineurForm v-if="comparent.type === 'PPM'" :comparent="comparent" />
  </div>
</template>
<script>
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
    comparentService.getOneComparent(this.$route.query.id).then((resp) => {
      this.comparent = resp.data.comparent[0]
    })
  },
}
</script>
