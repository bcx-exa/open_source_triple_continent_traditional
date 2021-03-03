<template>
  <div>
    <v-carousel v-model="carousel">
      <v-carousel-item v-for="(image, i) in carousel_images" :key="i">
        <v-sheet height="100%" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-img
              height="400px"
              width="1200px"
              :src="image.src"
              class="mt-2"
              :alt="image.alt"
            >
              <v-card elevation="12" color="accent">
                <h6 class="subtitle-1 font-weight-thin mb-4">
                  {{ image.heading }}
                </h6>
              </v-card>
            </v-img>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>
<script>
export default {
  data: () => ({
    carousel: false,
    carousel_images: [
      {
        src: '/blow_molding.jpg',
        alt: 'Real Aqua Product Range'
      },
      {
        src: '/product_range.jpg',
        alt: 'Real Aqua Product Range'
      }
    ]
  })
}
</script>
