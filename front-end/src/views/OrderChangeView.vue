<!-- 변경 기능은 구현의 난이도때문에 구현 보류 -->
<!-- 상당히 어렵습니다. -->

<template>
  <div class="order-change common-container">
    <header>
      <Header v-bind:headerTitle="headerTitle" />
    </header>
    <main v-if="!successFlag">
      <div class="page-loading" v-if="loading">
        <div class="spinner-border" role="status"></div>
      </div>
      <div class="order-change-page-main" v-if="!loading">
        <div class="go-to-welcome-container">
          <router-link to="/">
            <span class="arrow-back-icon">
              <span class="material-symbols-outlined"> arrow_back </span>
            </span>
          </router-link>
          <span class="go-to-welcome-text">뒤로가기</span>
        </div>
        <div v-if="orders.length">
          <div
            class="each-order-container card border-secondary"
            v-for="order in orders"
            v-bind:key="order.order_id"
          >
            <div class="card-header">주문번호 {{ order.order_id }}</div>
            <div class="card-body text-secondary">
              <h5 class="card-title">{{ order.menu_name }}</h5>
              <p class="card-text">수량: {{ order.menu_quantity }}</p>
              <p class="card-text">요청사항: {{ order.menu_order_detail }}</p>
              <div class="btns-container">
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#orderChangeModal"
                >
                  변경
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  v-on:click="deleteOrder(order.order_id)"
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>
          <h1>주문이 없습니다...</h1>
        </div>
      </div>
    </main>
    <main v-if="successFlag">
      <OrderChangeSuccess
        v-on:successFlagChange="successFlagChange"
        v-bind:mode="mode"
      />
    </main>
    <OrderChangeModal />
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
import OrderChangeSuccess from "../components/OrderChange/OrderChangeSuccess";
import OrderChangeModal from "../components/OrderChange/OrderChangeModal";

export default {
  name: "OrderChangeView",
  components: {
    Header,
    Footer,
    OrderChangeSuccess,
    OrderChangeModal,
  },
  data() {
    return {
      headerTitle: "주문변경",
      successFlag: false,
      orders: [],
      mode: "",
    };
  },
  async created() {
    this.mode = "";
    if (!this.menus.length) {
      try {
        this.SET_LOADING(true);
        const response = await api.getAllMenus();
        if (response.data) {
          this.SET_MENUS(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!this.orders.length) {
      try {
        this.SET_LOADING(true);
        const response = await api.getAllOrders();
        if (response.data) {
          this.orders = response.data;
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (this.menus.length) {
      this.SET_LOADING(false);
    }
  },
  computed: {
    ...mapState(["menus", "loading"]),
  },
  methods: {
    ...mapMutations(["SET_MENUS", "SET_LOADING"]),
    successFlagChange(flag) {
      this.mode = "";
      this.successFlag = flag;
    },
    async deleteOrder(orderId) {
      try {
        const response = await api.deleteOrder(orderId);
        if (response.data) {
          this.mode = "취소";
          // order 리스트 갱신
          try {
            const response = await api.getAllOrders();
            if (response.data) {
              this.orders = response.data;
            }
          } catch (error) {
            console.log(error);
          }
          this.successFlag = true;
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
main {
  overflow: scroll;
}

.each-order-container {
  margin-left: 50px;
  margin-right: 50px;
  margin-bottom: 30px;
}
.btns-container {
  display: flex;
  justify-content: space-between;
}
button {
  width: 100px;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
