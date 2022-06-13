<template>
  <div class="order-change-success">
    <h1>{{ mode }} 완료!</h1>
    <div class="order-change-again-btn-container">
      <button
        type="button"
        class="order-change-again-btn btn btn-outline-dark"
        v-on:click="successFlagOff"
      >
        추가변경
      </button>
    </div>
    <div class="go-to-welcome-btn-container">
      <router-link to="/">
        <button type="button" class="go-to-welcome-btn btn btn-outline-dark">
          메인화면
        </button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderChangeSuccess",
  props: ["mode"],
  methods: {
    successFlagOff() {
      this.$emit("successFlagChange", false);
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 50px;
  margin-bottom: 50px;
}

.order-change-again-btn,
.go-to-welcome-btn {
  width: 200px;
  margin-bottom: 50px;
}
</style>
