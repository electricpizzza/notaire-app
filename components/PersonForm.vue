<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-col cols="12" sm="6">
        <v-text-field name="Nom" label="Nom" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="nomAr" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12" sm="6">
        <v-text-field name="name" label="label" id="id"></v-text-field>
      </v-col>
      <v-col cols="12"> </v-col>
      <v-col cols="12" sm="6"> </v-col>
      <v-col cols="12" sm="6"> </v-col>
    </v-container>
    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">
      Validate
    </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>

    <v-btn color="warning" @click="resetValidation"> Reset Validation </v-btn>
  </v-form>
</template>
<script>
export default {
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => (v && v.length <= 10) || 'Name must be less than 10 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    select: null,
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4'],
    checkbox: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate()
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>
