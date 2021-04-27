<template>
  <div class="mx-10 pa-10">
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="ma-5">Modifier Le Bien</h1>
    <form>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="libelle" label="Titre Foncier"></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-select
            :items="bineTypes"
            v-model="type"
            label="Type"
            item-text="libelle"
            item-value="value"
            @change="typeChanged"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="typeAr"
            label="نوع العقار"
            reverse dir="rtl"
          ></v-text-field>
        </v-col> -->
        <v-col cols="12" md="6">
          <v-text-field v-model="valeur" label="Valeur(DHs)"></v-text-field>
        </v-col>
        <v-col cols="12" md="6"></v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="nb_piece"
            label="Nombre de Pieces"
            type="number"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="Superficie"
            type="number"
            label="Superficie(m2)"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="detailSuperficie"
            type="text"
            label="Details de la Superficie"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="detailSuperficieAr"
            type="text"
            label="تفصيل المساحة"
            reverse
            dir="rtl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" v-if="type !== null">
          <v-card class="rounded-lg">
            <v-row>
              <v-col
                cols="12"
                md="6"
                v-for="detail in details"
                :key="detail"
                class="d-flex justify-center"
              >
                <v-text-field
                  v-model="detail.nb"
                  type="number"
                  style="width: 50px"
                  class="mx-5"
                ></v-text-field>
                <span class="mt-5 px-10">{{ detail.lib }}</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-text-field v-model="address" label="Addresse"></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="addressAr"
            label="العنوان"
            reverse
            dir="rtl"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="ville" label="Ville"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="villeAr"
            label="المدينة"
            reverse
            dir="rtl"
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="4">
          <v-text-field v-model="Immeuble" label="Immeuble"></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="etage" label="Etage"></v-text-field>
        </v-col> -->

        <v-col cols="12">
          <v-text-field
            v-model="description"
            label="Description"
            textarea
          ></v-text-field>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="descriptionAr"
            label="وصف"
            reverse
            dir="rtl"
            textarea
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="12" md="6">
          <v-text-field v-model="ancfcc" label="ANCFCC"></v-text-field>
        </v-col> -->
      </v-row>
      <v-btn color="primary" class="offset-10" @click="enregistrer"
        >Enregistrer</v-btn
      >
    </form>
  </div>
</template>
<script>
import Axios from "axios";
export default {
  async asyncData({ params }) {
    const slug = params.bien;
    return { slug };
  },
  data() {
    return {
      libelle: "",
      type: "",
      ville: "",
      Superficie: null,
      address: "",
      address1: "",
      ville: "",
      description: "",
      etage: null,
      nb_piece: null,
      valeur: null,
      ancfcc: "",
      Immeuble: "",
      terrainType: "",
      snackbar: false,
      error: "",
      details: [],
      detailSuperficie: "",
      typeAr: "",
      descriptionAr: "",
      addressAr: "",
      villeAr: "",
      detailSuperficieAr: ""
    };
  },
  methods: {
    enregistrer() {
      Axios.put("http://localhost:1337/bien/" + this.slug, {
        libelle: this.libelle,
        type: this.type,
        ville: this.ville,
        Superficie: this.Superficie,
        address: this.address + " " + this.address1,
        ville: this.ville,
        description: this.description,
        etage: this.etage,
        nb_piece: this.nb_piece,
        valeur: this.valeur,
        ancfcc: this.ancfcc,
        Immeuble: this.Immeuble,
        terrainType: this.terrainType,
        details: this.details,
        detailSuperficie: this.detailSuperficie,
        typeAr: this.typeAr,
        descriptionAr: this.descriptionAr,
        addressAr: this.addressAr,
        villeAr: this.villeAr,
        detailSuperficieAr: this.detailSuperficieAr
      })
        .then(resp => {
          this.$router.push("/biens?success=Bien est bien modifié");
        })
        .catch(err => {
          this.error = err;
          this.snackbar = true;
        });
    },
    typeChanged() {
      this.details = this.bineTypes.find(
        type => type.value === this.type
      ).details;
      this.typeAr = this.bineTypes.find(
        type => type.value === newval
      ).libelleAr;
    }
  },
  created() {
    Axios.get("http://localhost:1337/data").then(resp => {
      this.bineTypes = resp.data.typeBien;
    });
    Axios.get("http://localhost:1337/bien/" + this.slug).then(resp => {
      this.libelle = resp.data.libelle;
      this.type = resp.data.type;
      this.ville = resp.data.ville;
      this.Superficie = resp.data.Superficie;
      this.address = resp.data.address;
      this.ville = resp.data.ville;
      this.description = resp.data.description;
      this.etage = resp.data.etage;
      this.nb_piece = resp.data.nb_piece;
      this.valeur = resp.data.valeur;
      this.ancfcc = resp.data.ancfcc;
      this.Immeuble = resp.data.Immeuble;
      this.terrainType = resp.data.terrainType;
      this.detailSuperficie = resp.data.detailSuperficie;
      this.typeAr = resp.data.typeAr;
      this.descriptionAr = resp.data.descriptionAr;
      this.addressAr = resp.data.addressAr;
      this.villeAr = resp.data.villeAr;
      this.detailSuperficieAr = resp.data.detailSuperficieAr;
      this.details = JSON.parse(resp.data.details);
    });
  }
};
</script>
