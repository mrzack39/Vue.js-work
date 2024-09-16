<template>
  <v-app>
    <template v-if="isAuthenticated">
      <v-navigation-drawer
        app
        v-model="drawer"
        :mini-variant="mini"
        @update:mini-variant="updateMini"
        class="app-sidebar"
      >
        <AppSidebar />
      </v-navigation-drawer>

      <v-app-bar app>
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
        <v-toolbar-title>
          Linkedin Accounts Management
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="logout" class="logout-button">Logout</v-btn>
      </v-app-bar>
    </template>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import AppSidebar from './components/AppSidebar.vue';

export default {
  components: {
    AppSidebar,
  },
  data() {
    return {
      drawer: false,
      mini: false,
      isAuthenticated: !!localStorage.getItem('token'),
    };
  },
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    updateMini(val) {
      this.mini = val;
    },
    logout() {
      localStorage.removeItem('token');
      this.isAuthenticated = false;
      this.$router.push('/login');
    },
  },
  watch: {
    '$route'() {
      this.isAuthenticated = !!localStorage.getItem('token');
    },
  },
};
</script>

<style>
html, body, #app {
  margin: 0;
  height: 100%;
}

.v-app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.v-main {
  transition: margin-left 0.3s ease;
}

.logo {
  height: 40px;
  width: 40px;
}

.logout-button {
  color: rgb(105, 92, 177);
}
</style>
