<template>
  <div>
    <v-alert
      v-model="alert"
      border="left"
      close-text="Close Alert"
      color="success"
      dismissible
    >
      {{ alertMessage }}
    </v-alert>
    <p v-if="$fetchState.pending">Fetching data...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>

    <div v-else class="pa-4">
      <h1 class="pl-4 pb-4">BCX Exa Medical</h1>
      <h3 class="pl-4 mb-2">
        You are being served by the
        <span color="primary--text">
          {{
            region === 'eu-west-1'
              ? 'IRELAND REGION'
              : region === 'us-west-2'
              ? 'OREGON REGION'
              : 'SYDNEY REGION'
          }}
        </span>
      </h3>

      <!-- Toolbar -->
      <v-toolbar dense class="mb-2">
        <v-text-field
          v-model="search"
          label="Search"
          class="ml-2"
          single-line
          hide-details
        ></v-text-field>

        <v-btn
          @click="
            getPatient = true
            $fetch()
          "
          fab
          small
          class="ml-2"
          color="primary"
          elevation="2"
        >
          <v-icon dark> mdi-magnify </v-icon>
        </v-btn>

        <v-btn
          @click="dialog = !dialog"
          fab
          small
          color="success"
          class="ml-2"
          elevation="2"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
        <v-btn
          @click="
            initialize = true
            $fetch()
          "
          fab
          small
          class="ml-2"
          color="info lighten-1"
          elevation="2"
        >
          <v-icon dark> mdi-database-arrow-down </v-icon>
        </v-btn>
      </v-toolbar>
      <v-card class="pa-2">
        <v-card-title>Patient Info:</v-card-title>
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          class="pa-2"
          :headers="patientInfoHeaders"
          :items="patientInfo"
          hide-default-footer
        ></v-data-table>
      </v-card>
      <v-card>
        <v-card-title>Patient History:</v-card-title>
        <v-data-table
          :loading="loading"
          loading-text="Loading... Please wait"
          dense
          :headers="patientHistoryHeaders"
          :items="patientHistory"
          item-key="name"
          class="pa-2 elevation-1"
          hide-default-footer
        ></v-data-table>
      </v-card>
    </div>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Patient Record</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Identity Number*"
                    v-model="newPatient.id"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="version*"
                    v-model="newPatient.version"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="Type*"
                    v-model="newPatient.type"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    label="First Name*"
                    v-model="newPatient.firstName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Last Name*"
                    v-model="newPatient.lastName"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Gender*"
                    v-model="newPatient.gender"
                    required
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Age*"
                    v-model="newPatient.age"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Race*"
                    v-model="newPatient.race"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    label="Blood Type*"
                    v-model="newPatient.bloodTypes"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="
                createPatient = true
                $fetch()
              "
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  async fetch() {
    console.log('Trigger Fetch')
    console.log('initialize:', this.initialize)
    console.log('getPatient:', this.getPatient)
    console.log('createPatient:', this.createPatient)
    if (this.initialize) {
      this.$http.setHeader('Access-Control-Allow-Origin', '*')
      this.$http.setHeader('Origin', '*')
      const response = await this.$http.$post('/patient/initialize')

      this.alertMessage = 'Database populated with dummy data'
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 3000)
      this.initialize = false
    }
    if (this.getPatient) {
      this.$http.setHeader('Access-Control-Allow-Origin', '*')
      this.$http.setHeader('Origin', '*')
      this.loading = true

      const info = await this.$http.$get(
        '/patient?id=' + this.search + '&version=MetaData'
      )

      const history = await this.$http.$get(
        '/patient?id=' + this.search + '&version=v'
      )

      this.loading = false
      this.patientInfo = info.Items
      this.patientHistory = history.Items

      this.getPatient = false
    }
    if (this.createPatient) {
      this.$http.setHeader('Access-Control-Allow-Origin', '*')
      this.$http.setHeader('Origin', '*')
      const response = await this.$http.$post('/patient', this.newPatient)

      this.dialog = false
      this.alertMessage = 'Patient Created'
      this.alert = true
      setTimeout(() => {
        this.alert = false
      }, 3000)

      this.createPatient = false
    }
  },
  data: () => ({
    initialize: false,
    getPatient: false,
    createPatient: false,
    alert: false,
    dialog: false,
    response: '',
    search: '',
    loading: false,
    alertMessage: '',
    region: process.env.NUXT_ENV_REGION,
    patientInfo: [],
    newPatient: {},
    patientHistory: [],
    patientHistoryHeaders: [
      { text: 'Version', value: 'version' },
      { text: 'Blood Pressure', value: 'bloodPressure' },
      { text: 'Time', value: 'time' },
      { text: 'Cholesterol', value: 'cholestrol' },
      { text: 'Glucose', value: 'glucose' },
      { text: 'Height (cm)', value: 'height' },
      { text: 'Weight (Kg)', value: 'weight' },
      { text: 'Doctor', value: 'doctor' },
    ],
    patientInfoHeaders: [
      { text: 'Identity Number', value: 'id' },
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Gender', value: 'gender' },
      { text: 'Age', value: 'age' },
      { text: 'Race', value: 'race' },
      { text: 'Blood Type', value: 'bloodTypes' },
    ],
  }),
}
</script>

<style scoped></style>
