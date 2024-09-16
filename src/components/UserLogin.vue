<template>
  <v-container>
    <v-row justify="center" align="center" class="login-row">
      <v-col cols="12" md="4">
        <v-card>
          <v-img
            src="../assets/superadmin-logo.png"
            height="100"
            contain
            class="sidebar-logo"
          ></v-img>
          <v-card-title>
            <span class="headline" style="color: white; font-size: 30px;">Login</span>
          </v-card-title>
          <v-card-subtitle style="color: white;">Login to access your account</v-card-subtitle>
          <v-card-text>
            <v-form ref="form" v-model="valid" style="color: white;">
              <v-text-field 
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.email]"
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                required
              ></v-text-field>
              <v-alert v-if="error" type="error" dismissible>{{ error }}</v-alert>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="white" @click="login">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'UserLogin',
  data() {
    return {
      email: '',
      password: '',
      error: null,
      valid: false,
      rules: {
        required: value => !!value || 'Required.',
        email: value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
      },
    };
  },
  methods: {
    async login() {
      console.log('Login method called');
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/auth/login', {
          email: this.email,
          password: this.password,
        });

        // Log the complete response for debugging
        console.log('Full API response:', response);

        // Extract the access_token from the API response
        const accessToken = response.data.access_token;
        console.log('Access Token received from API:', accessToken);

        // Store the access_token in localStorage
        if (accessToken) {
          localStorage.setItem('token', accessToken);
          // Log the stored token to confirm it has been set
          console.log('Stored token:', localStorage.getItem('token'));
        } else {
          console.error('Access Token is not present in the API response');
        }

        // Redirect to the main page after successful login
        this.$router.push('/');
      } catch (error) {
        console.error('Login failed:', error);
        this.error = 'Login failed. Please check your credentials and try again.';
      }
    },
  },
};
</script>

<style scoped>
.login-row {
  min-height: 100vh;
}

.v-card {
  padding: 20px;
  background-color: rgb(115, 115, 219);
}
</style>
