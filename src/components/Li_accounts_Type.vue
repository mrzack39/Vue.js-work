<template>
  <v-container>
    <!-- Button to open the dialog for adding a new type -->
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="openDialog">Add Type</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ isEdit ? 'Edit Type' : 'Add Type' }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="newType.type_name"
                  label="Type Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="isEdit ? updateType() : addType()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    
    <!-- Data table to display existing types -->
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="types" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="editType(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteType(item.id)">mdi-delete</v-icon>
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
     
      newType: {
        id: '',
        type_name: '',
      },
      types: [],
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Type Name', value: 'type_name' },
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
      this.newType = {
        id: '',
        Type_Name: '',
      };
    },
    async addType() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:8000/api/li_accounts_type', this.newType, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.types.push(response.data);
          this.closeDialog();
        } catch (error) {
          console.error('There was an error adding the type:', error);
        }
      }
    },
    async updateType() {
      if (this.$refs.form.validate()) {
        try {
          await axios.put(`http://localhost:8000/api/li_accounts_type/${this.newType.id}`, this.newType, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.fetchTypes();
          this.closeDialog();
        } catch (error) {
          console.error('There was an error updating the type:', error);
        }
      }
    },
    async fetchTypes() {
      try {
        const response = await axios.get('http://localhost:8000/api/li_accounts_type', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.types = response.data;
      } catch (error) {
        console.error('There was an error fetching the types:', error);
      }
    },
    editType(item) {
      this.newType = { ...item };
      this.isEdit = true;
      this.openDialog();
    },
    async deleteType(id) {
      try {
        await axios.delete(`http://localhost:8000/api/li_accounts_type/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.fetchTypes();
      } catch (error) {
        console.error('There was an error deleting the type:', error);
      }
    },
  },
  created() {
    this.fetchTypes();
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
