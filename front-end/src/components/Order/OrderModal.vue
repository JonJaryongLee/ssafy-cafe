<template>
  <div
    class="modal fade"
    id="orderModal"
    tabindex="-1"
    aria-labelledby="orderModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderModalLabel">주문하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="user-selected-menu-name">
            선택한 메뉴: <span class="menu-text">{{ selectedMenuName }}</span>
          </div>
          <select
            v-model="quantitySelected"
            class="order-quantity-container form-select"
          >
            <option value="quantityAskText">몇 개 주문하시나요?</option>
            <option value="1">1개</option>
            <option value="2">2개</option>
            <option value="3">3개</option>
          </select>

          <div class="order-detail-container form-floating">
            <input
              class="form-control"
              id="orderDetailInput"
              placeholder="요청사항"
              v-model="menuOrderDetail"
            />
            <label for="orderDetailInput">요청사항을 적어주세요</label>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            닫기
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="askOrder"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { api } from "../../utils/axios";

export default {
  name: "OrderModal",
  props: ["selectedMenuId", "selectedMenuName"],
  data() {
    return {
      quantitySelected: "quantityAskText",
      menuOrderDetail: undefined,
    };
  },
  methods: {
    async askOrder() {
      if (this.quantitySelected !== "quantityAskText") {
        try {
          const response = await api.postOrder(
            this.selectedMenuId,
            Number(this.quantitySelected),
            this.menuOrderDetail
          );
          if (response.data.post_order) {
            this.$emit("successFlagChange", true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>

<style scoped>
.user-selected-menu-name,
.order-quantity-container {
  margin-bottom: 10px;
}
.menu-text {
  font-weight: bold;
}
</style>