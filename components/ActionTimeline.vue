<template>
  <v-timeline>
    <v-timeline-item
      v-for="(action, i) in actions.reverse()"
      :key="i"
      :color="action.color"
      small
    >
      <template v-slot:opposite>
        <span
          :class="`headline font-weight-bold ${action.color}--text`"
          v-text="action.year"
        ></span>
      </template>
      <div class="py-4">
        <h2 :class="`headline font-weight-light mb-4 ${action.color}--text`">
          {{ action.titre }}
        </h2>
        <div>
          {{ action.description }}
        </div>
      </div>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default {
  data: () => ({
    actions: [
      {
        color: 'primary',
        year: '01-10-2002',
        titre: 'Ouverture Dossier',
        description: 'Ouverture dossier Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit'
      },
      {
        color: 'cyan',
        year: '21-11-2020',
        titre: 'Ouverture Dossier',
        description: 'Ouverture dossier Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit'
      },
      {
        color: 'error',
        year: '30-11-2020',
        titre: 'Fermeture Dossier',
        description: 'Ouverture dossier Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit'
      },
    ],
  }),
}
</script>