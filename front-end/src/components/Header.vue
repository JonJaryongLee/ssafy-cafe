<template>
  <div class="header">
    <h1>{{ headerTitle }}</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: ["headerTitle"],
};
</script>

<style scoped>
</style>
