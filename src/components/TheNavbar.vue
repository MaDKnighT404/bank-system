<template>
  <nav class="navbar">
    <h3>Online Bank</h3>

    <ul class="navbar-menu">
      <li>
        <RouterLink to="/"> Заявки </RouterLink>
      </li>
      <li>
        <RouterLink to="/help"> Помощь </RouterLink>
      </li>
      <li>
        <a href="#" @click.prevent="openSidebar">Сообщения</a>
      </li>
      <li>
        <a
          href="#"
          @click.prevent="logout"
          >Выход</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { RouterLink } from "vue-router";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const logout = () => {
      store.commit("auth/logout");
      router.push("/auth");
    };

    const openSidebar = () => {
      store.commit("openSidebar");
    }

    return {
      logout,
      openSidebar
    };
  },
};
</script>

<style lang="scss" scoped></style>
