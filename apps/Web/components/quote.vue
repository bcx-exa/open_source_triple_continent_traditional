<template>
  <div>
   
            <v-divider></v-divider>
            Quote
            <v-divider></v-divider>
            <v-simple-table dense>
              <template v-slot:default>
                <tbody>
                  <tr>
                    <td>Description:</td>
                    <td>
                      {{ qty }} x {{ product.name }} -
                      {{ product.description }} - {{ bottleSize }}
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>R {{ price }}</td>
                  </tr>
                  <tr>
                    <td>Delivery:</td>
                    <td>R {{ deliveryPrice }}</td>
                  </tr>
                  <tr>
                    <td>Total Weight:</td>
                    <td>{{ totalWeight }} kg</td>
                  </tr>
                  <tr>
                    <td><h4 class="subheading">Total:</h4></td>
                    <td>
                      <h4 class="subheading">R {{ totalPrice }}</h4>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-divider class="mb-2"></v-divider>
      

</template>
<script>


export default {
  props: {
    quoteMe: {
      type: Object,
      default: () => {
        return { name: 'default' }
      }
    }
  },

  data: () => ({
    
  }),
}
</script>
