<template>
  <v-form v-if="comparent" ref="form" v-model="valid" lazy-validation>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            id="raisonSociale"
            v-model="raisonSociale"
            name="raisonSociale"
            label="Raison Sociale"
            value="id"
            text="nom"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="ice"
            v-model="ice"
            name="ice"
            label="I.C.E"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="rc"
            v-model="rc"
            name="rc"
            label="R.C"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-text-field
            id="cnss"
            v-model="cnss"
            name="cnss"
            label="C.N.S.S"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6">
          <v-select
            id="representant"
            v-model="representant"
            name="representant"
            :items="representants"
            label="Representant"
            item-value="id"
            item-text="nom"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Adresse"
            label="Adresse"
            name="Adresse"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6"> </v-col>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
    <v-btn outline color="primary" class="offset-10" dark @click="enregistrer"
      >Enregistre</v-btn
    >
  </v-form>
</template>
<script>
import ComparentService from '../assets/sevices/comparentService'
const comparentService = new ComparentService()
export default {
  props: ['comparent'],
  data: () => ({
    valid: true,
    comp: '',
    name: '',
    representant: '',
    raisonSociale: '',
    ice: '',
    rc: '',
    If: '',
    cnss: '',
    Adresse: '',
    representants: [],
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
  beforeCreate() {
    comparentService.getAllComparents().then((resp) => {
      this.representants = resp.data
    })
  },
  created() {
    console.log(this.comparent)
  },

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
    enregistrer() {
      comparentService
        .saveEntreprise(
          this.comparent.id,
          this.raisonSociale,
          this.ice,
          this.rc,
          this.If,
          this.cnss,
          this.representant,
          this.Adresse
        )
        .then((resp) => {
          console.log(resp)
        })
    },
  },
}
</script>
