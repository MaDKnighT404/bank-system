<template>
  <div class="container">
    <AppMessage />
    <RouterView></RouterView>
  </div>
</template>

<script>
import AppMessage from "../components/ui/AppMessage";
export default {
  components: { AppMessage },
};
</script>

<style lang="scss" scoped></style>
