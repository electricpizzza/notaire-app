<template>
  <div>
    <form action="http://localhost:1337/archive" method="post">
      <v-text-field name="titre" label="Titre" id="id"></v-text-field>
      <v-file-input
        accept="image/*"
        label="File input"
        v-model="file"
        name="files"
      ></v-file-input>
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>