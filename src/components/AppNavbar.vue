<template>
  <v-app-bar app>
    <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      Linkedin Accounts management
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="logout" >
      <v-icon>mdi-logout</v-icon>
      Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'AppNavbar',
  methods: {
    toggleDrawer() {
      this.$emit('toggle-drawer');
    },
    logout() {
      this.$emit('logout');
    },
  },
};
</script>

<style scoped>
.logo {
  height: 40px;
  width: 40px;
}

.v-btn {
  color: rgb(150, 122, 214); /* Adjust color as needed */
}
</style>
