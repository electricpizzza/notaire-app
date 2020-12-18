<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <nuxt-link to="/" class="shadow">
        <img
          src="~/assets/logo.jpeg"
          alt="Logo"
          width="75px"
          height="75px"
          class="mx-3"
        />
      </nuxt-link>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Notary',
          to: '/',
        },
        {
          icon: 'mdi-folder',
          title: 'Dossiers',
          to: '/dossiers',
        },
        {
          icon: 'mdi-account-group',
          title: 'Comparants',
          to: '/comparent',
        },
        {
          icon: 'mdi-domain',
          title: 'Biens',
          to: '/biens',
        },
        {
          icon: 'mdi-gavel',
          title: 'Actes',
          to: '/actes',
        },
        {
          icon: 'mdi-pencil',
          title: 'Models',
          to: '/modeles',
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Notary',
    }
  },
}
</script>
