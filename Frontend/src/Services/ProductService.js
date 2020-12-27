import { http } from "../../Global";

export function getProductList() {
  return http.get("/product/onStore")
      .then(response => response.data)
}

export function getProductDetails(id) {
  return http.get("/product/details/" + id)
      .then(response => response.data)
}

export function getManageProductList() {
  return http.get("/product/manage/all")
      .then(response => response.data)
      .then(productList => {
        let fetchedList = [];
        fetchedList.push(...productList);
        const enabled = fetchedList.filter(
            (item) => item.productState === "ON_STORE"
        );
        const disabled = fetchedList.filter(
            (item) => item.productState !== "ON_STORE"
        );
        return {enabled, disabled}
      })
}

export function getFullProductInfo(id) {
  return http.get("/product/" + id)
      .then(response => response.data)
}

export function getProductsConfiguration() {
  return http.get("/product/configure/all")
      .then(response => response.data)
}


