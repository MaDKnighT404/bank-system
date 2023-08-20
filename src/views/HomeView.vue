<template>
  <AppLoader v-if="loading" />
  <AppPage
    title="Список заявок"
    v-else
  >
    <template #header>
      <button
        class="btn primary"
        @click="openModal"
      >
        Создать
      </button>
    </template>
    <RequestFilter v-model="filter"></RequestFilter>
    <RequestTable :requests="requests"></RequestTable>

    <teleport to="body">
      <AppModal
        title="Создать заявку"
        @close="closeModal"
        v-if="modal"
      >
        <RequestModal @created="closeModal" />
      </AppModal>
    </teleport>
  </AppPage>
</template>

<script>
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import AppPage from "../components/ui/AppPage";
import RequestTable from "../components/request/RequestTable";
import RequestModal from "../components/request/RequestModal";
import RequestFilter from "../components/request/RequestFilter";
import AppModal from "../components/ui/AppModal";
import AppLoader from "../components/ui/AppLoader";

export default {
  components: { AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter },
  setup() {
    const store = useStore();
    const modal = ref(false);
    const loading = ref(false);
    const filter = ref({});

    const closeModal = () => {
      modal.value = false;
    };
    const openModal = () => {
      modal.value = true;
    };

    onMounted(async () => {
      loading.value = true;
      await store.dispatch("request/load");
      loading.value = false;
    });

    const requests = computed(() =>
      store.getters["request/requests"]
        .filter((request) => {
          if (filter.value.name) {
            return request.fio.includes(filter.value.name);
          }
          return request;
        })
        .filter((request) => {
          if (filter.value.status) {
            return (filter.value.status === request.status);
          }
          return request;
        })
    );

    return {
      modal,
      closeModal,
      openModal,
      requests,
      loading,
      filter,
    };
  },
};
</script>
