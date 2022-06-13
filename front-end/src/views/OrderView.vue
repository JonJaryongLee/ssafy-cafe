<template>
  <div class="order common-container">
    <header>
      <Header v-bind:headerTitle="headerTitle" />
    </header>
    <main v-if="!successFlag">
      <div class="page-loading" v-if="loading">
        <div class="spinner-border" role="status"></div>
      </div>
      <div class="order-page-main" v-if="!loading">
        <div class="go-to-welcome-container">
          <router-link to="/">
            <span class="arrow-back-icon">
              <span class="material-symbols-outlined"> arrow_back </span>
            </span>
          </router-link>
          <span class="go-to-welcome-text">뒤로가기</span>
        </div>
        <div
          class="each-menu-container"
          v-for="menu in menus"
          v-bind:key="menu.menu_id"
          data-bs-toggle="modal"
          data-bs-target="#orderModal"
          v-on:click="menuSelect(menu.menu_id)"
        >
          <img v-bind:src="menu.menu_img_link" alt="카페메뉴사진" />
          <div>
            <h2 class="menu-name">{{ menu.menu_name }}</h2>
            <p class="menu-description">{{ menu.menu_description }}</p>
          </div>
        </div>
      </div>
      <OrderModal
        v-bind:selectedMenuId="selectedMenuId"
        v-bind:selectedMenuName="selectedMenuName"
        v-on:successFlagChange="successFlagChange"
      />
    </main>
    <main v-if="successFlag">
      <OrderSuccess v-on:successFlagChange="successFlagChange" />
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import { api } from "../utils/axios";
import { mapMutations, mapState } from "vuex";

import Header from "../components/Header";
import Footer from "../components/Footer";
import OrderModal from "../components/Order/OrderModal";
import OrderSuccess from "../components/Order/OrderSuccess.vue";

export default {
  name: "OrderView",
  components: {
    Header,
    Footer,
    OrderModal,
    OrderSuccess,
  },
  data() {
    return {
      headerTitle: "주문하기",
      selectedMenuId: -1,
      selectedMenuName: "",
      successFlag: false,
    };
  },
  async created() {
    if (!this.menus.length) {
      try {
        this.SET_LOADING(true);
        const response = await api.getAllMenus();
        if (response.data) {
          this.SET_MENUS(response.data);
        }
        this.SET_LOADING(false);
      } catch (error) {
        console.log(error);
      }
    }
  },
  computed: {
    ...mapState(["menus", "loading"]),
  },
  methods: {
    ...mapMutations(["SET_MENUS", "SET_LOADING"]),
    async menuSelect(selectedMenuId) {
      this.selectedMenuId = selectedMenuId;
      try {
        const response = await api.getMenu(selectedMenuId);
        if (response.data) {
          this.selectedMenuName = response.data.menu_name;
        }
      } catch (error) {
        console.log(error);
      }
    },
    successFlagChange(flag) {
      this.successFlag = flag;
    },
  },
};
</script>

<style scoped>
main {
  overflow: scroll;
}
.each-menu-container {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
  display: flex;
}

img {
  width: 80px;
  height: 120px;
}

.menu-name {
  font-weight: bold;
  padding-top: 10px;
  padding-left: 10px;
}

.menu-description {
  padding-top: 10px;
  padding-left: 20px;
}
</style>
