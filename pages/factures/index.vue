<template>
  <v-data-table
    :headers="headers"
    :items="factures"
    sort-by="calories"
    class="elevation-1 mt-4"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>
          <v-icon>mdi-document</v-icon> Les Factures
        </v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Chercher une facture"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        outlined
        color="primary"
        dark
        @click="downloadFacture(item.facture)"
      >
        <v-icon class="mr-2"> mdi-download-box </v-icon>
        Telecharger
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      headers: [
        { text: 'Titre', value: 'titre' },
        { text: 'Dossier', value: 'dossier' },
        { text: 'Date de redaction', value: 'dateCreation' },
        { text: 'Telecharger', value: 'actions', sortable: false, align: 'center' },
      ],
      factures: [
        { titre: 'Facture 1', dossier: 1, dateCreation: '12-11-2020', facture: 'http://localhost:1337' },
        { titre: 'Facture 2223', dossier: 2, dateCreation: '02-10-2020', facture: 'http://localhost:1337' },
        { titre: 'Facture 123', dossier: 2, dateCreation: '23-11-2020', facture: 'http://localhost:1337' }
      ],
    }
  },
}
</script>