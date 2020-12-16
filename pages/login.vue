<template>
  <v-card class="mx-auto" max-width="450">
    <v-img
      class="primary--text align-end ma-10"
      height="250px"
      src="/_nuxt/assets/logo.jpeg"
    >
    </v-img>
    <v-card-text class="text--primary">
      <form>
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          label="E-mail"
          required
          @input="$v.email.$touch()"
          @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          :counter="10"
          label="Mot De Pass"
          required
          type="password"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
        ></v-text-field>
        <v-card-actions>
          <v-btn class="mr-4" color="primary" @click="submit">
            Se Connecter
          </v-btn>
          <v-btn nuxt to="/" color="error lighten-1"> Fermer </v-btn>
        </v-card-actions>
      </form>
    </v-card-text>
  </v-card>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, maxLength, email } from 'vuelidate/lib/validators'

import auth from './../assets/store/authStore'

export default {
  mixins: [validationMixin],
  layout: '',
  middleware: 'authentification',
  validations: {
    password: { required, maxLength: maxLength(10) },
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    password: '',
    email: '',
  }),
  created() {
  },

  computed: {

    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.password.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
  created() {
    const usr = auth.user
    console.log(usr);
  },

  methods: {
    submit() {
      this.$v.$touch()

      const usr = auth.login(this.email, this.password)
      if (usr.authenticated) {
        console.log(usr);
        this.$router.push(
          `/inspire`
        )
      }
    },
    clear() {
      this.$v.$reset()
      this.password = ''
      this.email = ''
      this.select = null
      this.checkbox = false
    },
  },
}
</script>