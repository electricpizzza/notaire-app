<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          class="mt-5"
        >
          <v-list-item-action>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-spacer />
      <v-btn
        class="mx-3 miniVariant"
        icon
        outlined
        @click.stop="miniVariant = !miniVariant"
        color="primary"
      >
        <v-icon>mdi-{{ `chevron-${miniVariant ? "right" : "left"}` }}</v-icon>
      </v-btn>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <!-- <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn> -->
      <nuxt-link to="/" class="shadow">
        <img
          src="~/assets/logo.jpeg"
          alt="Logo"
          width="75px"
          height="75px"
          class="mx-3"
        />
      </nuxt-link>
      <v-row align="center" justify="space-around">
        <!-- <v-btn tile color="info" nuxt to="/dossiers/ajouter">
          <v-icon left> mdi-folder </v-icon>
          Creer Un Dossier
        </v-btn>
        <v-btn tile nuxt to="/actes/ajouter">
          <v-icon left> mdi-pencil </v-icon>
          Creer Un Acte
        </v-btn>
        <v-btn tile color="error lighten-1" nuxt to="/modeles/ajouter">
          <v-icon left> mdi-plus </v-icon>
          Creer Un model
        </v-btn> -->
      </v-row>
      <!-- <v-toolbar-title v-text="title" /> -->
      <v-spacer />
      <create-menu />
      <v-btn icon @click.stop="rightDrawer = !rightDrawer" outlined fab>
        <!-- <v-icon>mdi-format-list-bulleted-square</v-icon> -->
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>
            <h3><v-icon light> mdi-account </v-icon> Acount</h3>
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout" class="btn">
          <v-list-item-action>
            <v-icon light> mdi-logout </v-icon>
          </v-list-item-action>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import createMenu from '~/components/createMenu.vue'
export default {
  components: { createMenu },
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
          icon: 'mdi-folder-network',
          title: 'Workshop',
          to: '/home'
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
        {
          icon: 'mdi-archive',
          title: 'Archives',
          to: '/archives'
        },

      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Notary',
    }
  },
  methods: {
    logout() {

    }
  },
}
</script>
<style lang="css">
  .minifVariant{
    position: absolute;
    top: 80px;
  }
  .btn{
    cursor: pointer;
  }
</style>