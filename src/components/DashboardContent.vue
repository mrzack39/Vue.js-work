<template>
  <v-container>
    <v-row>
      <!-- Card 1 -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" color="deep-purple lighten-4" elevation="2">
          <v-card-title>
            <v-icon class="mr-6" >mdi-account-circle</v-icon>
            <div>
              <h3 class="title deep-purple--text">Users</h3>
              <p class="subtitle deep-purple--text">Total number of users</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="black">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card 2 -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" color="blue lighten-4" elevation="2">
          <v-card-title>
            <v-icon class="mr-6" color="White">mdi-cash</v-icon>
            <div>
              <h3 class="title blue--text">Revenue</h3>
              <p class="subtitle blue--text">Total revenue </p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="black">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <!-- Card 3 -->
      <v-col cols="12" md="4">
        <v-card class="pa-4" color="green lighten-4" elevation="2">
          <v-card-title>
            <v-icon class="mr-6" color="White">mdi-chart-line</v-icon>
            <div>
              <h3 class="title green--text">Growth</h3>
              <p class="subtitle green--text">Monthly Growth rate</p>
            </div>
          </v-card-title>
          <v-card-actions>
            <v-btn text color="black">View Details</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row> 
    <!-- Graph -->
    <v-row>
      <v-col cols="12">
        <ChartComponent /> <!-- Ensure this component is used in the template -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import ChartComponent from '@/components/ChartComponent.vue'; // Ensure correct path

export default {
  name: 'DashboardContent',
  components: {
    // ChartComponent // Register the component here
  },
};
</script>
<style scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}

.subtitle {
  color: #555;
}

.v-card-title {
  display: flex;
  align-items: center;
}

.v-card-actions {
  justify-content: flex-end;
}

.v-icon {
  font-size: 2rem;
}
</style>
