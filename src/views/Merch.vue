<template>
  <div class="d-flex justify-center">
    <div>
      <canvas ref="canvas" width="400" height="400" class="canvas"></canvas>
      <v-file-input v-model="artwork" show-size outlined label="artwork" class="mx-6"></v-file-input>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Merch',
  data() {
    return {
      canvas: null,
      context: null,
      mug: require('@/assets/mug.png'),
      artwork: null,
    }
  },
  methods: {
    async drawBackgroundImage(url) {
      return new Promise(resolve => {
        let imgObj = new Image()
        imgObj.src = url ?? this.mug
        imgObj.onload = () => {
          this.context.drawImage(imgObj, 0, 0, 400, 400)
          resolve()
        }
      })
    },
    async setArtwork() {
      return new Promise(resolve => {
        let imgObj = new Image()
        imgObj.src = URL.createObjectURL(this.artwork)
        imgObj.onload = () => {
          this.context.drawImage(imgObj, 50, 120, 240, 240)
          resolve()
        }
      })
    },
  },
  watch: {
    artwork: async function () {
      await this.drawBackgroundImage()
      if (this.artwork) {
        await this.setArtwork()
        localStorage.setItem('canvas', this.canvas.toDataURL())
      } else {
        localStorage.removeItem('canvas')
      }
    },
  },
  async mounted() {
    this.canvas = this.$refs.canvas
    this.context = this.canvas.getContext('2d')
    const dataURL = localStorage.getItem('canvas')
    await this.drawBackgroundImage(dataURL)
  },
}
</script>
