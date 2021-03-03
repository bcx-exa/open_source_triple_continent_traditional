<template>
  <v-app>
    <v-app-bar color="accent" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <img
          src="/logo.jpg"
          class="mt-2"
          alt="BCX Exa Logo"
          height="30"
          width="100"
        />
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-switch
        v-model="dark"
        class="mt-6"
        label="Dark"
        @click="darkMode"
      ></v-switch>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-2 mr-2" color="grey" dark v-bind="attrs" v-on="on">
            mdi-home
          </v-icon>
        </template>
        <span>Home</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon color="grey" dark v-bind="attrs" v-on="on">
            mdi-contacts
          </v-icon>
        </template>
        <span>Contact us</span>
      </v-tooltip>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <nuxt-link to="/">Home</nuxt-link>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular
          indeterminate
          color="grey lighten-5"
        ></v-progress-circular>
      </v-row>
    </template>
    <v-main>
      <nuxt />
    </v-main>

    <v-footer app>
      <h4 class="subheading">
        BCX Exa &copy;
        {{ new Date().getFullYear() }}
      </h4>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      group: '',
      drawer: false,
      value: true,
      descriptionLimit: 60,
      entries: [],
      isLoading: false,
      selectedSearch: null,
      search: null,
      dark: true,
      messages: 0,
      show: false,
      clipped: false,
      fixed: false,
      images: [
        {
          src: '/water_bottle_conveyor.jfif',
        },
      ],
    }
  },

  methods: {
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
  },
}
</script>
