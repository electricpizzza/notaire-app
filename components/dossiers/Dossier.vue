<template>
  <v-card class="mx-auto">
    <v-card-text class="text-left">
      <div>DOC 01</div>
      <p class="display-1 text--primary text-capitalize">
        Dossier 1 - hamid tadlaoui
      </p>
      <v-row class="text-capitalize ma-3">
        <v-col cols="12" md="6">
          <b>Nature Du dossier:</b> Vente imobilier
        </v-col>
        <v-col cols="12" md="6">
          <b>Notaire Du dossier:</b> Maitre Abdel hamid rochdi
        </v-col>
        <v-col cols="12" md="6"> <b>date ouverture:</b> 12/10/2020 </v-col>
        <v-col cols="12" md="6" v-if="dateFermeture">
          <b>date de Fermeture:</b> 12/10/2020
        </v-col>
        <v-col cols="12" md="6" v-else>
          <v-btn outline color="error" dark>Fermer Dossier</v-btn>
        </v-col>
      </v-row>
      <v-divider class="mb-2"></v-divider>
      <div class="text--primary">
        <v-card class="my-5">
          <v-card-title>
            <h2 style="color: #508bd7" class="mr-4 mt-2">Comparant(s):</h2>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn color="primary" dark fab icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headersComp"
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>
        <v-card class="my-5">
          <v-card-title>
            <h2 style="color: #508bd7" class="mr-4 mt-2">Bien(s):</h2>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-btn color="primary" dark fab icon>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-card-title>
          <v-data-table
            :headers="headersBien"
            :items="desserts"
            :search="search"
          ></v-data-table>
        </v-card>
      </div>
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col cols="12" md="8">
          <v-btn text color="teal accent-4" @click="reveal = true">
            Actes & Documents
          </v-btn>
        </v-col>
        <v-col cols="12" md="4">
          <v-btn color="success" class="ms-4">Modifier</v-btn>
          <v-btn color="error" class="ms-2">Suprimer</v-btn>
        </v-col>
      </v-row>
    </v-card-actions>

    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
      >
        <v-card-text class="pb-0">
          <p class="display-1 text--primary">Origin</p>
          <p>
            late 16th century (as a noun denoting a place where alms were
            distributed): from medieval Latin eleemosynarius, from late Latin
            eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’
          </p>
        </v-card-text>
        <v-card-actions class="pt-0">
          <v-btn text color="teal accent-4" @click="reveal = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    reveal: false,
    search: '',
    dateFermeture: null,
    headersComp: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Type', value: 'type' },
      { text: 'Nom / Raison Social', value: 'nom' },
      { text: 'Date Ajout', value: 'dateAjout' },
    ],
    headersBien: [
      {
        text: 'ID',
        align: 'start',
        filterable: false,
        value: 'id',
      },
      { text: 'Calories', value: 'calories' },
      { text: 'Fat (g)', value: 'fat' },
      { text: 'Carbs (g)', value: 'carbs' },
      { text: 'Protein (g)', value: 'protein' },
      { text: 'Iron (%)', value: 'iron' },
    ],
    desserts: [
      {
        name: 'Frozen Yogurt',
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: '1%',
      },
      {
        name: 'Ice cream sandwich',
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: '1%',
      },
    ],
  }),
  comparents: [],
  biens: [],
}
</script>
<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
</style>