<template>
    <v-container>
      <!-- Button to open the dialog for adding a new status -->
      <v-row>
        <v-col cols="12">
          <v-btn color="primary" @click="openDialog">Add Status</v-btn>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{ isEdit ? 'Edit Status' : 'Add Status' }}</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="newStatus.Status_Name"
                    label="Status Name"
                    :rules="[rules.required]"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="isEdit ? updateStatus() : addStatus()">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-col>
      </v-row>
      
      <!-- Data table to display existing statuses -->
      <v-row>
        <v-col cols="12">
          <v-data-table :headers="headers" :items="statuses" class="elevation-1">
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon small @click="editStatus(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteStatus(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        dialog: false,
        valid: false,
        isEdit: false,
        newStatus: {
          id: '',
          Status_Name: '',
        },
        statuses: [],
        headers: [
          { title: 'ID', value: 'id' },
          { title: 'Status Name', value: 'Status_Name' },
          { title: 'Actions', value: 'actions', sortable: false },
        ],
        rules: {
          required: value => !!value || 'Required.',
        },
      };
    },
    methods: {
      openDialog() {
        this.dialog = true;
      },
      closeDialog() {
        this.dialog = false;
        this.isEdit = false;
        this.newStatus = {
          id: '',
          Status_Name: '',
        };
      },
      async addStatus() {
        if (this.$refs.form.validate()) {
          try {
            const response = await axios.post('http://localhost:8000/api/li_accounts_status', this.newStatus, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            this.statuses.push(response.data);
            this.closeDialog();
          } catch (error) {
            console.error('There was an error adding the status:', error);
          }
        }
      },
      async updateStatus() {
        if (this.$refs.form.validate()) {
          try {
            await axios.put(`http://localhost:8000/api/li_accounts_status/${this.newStatus.id}`, this.newStatus, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            });
            this.fetchStatuses();
            this.closeDialog();
          } catch (error) {
            console.error('There was an error updating the status:', error);
          }
        }
      },
      async fetchStatuses() {
        try {
          const response = await axios.get('http://localhost:8000/api/li_accounts_status', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.statuses = response.data;
        } catch (error) {
          console.error('There was an error fetching the statuses:', error);
        }
      },
      editStatus(item) {
        this.newStatus = { ...item };
        this.isEdit = true;
        this.openDialog();
      },
      async deleteStatus(id) {
        try {
          await axios.delete(`http://localhost:8000/api/li_accounts_status/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.fetchStatuses();
        } catch (error) {
          console.error('There was an error deleting the status:', error);
        }
      },
    },
    created() {
      this.fetchStatuses();
    },
  };
  </script>
  
  <style scoped>
  /* Add any custom styles here */
  </style>
  