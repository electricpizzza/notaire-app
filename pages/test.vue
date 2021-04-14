<template>
  <div id="app">
    <h1>Tesr</h1>
    <froala :tag="'textarea'" :config="config" v-model="model"></froala>
  </div>
</template>

<script>
import { VueFroala } from "vue-froala-wysiwyg";

export default {
  name: "app",
  data() {
    return {
      config: {
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          }
        }
      },
      model: "Edit Your Content Here!"
    };
  }
};
</script>
