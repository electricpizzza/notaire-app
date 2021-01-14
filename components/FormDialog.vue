<template>
  <div>
    <v-row justify="center">
      <v-menu bottom offset-y>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-dialog
        v-model="dialogForm"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        scrollable
      >
        <v-card tile>
          <!-- <v-toolbar text dark color="primary">
            <v-btn icon dark @click="this.dialogForm = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>Settings</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <v-btn dark text @click="dialogForm = false"> Save </v-btn>
            </v-toolbar-items>
            <v-menu bottom right offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
                  @click="() => {}"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar> -->
          <v-card-text>
            <EntrepriseForm />
          </v-card-text>

          <div style="flex: 1 1 auto"></div>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ['dialogForm'],
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false,
    }
  },
  watch: {},
  updated() {
    this.dialogForm = true
  },
}
</script>
