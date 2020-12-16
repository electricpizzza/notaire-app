<template>
  <div>
    <!-- Use the component in the right place of the template -->
    <tiptap-vuetify
      :value="markdown"
      :extensions="extensions"
      @input="typing"
      v-model="markdown"
    />
  </div>
</template>
<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from "tiptap-vuetify";
import MarkdownStore from './../assets/store/MarkdownStore'
export default {
  name: 'RichEditor',
  components: { TiptapVuetify },
  props: {
    libelle: String,
    value: {
      type: String,
      default: `
<h1>Headline!!</h1>
<p>All these <strong>cool tags</strong> are working now.</p>`
    }
  },
  data: () => ({
    markdown: '',
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3]
          }
        }
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak
    ]
  }),

  created() {
    this.markdown = `<h1>${this.libelle}</h1>`
  },
  watch: {
    libelle(newLib) {

      this.markdown = `<h1>${this.libelle}</h1>`
    }
  },
  methods: {
    typing() {
      MarkdownStore.data.markdown = this.markdown
    }
  }
};
</script>
<style scoped>
  h1{
    text-align: center;
  }
</style>