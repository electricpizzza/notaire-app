<template>
  <v-form v-if="comparent" ref="form" v-model="valid" lazy-validation>
    <h1 class="formTitle" style="color: #295075; padding: 30px">
      Comparent / Personne Morale
    </h1>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
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
            v-model="representant"
            name="representant"
            :items="representants"
            label="Representant"
            item-value="id"
            item-text="nom"
            multiple
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="Adresse"
            v-bind="Address"
            label="Adresse"
            name="Adresse"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6"> </v-col>
        <v-col cols="12"> </v-col>
      </v-row>
    </v-container>
    <v-btn color="primary" class="offset-10" dark @click="enregistrer"
      >Enregistre</v-btn
    >
  </v-form>
</template>
<script>
import ComparentService from './../../assets/sevices/comparentService.js'
const comparentService = new ComparentService()
export default {
  props: {
    comparent: {
      type: Object
    },
    modifier: {
      type: Boolean,
      default: false,
    }
  },
  data: () => ({
    valid: true,
    comp: '',
    name: '',
    representant: '',
    raisonSociale: '',
    ice: '',
    rc: '',
    cnss: '',
    Adresse: '',
    representants: [],
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
    if (this.modifier) {
      this.raisonSociale = this.comparent.raisonSociale;
      this.ice = this.comparent.ice;
      this.rc = this.comparent.rc;
      this.If = this.comparent.If;
      this.cnss = this.comparent.cnss;
      this.representant = this.comparent.representant;
      this.Adresse = this.comparent.Adresse;
    } else
      this.raisonSociale = this.comparent.nom
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
      if (this.modifier) {
        this.edit();
      } else
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
            this.$router.push(
              `/comparent?success=Comparent était bien enregistré`
            )
          }).catch(err => console.error(err))
    },
    edit() {
      comparentService.editEntreprise(
        this.comparent.comparent,
        this.raisonSociale,
        this.ice,
        this.rc,
        this.If,
        this.cnss,
        this.representant,
        this.Adresse
      ).then(resp => {
        this.$router.push(
          `/comparent?success=Comparent était bien Modifié`
        )
      }).catch(err => console.log(err))
    }
  },
}
</script>
