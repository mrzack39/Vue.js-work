<template>
    <v-card class="pa-4" elevation="2">
      <v-card-title>
        <h3 class="title">Sales Overview</h3>
      </v-card-title>
      <v-card-subtitle>
        <v-chartjs-line :chartData="data" :options="options" />
      </v-card-subtitle>
    </v-card>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import { Line } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';
  
  ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);
  
  export default defineComponent({
    components: {
      'v-chartjs-line': Line,
    },
    setup() {
      const data = ref({
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            data: [40, 45, 50, 60, 70, 80, 90],
          },
        ],
      });
  
      const options = ref({
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += `${context.parsed.y} units`;
                }
                return label;
              },
            },
          },
        },
      });
  
      return { data, options };
    },
  });
  </script>
  
  <style scoped>
  .title {
    font-size: 1.5rem;
    font-weight: bold;
  }
  </style>
  