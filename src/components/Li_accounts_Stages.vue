<template>
  <v-container>
    <!-- Button to open the dialog for adding a new stage -->
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="openDialog">Add Stage</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ isEdit ? 'Edit Stage' : 'Add Stage' }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="newStage.stage_name"
                  label="Stage Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="isEdit ? updateStage() : addStage()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    
    <!-- Data table to display existing stages -->
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="stages" class="elevation-1">
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="editStage(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteStage(item.id)">mdi-delete</v-icon>
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
      newStage: {
        id: '',
        stage_name: '',
      },
      stages: [],
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Stage Name', value: 'stage_name' },
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
      this.newStage = {
        id: '',
        stage_name: '',
      };
    },
    async addStage() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:8000/api/li_accounts_stages', this.newStage, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.stages.push(response.data);
          this.closeDialog();
        } catch (error) {
          console.error('There was an error adding the stage:', error);
        }
      }
    },
    async updateStage() {
      if (this.$refs.form.validate()) {
        try {
          await axios.put(`http://localhost:8000/api/li_accounts_stages/${this.newStage.id}`, this.newStage, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.fetchStages();
          this.closeDialog();
        } catch (error) {
          console.error('There was an error updating the stage:', error);
        }
      }
    },
    async fetchStages() {
      try {
        const response = await axios.get('http://localhost:8000/api/li_accounts_stages', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.stages = response.data;
      } catch (error) {
        console.error('There was an error fetching the stages:', error);
      }
    },
    editStage(item) {
      this.newStage = { ...item };
      this.isEdit = true;
      this.openDialog();
    },
    async deleteStage(id) {
      try {
        await axios.delete(`http://localhost:8000/api/li_accounts_stages/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.fetchStages();
      } catch (error) {
        console.error('There was an error deleting the stage:', error);
      }
    },
  },
  created() {
    this.fetchStages();
  },
};
</script>

<style scoped>
/* Add any custom styles here */
</style>
