<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <vue-editor v-model="markdown" @input="typing" />
  </div>
</template>
<script>
// import the component and the necessary extensions
import { VueEditor } from "vue2-editor";
import MarkdownStore from "./../../assets/store/MarkdownStore";
export default {
  name: "ActeDocument",
  components: { VueEditor },
  props: {
    libelle: String,
    model: {
      type: Object
    },
    data: {
      type: Array
    },
    value: {
      type: String,
      default: `
<h1>Headline!!</h1>
<p>All these <strong>cool tags</strong> are working now.</p>`
    }
  },
  data() {
    return {
      markdown: ""
    };
  },

  created() {
    this.markdown = this.value;
    //this.markdown = `<h1>${this.libelle}</h1>`;
  },
  updated() {
    //console.log(this.model);
  },
  watch: {
    libelle(newLib, oldLib) {
      //this.markdown = this.markdown.replace(oldLib, newLib);
    }
  },
  methods: {
    typing() {
      MarkdownStore.data.markdown = this.markdown;
    },
    setEditorContent() {
      this.content = this.value;
    }
  }
};
</script>
