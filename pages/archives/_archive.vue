<template>
  <div>
    <v-card>
      <v-card-title primary-title>
        {{ "Archive : " + titre }}
      </v-card-title>
      <v-card-text> </v-card-text>
    </v-card>
    <v-row>
      <v-col cols="4" v-for="file in files" key="file">
        <v-card class="mx-auto" max-width="344" outlined>
          <v-list-item three-line>
            <v-list-item-content>
              <div class="overline mb-4">Attachement</div>
              <v-list-item-title class="headline mb-1">
                File 1
              </v-list-item-title>
              <v-list-item-subtitle
                >Greyhound divisely hello coldly
                fonwderfully</v-list-item-subtitle
              >
            </v-list-item-content>

            <v-list-item-avatar tile size="80">
              <img :src="`http://localhost:1337/${file}`" alt="" srcset="" />
            </v-list-item-avatar>
          </v-list-item>

          <v-card-actions>
            <v-btn
              outlined
              rounded
              text
              :href="`http://localhost:1337/${file}`"
              target="_blank"
            >
              Ouvrir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  async asyncData({ params }) {
    const archive = params.archive
    return { archive }
  },
  data() {
    return {
      titre: '',
      dossier: 1,
      description: '',
      files: []
    }
  },
  created() {
    Axios.get(`http://localhost:1337/archive/${this.archive}`).then(resp => {
      console.log(resp.data);
      this.titre = resp.data.titre;
      this.description = 'rLorem ipsum dolor sit amet consectetur adipisicing elit. Vel natus facilis provident! Quidem, labore excepturi nulla reiciendis illo possimus aspernatur accusamus inventore obcaecati consectetur blanditiis, facere amet perspiciatis, ex sunt.';
      const filesTab = JSON.parse(resp.data.filesPath);
      console.log(filesTab);
      this.files = [...filesTab]

    })
  }
}
</script>