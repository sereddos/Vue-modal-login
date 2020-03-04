<template>
  <span class="timer" v-html="time"></span>
</template>

<script>
  export default {
    name: "timer",
    data() {
      return {
        totalTime: (1 * 60),
        interval: null
      }
    },
    computed: {
      time() {
        const isTimeOver = this.minutes === '00' && this.seconds === '00'
        if (!isTimeOver) {
          return this.minutes + ":" + this.seconds
        }

        this.timerStop()
        this.changeCodeStatus()
      },
      minutes() {
        const min = Math.floor(this.totalTime / 60)
        return min >= 10 ? min : '0' + min
      },
      seconds() {
        const sec = this.totalTime - (this.minutes * 60)
        return sec >= 10 ? sec : '0' + sec
      }
    },
    methods: {
      timerRun() {
        this.interval = setInterval(this.countdownTimer, 1000)
      },
      timerStop() {
        clearInterval(this.interval)
      },
      countdownTimer() {
        this.totalTime--
      },
      changeCodeStatus() {
        this.$emit('sendNewCode', true)
      }
    },
    mounted() {
      this.timerRun()
    },
    beforeDestroy() {
      this.timerStop()
    }
  }
</script>
