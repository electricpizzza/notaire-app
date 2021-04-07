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
      type: String
    }
  },
  data() {
    return {
      markdown: ""
    };
  },

  created() {
    if (this.value !== undefined) {
      this.markdown = this.value;
    } else {
      this.markdown = MarkdownStore.data.markdown;
    }
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
