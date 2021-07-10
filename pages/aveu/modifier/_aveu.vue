<template>
  <div class="ma-10">
    <v-overlay :value="loading">
      <v-progress-circular
        color="primary"
        indeterminate
        v-model="loading"
      ></v-progress-circular>
    </v-overlay>
    <v-snackbar v-model="snackbar" color="error lighten-1" top>
      {{ error }}
      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="snackbar = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
    <h1 class="px-10">Modefication</h1>
    <v-dialog
      v-model="dialog"
      persistent
      :overlay="true"
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title> </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-autocomplete
                :items="dossiers"
                outlined
                v-model="info.dossier"
                label="Dossier"
                item-text="libelle"
                item-value="id"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="models"
                v-model="info.model"
                item-text="titre"
                value="ref"
                label="Mdele"
              ></v-select>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                :items="['Français', 'العربية']"
                v-model="info.lang"
                label="Langue"
              ></v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions class="d-flex justify-end">
          <v-btn outlined color="primary" nuxt to="/aveu">Anuller</v-btn>
          <v-btn color="primary" @click="rediger">Rediger</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <form>
      <v-row>
        <v-col cols="12" md="6">
          <v-select
            :items="comparents"
            v-model="comparent"
            label="Comparant"
            item-text="nom"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            :items="biens"
            v-model="bien"
            label="Bien"
            item-text="libelle"
            item-value="id"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-card>
            <div class="d-flex justify-lg-space-around">
              <h4>Statue du déclarant :</h4>
              <h4>:صفة صاحب الإقرار</h4>
            </div>
            <div class="d-flex justify-lg-space-around">
              <v-checkbox
                v-model="status"
                label="Propriétaire مالك"
                value="proprietaire"
              ></v-checkbox>
              <v-checkbox
                v-model="status"
                label="exploité مستغل"
                value="exploite"
              ></v-checkbox>
              <v-checkbox
                v-model="status"
                label="Titulaire حائز"
                value="titulaire"
              ></v-checkbox>
            </div>
          </v-card>
        </v-col>
        <v-col cols="12" class="d-flex justify-lg-space-around mt-10">
          <h4>Les Quotas Communes :</h4>
          <h4>:الحصة في الملكية المشاعة</h4>
        </v-col>
        <v-col cols="12" v-for="partie in partieChp" :key="partie.ref">
          <v-row>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="partie.superficie"
                label="Superficie (m2) مساحة"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="partie.accentuation"
                label="Accentuation التنطيق"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="partie.prix"
                label="Prix (DHs) السعر"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field
                v-model="partie.montant"
                label="Le montant dû (DHs) المبلغ المستحق"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <!-- <v-col cols="12" class="d-flex justify-lg-end">
          <v-btn outlined color="primary" small @click="addPartie"
            >Ajouter une Partie</v-btn
          >
        </v-col> -->
        <v-col cols="12">
          <v-text-field
            v-model="partieStr"
            label="Partie "
            id="id"
          ></v-text-field>
        </v-col>
        <h3>Les Reçu :</h3>
        <v-col cols="12" v-for="recu in recus" :key="recu.num">
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field v-model="recu.annee" label="Année"></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="recu.num"
                label="Numero de Reçu"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                v-model="recu.date"
                label="Date de Reçu"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" class="d-flex justify-lg-end">
          <v-btn outlined color="primary" small @click="addRecu"
            >Ajouter un reçu</v-btn
          >
        </v-col>

        <v-col cols="12" class="d-flex justify-md-space-around">
          <v-btn color="primary" nuxt to="/aveu">
            <v-icon>mdi-chevron-left</v-icon> Retour
          </v-btn>
          <v-btn color="primary" @click="enregistrer">Eenregistrer</v-btn>
        </v-col>
      </v-row>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  async asyncData({ params }) {
    const slug = params.aveu;
    return { slug };
  },
  data() {
    return {
      dialog: false,
      loading: false,
      error: "",
      snackbar: false,
      info: {
        lang: "",
        dossier: null,
        model: null
      },
      models: [],
      dossiers: [],
      status: "",
      recus: [],
      partieChp: [],
      partieStr: "",
      comparents: [],
      biens: [],
      bien: "",
      comparent: ""
    };
  },
  created() {
    Axios.get("https://notaitre-api.herokuapp.com/comparent/").then(resp => {
      this.comparents = resp.data;
    });
    Axios.get("https://notaitre-api.herokuapp.com/bien/").then(resp => {
      this.biens = resp.data;
    });
    Axios.get("https://notaitre-api.herokuapp.com/aveu/" + this.slug).then(
      resp => {
        this.bien = resp.data.bien;
        this.comparent = resp.data.comparent;
        this.partieChp = resp.data.partieChp;
        this.partieStr = resp.data.partieStr;
        this.recus = resp.data.recu;
        this.status = resp.data.status;
      }
    );
  },
  methods: {
    rediger() {
      if (
        this.info.lang !== "" &&
        this.info.dossier !== null &&
        this.info.model !== null
      ) {
        const comps = JSON.parse(
          this.dossiers.find(dos => dos.id === this.info.dossier).comparents
        );
        const bns = JSON.parse(
          this.dossiers.find(dos => dos.id === this.info.dossier).bien
        );
        comps.forEach(comp => {
          Axios.get(
            "https://notaitre-api.herokuapp.com/comparent/" + comp
          ).then(resp => {
            this.comparents.push(resp.data.comparent[0]);
          });
        });
        bns.forEach(bien => {
          Axios.get("https://notaitre-api.herokuapp.com/bien/" + bien).then(
            resp => {
              this.biens.push(resp.data);
            }
          );
        });
        this.dialog = false;
      }
    },
    addRecu() {
      this.recus.push({
        annee: 2020,
        num: "",
        date: new Date().toLocaleString().split(",")[0]
      });
    },
    addPartie() {
      // this.partieChp.push({ feild1: '', feild2: '', feild3: '' })
    },
    enregistrer() {
      this.loading = true;
      Axios.put("https://notaitre-api.herokuapp.com/aveu/" + this.slug, {
        comparent: this.comparent,
        bien: this.bien,
        status: this.status,
        partieChp: this.partieChp,
        partieStr: this.partieStr,
        recu: this.recus
      })
        .then(resp => {
          this.loading = false;
          this.$router.push("/aveu?success=Aveu était beien modifié");
        })
        .catch(err => {
          this.loading = false;
          this.error = err;
          this.snackbar = true;
        });
    }
  }
};
</script>

<style lang="scss" scoped></style>
