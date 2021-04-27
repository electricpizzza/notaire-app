<template>
  <div class="editor">
    <froala
      :tag="'textarea'"
      :config="config"
      v-model="markdown"
      @input="typing"
    ></froala>
  </div>
</template>
<script>
// import the component and the necessary extensions
import { VueEditor } from "vue2-editor";
import { VueFroala } from "vue-froala-wysiwyg";

import MarkdownStore from "./../../assets/store/MarkdownStore";
export default {
  name: "ActeDocument",
  components: { VueEditor, VueFroala },
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
      markdown: "",
      config: {
        events: {
          "froalaEditor.initialized": function() {
            console.log("initialized");
          }
        }
      }
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
<style scoped>
.editor {
  width: 800px;
  margin: auto;
}
</style>
