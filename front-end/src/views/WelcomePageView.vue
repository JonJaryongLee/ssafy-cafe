<template>
  <div class="welcome-page common-container">
    <header>
      <Header v-bind:headerTitle="headerTitle" />
    </header>
    <main>
      <div class="page-loading" v-if="loading">
        <div class="spinner-border" role="status"></div>
      </div>
      <div class="welcome-page-main" v-if="!loading">
        <div class="order-btn-container">
          <router-link to="/order">
            <button type="button" class="order-btn btn btn-outline-dark">
              주문하기
            </button>
          </router-link>
        </div>
        <div class="order-change-btn-container">
          <router-link to="/order-change">
            <button type="button" class="order-change-btn btn btn-outline-dark">
              변경하기
            </button>
          </router-link>
        </div>
        <div class="coffee-icon-container">
          <span class="coffee-icon material-symbols-outlined">
            local_cafe
          </span>
        </div>
      </div>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import { api } from "../utils/axios";
import { mapState, mapMutations } from "vuex";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default {
  name: "WelcomePageView",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      headerTitle: "SSAFY CAFE",
    };
  },
  computed: {
    ...mapState(["menus", "loading"]),
  },
  async created() {
    if (this.menus.length !== 0) {
      this.setLoading(false);
      return;
    }
    try {
      const response = await api.getAllMenus();
      if (response.data) {
        this.setMenus(response.data);
        this.setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    ...mapMutations(["SET_MENUS", "SET_LOADING"]),
    setMenus(menus) {
      this.SET_MENUS(menus);
    },
    setLoading(flag) {
      this.SET_LOADING(flag);
    },
  },
};
</script>

<style scoped>
.welcome-page-main {
  display: flex;
  flex-direction: column;
}
.order-btn-container,
.order-change-btn-container,
.coffee-icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.order-btn-container {
  flex: 1;
}
.order-change-btn-container {
  flex: 1;
}
.order-btn,
.order-change-btn {
  width: 200px;
}
.coffee-icon-container {
  flex: 3;
}
.coffee-icon {
  font-size: 12rem;
}
</style>
