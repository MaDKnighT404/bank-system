<template>
  <form
    class="card"
    @submit.prevent="onSubmit"
  >
    <p>login: test@test.ru</p>
    <p>password: test123</p>
    <p>(функция добавление новых пользователей в работе)</p>
    <h1>Войти в систему</h1>

    <div :class="['form-control', { invalid: emailError }]">
      <label for="email">Email</label>
      <input
        type="email"
        id="email"
        v-model="email"
        @blur="emailBlur"
      />
      <small v-if="emailError">{{ emailError }}</small>
    </div>

    <div :class="['form-control', { invalid: passwordError }]">
      <label for="password">Пароль</label>
      <input
        type="password"
        id="password"
        v-model="password"
        @blur="passwordBlur"
      />
      <small v-if="passwordError">{{ passwordError }}</small>
    </div>

    <button
      class="btn primary"
      type="submit"
      :disabled="isSubmitting || isTooManyAttempts"
    >
      Войти
    </button>

    <div
      class="text-danger"
      v-if="isTooManyAttempts"
    >
      Вы слишком часто пытаетесь войти в систему. Попробуйте позже
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import useLoginForm from "../hooks/useLoginForm";
import error from "../utils/error.js";
export default {
  setup() {
    const route = useRoute();
    const store = useStore();

    if (route.query.message) {
      store.dispatch("setMessage", {
        value: error(route.query.message),
        type: "warning",
      });
    }

    return {
      ...useLoginForm(),
    };
  },
};
</script>

<style lang="scss" scoped></style>
