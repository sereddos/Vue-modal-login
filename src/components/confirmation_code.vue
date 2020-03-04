<template>
  <div v-if="visible" class="code">
    <p class="code__phone-number">Мы отправили код на {{phone}}</p>
    <span @click="changePhone" class="code__phone-number-change">Изменить</span>
    <div class="code__input-wrapper">
      <input v-for="(item, index) in codeInputs"
             ref="codeRefs"
             inputmode="numeric"
             v-model="item.name"
             :key="index"
             class="code__input"
             type="tell"
             pattern="\d[0-9]"
             maxlength="1"
             @keyup="keyup"/>
      <p v-if="error" class="code__error-text">Вы ввели неправильный код, попробуйте еще раз</p>
    </div>
    <p v-if="!newCode" @click="sendCodeAgain" class="code__send-again">Отправить код еще раз</p>
    <p v-else class="code__send-again code__send-again_new">
      Получить новой код можно <br>через
      <timer @sendNewCode="sendNewCode"></timer>
    </p>
  </div>
</template>

<script>

  import Timer from './timer.vue'

  export default {
    name: 'confirmation-code',
    components: {
      'timer': Timer
    },
    props: {
      phone: {
        type: String,
        default: ''
      },
      visible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        codeNumber: '',
        error: false,
        newCode: true,
        currentTime: 60,
        codeInputs: [
          {name: ''},
          {name: ''},
          {name: ''},
          {name: ''}
        ],
        rightCode: '1111'
      }
    },
    methods: {
      sendNewCode() {
        this.newCode = false
      },
      sendCodeAgain() {
        this.newCode = true
        this.error = false
        this.setFocusOnFirst()
      },
      setFocusOnFirst() {
        this.$refs.codeRefs[0].focus()
      },
      changePhone() {
        this.$emit('isNewPhone', true)
      },
      keyup(e) {
        if (e.target.nextElementSibling && e.target.value !== '') {
          e.target.nextElementSibling.focus()
        }

        const code = this.codeInputs.reduce(function (sum, current) {
          return sum + current.name
        }, '')

        const isCodeRight = code.length === this.codeInputs.length && code !== this.rightCode
        if (!isCodeRight) {
          this.error = false
          return
        }

        this.error = true
        this.codeInputs = this.codeInputs.map(item => ({name: ''}))
        this.setFocusOnFirst()
      }
    },
    mounted() {
      this.setFocusOnFirst()
    }
  }

</script>
