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
          const coefficient = imgObj.width > imgObj.height ? imgObj.width / 160 : imgObj.height / 160
          let xOffset = 0

          const x1 = 340 / 2
          const x2 = 340
          const y1 = 60 // curve depth
          const y2 = 0

          const eb = (y2 * x1 * x1 - y1 * x2 * x2) / (x2 * x1 * x1 - x1 * x2 * x2)
          const ea = (y1 - eb * x1) / (x1 * x1)

          const beginXOffset = 80 - imgObj.width / coefficient / 2
          const beginYOffset = 75 + 80 - imgObj.height / coefficient / 2

          let currentYOffset
          for (let x = 95 + beginXOffset; x < 259 + beginXOffset; x++) {
            currentYOffset = ea * x * x + eb * x + beginYOffset
            xOffset += coefficient
            this.context.drawImage(
              imgObj,
              xOffset,
              0,
              coefficient,
              imgObj.height,
              x,
              currentYOffset,
              1,
              imgObj.height / coefficient
            )
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
