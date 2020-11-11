<template>
  <h1>{{ "Acte " + this.slug }}</h1>
</template>

<script>
export default {
  async asyncData({ params }) {
    const slug = params.acte
    return { slug }
  }
}
</script>