<template>
  <div>
    <h1 class="pl-4 pb-4">BCX Exa Medical</h1>
    <h3 class="pl-4">
      You are being served by the
      <span color="primary--text">
        {{ $config.REGION === 'eu-west-1' ? 'BLUE STACK' : 'GREEN STACK' }}
      </span>
      in region: {{ $config.REGION }}
    </h3>

    <v-col cols="12" sm="12" md="12">
      <v-row>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            class="pr-1"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-btn class="mt-8 ml-2" color="primary" elevation="2"> Search </v-btn>
        <v-spacer></v-spacer>
        <v-btn class="mt-8 ml-2" color="success" elevation="2"> Create </v-btn>
        <v-btn class="mt-8 ml-2" color="info" elevation="2"> Initialize </v-btn>
      </v-row>
    </v-col>

    <v-card>
      <v-card-title>Patient Info:</v-card-title>
      <v-data-table
        :headers="patientInfoHeaders"
        :items="patientInfo"
        hide-default-footer
      ></v-data-table>
    </v-card>
    <v-card>
      <v-card-title>Patient History:</v-card-title>
      <v-data-table
        dense
        :headers="patientHistoryHeaders"
        :items="patientHistory"
        item-key="name"
        class="pa-2 elevation-1"
        hide-default-footer
      ></v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $http }) {
    const post = await $http.$get(
      process.env.APP_ALB_CNAME || 'http://localhost:7001' + '/patient/' + id
    )
    return { post }
  },
  data: () => ({
    getPatient: process.env.APP_ALB_CNAME || 'http://localhost:7001',
    search: '',
    patientInfo: [
      {
        id: '123',
        firstName: 'Sally',
        lastName: 'Johnson',
        gender: 'Female',
        age: 23,
        race: 'White',
        bloodType: 'O+',
      },
    ],
    patientHistory: [
      {
        bloodPressure: '120/80',
        time: Date.now(),
        cholesterol: '3.5',
        glucose: '170mg',
        height: 23,
        weight: 50,
        doctor: 'Dr House',
        region: 'eu-west-1',
        stack: 'Blue Stack',
      },
      {
        bloodPressure: '110/70',
        time: Date.now(),
        cholesterol: '6.5',
        glucose: '170mg',
        height: 23,
        weight: 55,
        doctor: 'Dr House',
        region: 'eu-west-1',
        stack: 'Blue Stack',
      },
      {
        bloodPressure: '130/90',
        time: Date.now(),
        cholesterol: '4.5',
        glucose: '170mg',
        height: 23,
        weight: 75,
        doctor: 'Dr House',
        region: 'us-west-2',
        stack: 'Green Stack',
      },
    ],
    patientInfoHeaders: [
      { text: 'Identity Number', value: 'id' },
      { text: 'First Name', value: 'firstName' },
      { text: 'Last Name', value: 'lastName' },
      { text: 'Gender', value: 'gender' },
      { text: 'Age', value: 'age' },
      { text: 'Race', value: 'race' },
      { text: 'Blood Type', value: 'bloodType' },
    ],
    patientHistoryHeaders: [
      { text: 'Blood Pressure', value: 'bloodPressure' },
      { text: 'Time', value: 'time' },
      { text: 'Cholesterol', value: 'cholesterol' },
      { text: 'Glucose', value: 'glucose' },
      { text: 'Height (cm)', value: 'height' },
      { text: 'Weight (Kg)', value: 'weight' },
      { text: 'Doctor', value: 'doctor' },
      { text: 'Region', value: 'region' },
      { text: 'Stack', value: 'stack' },
    ],
  }),
}
</script>

<style scoped></style>
