<template>
  <div v-if="visible" class="modal">
    <div class="modal__wrapper">
      <div class="modal__header">
        <h1 class="modal__title">{{ modalTitle }}</h1>
        <span class="modal__close" @click="hide">
          <close-icon></close-icon>
        </span>
      </div>
      <div class="modal__body">
        <phone v-if="phone" @setCode="setCode"></phone>
        <confirmation-code v-else @isNewPhone="setNewPhone" :phone="phoneNumber"></confirmation-code>
      </div>
      <div class="modal__footer">
        <p v-if="phone" class="phone__desc">Нажимая кнопку «Продолжить», я даю согласие на обработку моих персональных
          данных и принимаю настоящие <a href="#">Соглашения</a></p>
      </div>
    </div>
  </div>
</template>

<script>
  import closeIcon from './icons/modal_close.vue';
  import phone from './phone.vue';
  import confirmationCode from './confirmation_code.vue';

  export default {
    name: 'modal-login',
    components: {
      'close-icon': closeIcon,
      'phone': phone,
      'confirmation-code': confirmationCode
    },
    props: {
      visible: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        phone: true,
        phoneNumber: ''
      };
    },
    computed: {
      modalTitle() {
        return !this.phone ? 'Введите код' : 'Вход или регистрация';
      }
    },
    methods: {
      hide() {
        this.visible = false;
      },
      setCode(code, number) {
        this.phone = code;
        this.phoneNumber = number;
      },
      setNewPhone(newPhone) {
        this.phone = newPhone;
        this.phoneNumber = '';
      }
    }
  };
</script>
