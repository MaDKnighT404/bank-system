<template>
  <TheNavbar />
  <TheSidebar />
  <div class="container with-nav">
    <AppMessage />
    <RouterView />
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";
import AppMessage from "../components/ui/AppMessage";
import TheSidebar from "@/components/TheSidebar";

export default {
  components: { TheNavbar, AppMessage, TheSidebar },
};
</script>

<style lang="scss" scoped></style>
