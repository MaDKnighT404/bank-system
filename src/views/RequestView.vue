<template>
  <AppLoader v-if="loading"></AppLoader>
  <AppPage
    back
    title="Заявка"
    v-else-if="request"
  >
    <p><strong>Имя владельца</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>: <AppStatus :type="request.status"></AppStatus></p>

    <div class="form-control">
      <label for="status">Статус</label>
      <select
        id="status"
        v-model="status"
      >
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button
      class="btn danger"
      @click="remove"
    >
      Удалить
    </button>

    <button
      class="btn"
      @click="update"
      v-if="hasChanges"
    >
      Обновить
    </button>
  </AppPage>
  <h3
    v-else
    class="text-centr text-white"
  >
    Заявки с ID = {{ currentCardId }} не существует
  </h3>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import AppPage from "../components/ui/AppPage";
import AppLoader from "../components/ui/AppLoader";
import AppStatus from "../components/ui/AppStatus";
import { currency } from "../utils/currency";


export default {
  components: { AppPage, AppLoader, AppStatus },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const currentCardId = route.params.id;
    const status = ref();
    const loading = ref(true);
    const request = ref({});
    const hasChanges = computed(() => request.value.status !== status.value);

    onMounted(async () => {
      loading.value = true;
      request.value = await store.dispatch("request/loadOne", currentCardId);
      status.value = request.value?.status;
      loading.value = false;
    });

    const remove = async () => {
      await store.dispatch("request/remove", currentCardId);
      router.push("/");
    };

    const update = async () => {
      const updateData = { ...request.value, status: status.value, id: currentCardId };

      await store.dispatch("request/update", updateData);
      request.value.status = status.value;
    };

    return {
      loading,
      request,
      currentCardId,
      currency,
      remove,
      update,
      status,
      hasChanges,
    };
  },
};
</script>

<style lang="scss" scoped></style>
