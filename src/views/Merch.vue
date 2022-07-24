<template>
  <div class="d-flex justify-center">
    <div>
      <canvas ref="canvas" width="400" height="400"></canvas>
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
    async setArtwork(firstSetting) {
      return new Promise(resolve => {
        let imgObj = new Image()
        imgObj.src = firstSetting ?? URL.createObjectURL(this.artwork)
        imgObj.onload = () => {
          const cuttingWidth = imgObj.width / 150
          let xOffset = 0

          var x1 = 340 / 2
          var x2 = 340
          var y1 = 60 // curve depth
          var y2 = 0

          var eb = (y2 * x1 * x1 - y1 * x2 * x2) / (x2 * x1 * x1 - x1 * x2 * x2)
          var ea = (y1 - eb * x1) / (x1 * x1)

          var currentYOffset
          for (let x = 100; x < 300; x++) {
            currentYOffset = ea * x * x + eb * x + 60
            xOffset += cuttingWidth
            this.context.drawImage(imgObj, xOffset, 0, cuttingWidth, imgObj.height, x, currentYOffset, 1, 200)
          }
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
    dataURL ?? (await this.setArtwork(require('@/assets/sunglasses.png')))
  },
}
</script>
