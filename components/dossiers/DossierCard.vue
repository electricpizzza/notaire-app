<template>
  <v-card class="mx-auto" color="primary" dark min-height="250px">
    <v-card-title>
      <v-icon large left> mdi-folder </v-icon>
      <span class="title font-weight-light headline">{{ dossier.title }}</span>
    </v-card-title>

    <v-card-text>
      {{ dossier.description }}
      ...
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>{{ dossier.NomMaitre }}</v-list-item-title>
        </v-list-item-content>

        <v-row align="center" justify="end">
          <nuxt-link
            :to="`/dossiers/modifier/${dossier.id}`"
            style="color: #fff; text-decoration: none"
          >
            <v-icon class="mr-1"> mdi-pencil </v-icon>
            <span class="subheading mr-2">Modifier</span>
          </nuxt-link>
          <span class="mr-1">·</span>
          <nuxt-link
            :to="`/dossiers/${dossier.id}`"
            style="color: #fff; text-decoration: none"
          >
            <v-icon class="mr-1"> mdi-eye </v-icon>
            <span class="subheading">Consulter</span>
          </nuxt-link>
        </v-row>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from 'axios'
export default {
  props: {
    dossier: {
      type: Object,
    }
  },
  data: () => ({
    //
  }),
  created() {
    console.log(this.dossier);
  },
}
</script>