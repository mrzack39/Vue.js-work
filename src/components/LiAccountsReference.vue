<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-btn color="primary" @click="openDialog">Add Reference</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">{{ isEdit ? 'Edit Reference' : 'Add Reference' }}</span>
            </v-card-title>
            <v-card-text>
              <v-form ref="form" v-model="valid">
                <v-select
                  v-model="newReference.reference_id"
                  :items="availableReferences"
                  item-title="name"  
                  item-value="id"             
                  label="Reference Name"
                  :rules="[rules.required]"
                  required
                ></v-select>
                <v-text-field
                  v-model="newReference.provider_name"
                  label="Provider Name"
                  :rules="[rules.required]"
                  required
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="isEdit ? updateReference() : addReference()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table :headers="headers" :items="references" class="elevation-1">
          <template v-slot:[`item.reference_name`]="{ item }">
            {{ item.user ? item.user.name : 'Unknown' }}
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small @click="editReference(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteReference(item.id)">mdi-delete</v-icon>
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
      newReference: {
        id: '',
        reference_id: '',
        provider_name: '',
      },
      references: [],
      availableReferences: [], // Array for dropdown items
      headers: [
        { title: 'ID', value: 'id' },
        { title: 'Reference Name', value: 'reference_name' },
        { title: 'Provider Name', value: 'provider_name' },
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
      this.newReference = {
        id: '',
        reference_id: '',
        provider_name: '',
      };
    },
    async addReference() {
      if (this.$refs.form.validate()) {
        try {
          const response = await axios.post('http://localhost:8000/api/li_accounts_reference', this.newReference, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.references.push(response.data);
          this.closeDialog();
        } catch (error) {
          console.error('Error adding the reference:', error.response?.data || error.message);
        }
      }
    },
    async updateReference() {
      if (this.$refs.form.validate()) {
        try {
          await axios.put(`http://localhost:8000/api/li_accounts_reference/${this.newReference.id}`, this.newReference, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          this.fetchReferences();
          this.closeDialog();
        } catch (error) {
          console.error('Error updating the reference:', error.response?.data || error.message);
        }
      }
    },
    async fetchReferences() {
      try {
        const response = await axios.get('http://localhost:8000/api/li_accounts_reference', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.references = response.data;
      } catch (error) {
        console.error('Error fetching references:', error.response?.data || error.message);
      }
    },
    async fetchAvailableReferences() {
  try {
    // Adjust the URL to ensure it fetches all users
    const response = await axios.get('http://localhost:8000/api/users', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });

    // Ensure the response data has the required structure
    // Map the response data to the format needed for the dropdown
    this.availableReferences = response.data.map(user => ({
      id: user.id,
      name: user.name // Ensure this matches the field names returned by your API
    }));
  } catch (error) {
    console.error('Error fetching available references:', error.response?.data || error.message);
  }
},
    editReference(item) {
      this.newReference = { ...item };
      this.isEdit = true;
      this.openDialog();
    },
    async deleteReference(id) {
      try {
        await axios.delete(`http://localhost:8000/api/li_accounts_reference/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.fetchReferences();
      } catch (error) {
        console.error('Error deleting the reference:', error.response?.data || error.message);
      }
    },
  },
  created() {
    this.fetchAvailableReferences().then(() => {
      this.fetchReferences();
    });
  },
};
</script>

<style scoped>

.v-data-table-header th {
  color: #000; 
  background-color: #f5f5f5; 
  font-weight: bold;
}
</style>
 