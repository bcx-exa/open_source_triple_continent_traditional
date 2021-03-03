<template>
  <div>
    <v-card class="mx-auto my-12" max-width="400" elevation="15" shaped>
      <v-img max-height="350" :src="product.image"> </v-img>

      <v-card-text>
        <v-list-item two-line>
          <v-list-item-content>
            <v-divider></v-divider>
            <v-list-item-title class="headline">
              {{ product.name }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              product.description
            }}</v-list-item-subtitle>
            <v-divider></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <form>
          <v-text-field v-model="qty" label="Qty" required></v-text-field>
          <v-select
            v-model="product.selectedVariant"
            :items="variants"
            label="Product Variant"
            required
          ></v-select>

          <v-row>
            <v-switch
              v-model="includeDelivery"
              class="ml-3 mt-3"
              inset
            ></v-switch>
            <p class="mt-4">Include Delivery</p>
          </v-row>
          <v-select
            v-if="includeDelivery"
            v-model="deliveryOption"
            :items="deliveryOptions"
            label="Delivery"
            required
          ></v-select>

          <v-btn
            rounded
            color="primary"
            class="mb-2"
            @click="quoteMe = !quoteMe"
          >
            Quote Me
          </v-btn>
          <v-dialog v-model="orderNow" persistent max-width="600px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="mb-2 ml-2"
                rounded
                color="secondary"
                dark
                v-bind="attrs"
                v-on="on"
              >
                Order Now
              </v-btn>
            </template>
            <v-card>
              <v-form v-model="valid">
                <v-card-title>
                  <span class="headline">Confirm Order</span>
                </v-card-title>
                <v-card-text>
                  <v-container id="orderForm">
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="order.firstName"
                          :rules="nameRules"
                          label="First Name*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="order.lastName"
                          :rules="nameRules"
                          label="Last Name*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="order.companyName"
                          :rules="nameRules"
                          label="Company Name*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="order.cell"
                          :rules="nameRules"
                          label="Cell*"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="12" md="12">
                        <v-text-field
                          v-model="order.email"
                          :rules="nameRules"
                          label="Email*"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-divider></v-divider>
                        Order
                        <v-divider></v-divider>
                        <v-simple-table id="order" dense>
                          <template v-slot:default>
                            <tbody>
                              <tr>
                                <td>Description:</td>
                                <td>{{ qty }} x Real Aqua Still Water</td>
                              </tr>
                              <tr>
                                <td>Price:</td>
                                <td>R {{ price }}</td>
                              </tr>
                              <tr>
                                <td>Delivery:</td>
                                <td>{{ deliveryPrice }}</td>
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
                      </v-col>
                    </v-row>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="error" @click="orderNow = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    color="success"
                    :disabled="!valid"
                    @click="placeOrder()"
                  >
                    Place Order
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </v-dialog>
          <div v-if="quoteMe">
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
                      {{ product.description }} - {{ variant }}
                    </td>
                  </tr>
                  <tr>
                    <td>Price:</td>
                    <td>R {{ price }}</td>
                  </tr>
                  <tr>
                    <td>Delivery:</td>
                    <td>{{ deliveryPrice }}</td>
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
          </div>
        </form>
      </v-card-text>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="orderConfirm" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">
            Thank you for placing an order with us
          </v-card-title>
          <v-card-text
            >Someone from Real Aqua will contact you to arrange payment and
            delivery.</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="orderConfirm = false"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>
<script>
import AWS from 'aws-sdk'
import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
  },

  props: {
    product: {
      type: Object,
      default: () => {
        return { name: 'default' }
      },
    },
  },

  data: () => ({
    // variant: '',
    quoteMe: false,
    deliveryOption: 'Less than 30km from Rustenburg',
    deliveryOptions: [
      'Less than 30km from Rustenburg',
      'More than 30km from Rustenburg',
    ],
    valid: false,
    includeDelivery: true,
    orderConfirm: false,
    orderNow: false,
    qty: 5000,
    order: {
      firstName: '',
      lastName: '',
      companyName: '',
      cell: '',
      email: '',
    },
    nameRules: [(v) => !!v || 'This field is required to proceed with order'],
  }),

  methods: {
    placeOrder() {
      const config = new AWS.Config({
        accessKeyId: 'AKIA3MVOSP7S4DM6PHUW',
        secretAccessKey: '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',
        region: 'eu-west-1',
      })

      AWS.config.update(config)

      const ses = new AWS.SES({ region: 'eu-west-1' })
      let emailBody = '<h1> An order has been placed </h1><br/>'
      emailBody += '<p><b>Contact Info</b></p>'
      emailBody += '<p>' + 'First Name: ' + this.order.firstName + '</p>'
      emailBody += '<p>' + 'Last Name: ' + this.order.lastName + '</p>'
      emailBody += '<p>' + 'Company Name: ' + this.order.companyName + '</p>'
      emailBody += '<p>' + 'Cell: ' + this.order.cell + '</p>'
      emailBody += '<p>' + 'Email: ' + this.order.email + '</p>'
      emailBody += '<br/>'
      emailBody += '<p><b>Order</b></p>'
      emailBody += document.getElementById('order').innerHTML

      const params = {
        Destination: {
          ToAddresses: ['martin.myinvestments@gmail.com'],
        },
        Source: 'hennie.hppet@gmail.com' /* required */,
        Message: {
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: emailBody,
            },
          },
          Subject: {
            Charset: 'UTF-8',
            Data: 'Real Aqua - Order',
          },
        },
      }
      ses.sendEmail(params, function (err, data) {
        if (err) console.log(err, err.stack)
        // an error occurred
        else console.log(data) // successful response
      })
      this.orderConfirm = true
      this.orderNow = false
    },
  },

  computed: {
    variants() {
      let items = []
      this.product.variants.map((v) => items.push(v.name))
      return items
    },
    totalPrice() {
      if (this.price && this.deliveryPrice) {
        return this.price
      } else {
        return 0
      }
    },
    deliveryPrice() {
      if (this.includeDelivery) {
        return this.deliveryOption === 'Less than 30km from Rustenburg'
          ? 'Free'
          : 'TBC'
      } else {
        return 0
      }
    },
    totalWeight() {
      if (this.product) {
        const index = this.product.variants.findIndex(
          (v) => v.name === this.product.selectedVariant
        )
        return this.product.variants[index].weight * this.qty
      } else {
        return 0
      }
    },
    price() {
      if (this.product.selectedVariant) {
        const index = this.product.variants.findIndex(
          (v) => v.name === this.product.selectedVariant
        )
        console.log(this.product.variants[index].price)
        return this.product.variants[index].price * this.qty
      } else {
        return 0
      }
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },
}
</script>
