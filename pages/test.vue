<template>
  <div>
    <h1>Test</h1>
    <v-btn color="primary" class="ma-2" dark @click="dialog = true">
      Open Dialog 1
    </v-btn>
    <FormDialog v-if="dialog" :dialog="dialog" />
  </div>
</template>
<script>
export default {
  name: 'Test',
  data: () => ({
    dialog: false,
  }),
}
</script>
