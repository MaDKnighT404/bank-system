import { computed, watch } from "vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

function useLoginForm() {
  const store = useStore();
  const router = useRouter();
  const { handleSubmit, isSubmitting, submitCount } = useForm();

  const {
    value: email,
    errorMessage: emailError,
    handleBlur: emailBlur,
  } = useField(
    "email",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите email")
      .email("Необходимо ввести корректный email")
  );
  const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur,
  } = useField(
    "password",
    yup
      .string()
      .trim()
      .required("Пожалуйста введите пароль")
      .min(6, "Пароль не может быть меньше 6 символов")
  );

  const isTooManyAttempts = computed(() => submitCount.value >= 3);

  const onSubmit = handleSubmit(async (values) => {
    try {
      await store.dispatch("auth/login", values);
      router.push("/");
    } catch (e) {}
  });

  watch(isTooManyAttempts, (val) => {
    if (val) {
      setTimeout(() => (submitCount.value = 0), 1500);
    }
  });

  return {
    email,
    emailError,
    emailBlur,
    password,
    passwordBlur,
    passwordError,
    onSubmit,
    isSubmitting,
    isTooManyAttempts,
  };
}

export default useLoginForm;
