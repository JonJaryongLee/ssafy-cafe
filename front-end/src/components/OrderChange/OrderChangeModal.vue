<template>
  <div
    class="modal fade"
    id="orderChangeModal"
    tabindex="-1"
    aria-labelledby="orderChangeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="orderChangeModalLabel">변경하기</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h1 style="color: red">변경 기능은 구현중입니다...</h1>
          <div class="menu-select">
            <select v-model="selectedMenuName" class="form-select">
              <option value="1">아메리카노</option>
              <option value="2">카페라떼</option>
              <option value="3">복숭아 아이스티</option>
            </select>
          </div>
          <div class="quantity-select">
            <select
              v-model="quantitySelected"
              class="order-quantity-container form-select"
            >
              <option value="quantityAskText">몇 개 주문하시나요?</option>
              <option value="1">1개</option>
              <option value="2">2개</option>
              <option value="3">3개</option>
            </select>
          </div>

          <div class="order-detail-container form-floating">
            <input
              class="form-control"
              id="orderDetailChangeInput"
              placeholder="요청사항"
              v-model="menuOrderDetail"
            />
            <label for="orderDetailChangeInput">요청사항을 적어주세요</label>
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
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">
            확인
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderModal",
  data() {
    return {
      selectedMenuName: "3",
      quantitySelected: "1",
      menuOrderDetail: "랄랄라",
    };
  },
};
</script>

<style scoped>
.menu-select,
.quantity-select,
.order-detail-container {
  margin-bottom: 10px;
}
</style>