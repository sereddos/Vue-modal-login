<template>
  <div v-if="phone" class="phone">
    <label for="phone" class="phone__label">Номер телефона</label>
    <input
        @click="click"
        @mouseout="focusout"
        @focusout="focusout"
        ref="inputRef"
        id="phone"
        inputmode="tel"
        v-model="phoneNumber"
        class="phone__input"
        :mask="phoneMask"
        placeholder="+7 (___) ___-__-__"
        type="tel"/>
    <button @click="submit" class="phone__submit" :disabled="disabled">Продолжить</button>
    <p v-if="error" class="phone__error-text">Для продолжения ведите корректный номер телефона</p>
  </div>
</template>

<script>
  import Inputmask from "inputmask";

  export default {
    name: 'phone',
    props: {
      phone: {
        type: Boolean,
        default: true
      },
      mask: {
        type: String,
        default: '+9 (999) 999-99-99'
      },
      maskPlaceholder: {
        type: String,
        default: '_'
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    watch: {
      mask() {
        this.setMask();
      },
      maskPlaceholder() {
        this.setMask();
      }
    },
    data() {
      return {
        disabled: true,
        error: false,
        phoneNumber: '',
        phoneMask: '7 (999) 999-9999',
      };
    },
    methods: {
      setMask() {
        if (!this.$refs.inputRef) {
          return
        }

        if (this.mask) {
          this.setInputMask()
          return
        }

        if (this.$refs.inputRef.inputmask) {
          this.$refs.inputRef.inputmask.remove();
        }
      },
      setInputMask() {
        const im = new Inputmask(this.mask, {
          placeholder: this.maskPlaceholder,
          showMaskOnHover: false,
          showMaskOnFocus: false
        });
        im.mask(this.$refs.inputRef)
      },
      click() {
        this.setMask()
        this.setSeven()
      },
      updateErrorState() {
        this.disabled = !this.$refs.inputRef.inputmask.isComplete();
        this.error = this.disabled;
      },
      focusout() {
        this.setSeven();
        this.updateErrorState();
      },
      setSeven() {
        if (!this.phoneNumber || this.phoneNumber === '+_ (___) ___-__-__') this.phoneNumber = '7';
      },
      submit() {
        this.$emit('setCode', false, this.phoneNumber);
      }
    },
    mounted() {
      this.click();
    }
  };

</script>
