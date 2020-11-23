<template>
  <v-row>
    <v-col class="text-center">
      <img
        src="~/assets/logo.jpeg"
        alt="Vuetify.js"
        class="mb-5"
        width="140px"
      />
      <blockquote class="blockquote">
        &#8220;Bonjour .&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
  </v-row>
</template>
<script>
import authStore from '~/assets/store/authStore'
export default {
  middleware: 'authentification',
  created() {
    const usr = authStore.user;
    console.log(usr);
  },

}
</script>