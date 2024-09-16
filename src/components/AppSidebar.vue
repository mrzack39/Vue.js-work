<template>
  <v-img
        src="../assets/superadmin-logo.png" 
        height="100"
        contain
        class="sidebar-logo"
      ></v-img>
  <v-list>
    <v-list-item link to="/">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-home</v-icon>
          Dashboard
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/accounts-references">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-database</v-icon>
          Accounts References
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/accounts-status">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-database</v-icon>
          Account Status
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/accounts-stages">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-database</v-icon>
          Account Stage
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item link to="/accounts-type">
      <v-list-item-content>
        <v-list-item-title>
          <v-icon>mdi-database</v-icon>
          Account Type
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'AppSidebar',
  props: {
    drawer: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mini: false,
    };
  },
  methods: {
    updateMini(val) {
      this.mini = val;
    },
  },
};
</script>

<style scoped>
.app-sidebar {
  background-color: #333; /* Dark background color */
  color: #673AB7; /* Light text color for contrast */
  width: 250px;
  transition: width 0.3s ease;
}

.sidebar-logo {
  background-color: #222;/* Slightly darker background for the logo area */
}

.v-list-item {
  border-bottom: 1px solid #ffffff;
  background-color: #222; /* Lighter border for separation */
}

.v-list-item:hover {
  background-color: #555; /* Hover effect */
}

.v-list-item-title {
  color: #f1f1f1; /* Text color */
}

.v-list-item-icon {
  color: #f1f1f1; /* Icon color */
}

.v-list-item-content {
  padding: 10px 15px; /* Add some padding */
}

@media (max-width: 600px) {
  .app-sidebar {
    width: 200px; /* Adjust width for small screens */
  }

  .v-main {
    margin-left: 0; /* Remove margin when sidebar is collapsed */
  }

  .v-navigation-drawer {
    width: 100%; /* Make sidebar full width in mobile view */
  }

  .v-app-bar {
    margin-left: 0; /* Adjust navbar to avoid overlap with sidebar */
  }
}
</style>
