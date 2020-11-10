<template>
  <div class="text-center">
    <v-dialog v-model="dialogChoix" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Choix de(s) Comparent(s)
        </v-card-title>

        <v-card-text>
          <v-list shaped>
            <v-list-item-group v-model="selectedItems" multiple>
              <template v-for="(item, i) in items">
                <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                <v-list-item
                  v-else
                  :key="`item-${i}`"
                  :value="item"
                  active-class="deep-purple--text text--accent-4"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.name + ' : ' + item.identif"
                      ></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-checkbox
                        :input-value="active"
                        color="deep-purple accent-4"
                      ></v-checkbox>
                    </v-list-item-action>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="selectItems"> Choisire </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogChoix: false,
      items: [
        { id: 11, name: 'dinar ', identif: 'CD12132' },
        { id: 31, name: ' zakariae', identif: 'CD12132' },
        { id: 21, name: 'dinar zakariae', identif: 'CD12132' },
      ],
      selectedItems: [],
    }
  },
  methods: {
    selectItems() {
      console.log(this.selectedItems);
    }
  },

}
</script>