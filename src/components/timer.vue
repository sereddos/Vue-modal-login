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
      time: function() {
        if (this.minutes === '00' && this.seconds === '00') {
          this.timerStop();
          this.changeCodeStatus();
          return;
        } else {
          return this.minutes + ":" + this.seconds;
        }
      },
      minutes: function() {
        let min = Math.floor(this.totalTime / 60);
        return min >= 10 ? min : '0' + min;
      },
      seconds: function() {
        let sec = this.totalTime - (this.minutes * 60);
        return sec >= 10 ? sec : '0' + sec;
      }
    },
    methods: {
      timerRun() {
        this.interval = setInterval(this.countdownTimer, 1000);
      },
      timerStop() {
        clearInterval(this.interval);
      },
      countdownTimer() {
        this.totalTime--;
      },
      changeCodeStatus() {
        this.$emit('setNewCode', true);
      }
    },
    mounted() {
      this.timerRun();
    },
    beforeDestroy() {
      this.timerStop();
    }
  }
</script>
