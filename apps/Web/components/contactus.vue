<template>
  <div>
    <v-card id="contactus" class="mx-auto" max-width="600" color="accent">
      <v-card-title>
        <v-icon large left> mdi-contacts </v-icon>
        <span class="title font-weight-light">Contact Us</span>
      </v-card-title>

      <v-card-text class="headline font-weight-bold">
        <v-data-table
          :headers="headers"
          :items="contactUs"
          :items-per-page="5"
          class="elevation-1"
          hide-default-footer
        ></v-data-table>
      </v-card-text>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    headers: [
      {
        text: 'Name',
        align: 'start',
        sortable: true,
        value: 'name'
      },
      { text: 'Email', value: 'email' },
      { text: 'Cell', value: 'cell' }
    ],
    contactUs: [
      {
        name: 'Hennie',
        email: 'hennie.hppet@gmail.com',
        cell: '+27 82 660 2106'
      },
      {
        name: 'Petro',
        email: 'petro.hppet@gmail.com',
        cell: '+27 82 451 4804'
      }
    ]
  })
}
</script>
