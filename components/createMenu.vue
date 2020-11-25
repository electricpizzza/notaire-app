<template>
  <v-speed-dial
    v-model="fab"
    direction="left"
    transition="slide-y-reverse-transition"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" icon color="#073a65" class="mr-5" dark outlined fab>
        <v-icon v-if="fab"> mdi-close </v-icon>
        <v-icon v-else> mdi-plus </v-icon>
      </v-btn>
    </template>
    <v-btn dark color="#073a65" title nuxt to="/devis/ajouter">
      <v-icon class="mr-3">mdi-file</v-icon> Creer Un Devis
    </v-btn>
    <v-btn dark color="#073a65" title nuxt to="/modeles/ajouter">
      <v-icon class="mr-3">mdi-pencil</v-icon> Creer Un modele
    </v-btn>
    <v-btn dark color="#073a65" title nuxt to="/actes/ajouter">
      <v-icon class="mr-3">mdi-gavel</v-icon> Creer Un Acte
    </v-btn>
    <v-btn dark color="#073a65" title nuxt to="/dossiers/ajouter">
      <v-icon class="mr-3">mdi-folder</v-icon> Creer Un Dossier
    </v-btn>
  </v-speed-dial>
</template>
<script>
export default {
  data: () => ({
    fab: false,
    tabs: null,
  }),

  computed: {
    activeFab() {
      switch (this.tabs) {
        case 'one': return { class: 'purple', icon: 'account_circle' }
        case 'two': return { class: 'red', icon: 'edit' }
        case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
        default: return {}
      }
    },
  },

  watch: {
    top(val) {
      this.bottom = !val
    },
    right(val) {
      this.left = !val
    },
    bottom(val) {
      this.top = !val
    },
    left(val) {
      this.right = !val
    },
  },
}
</script>
<style>
  /* This is for documentation purposes and will not be needed in your application */


  #create .v-btn--floating {
    position: relative;
  }
</style>