<template>
  <div v-if="comparent">
    <EntrepriseForm
      v-if="comparent.type === 'Personne Morale'"
      :comparent="comparent"
    />
    <PersonForm v-if="comparent.type === 'Personne Pysique'" />
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
  beforeCreate() {
    comparentService.getOneComparent(this.$route.query.id).then((resp) => {
      this.comparent = resp.data.comparent[0]
    })
  },
}
</script>
