import { http } from "../../Global";

export function getProductList(): Array<Product>  {
  return http.get("/product/onStore")
      .then(response => response.data)
}

export function getProductDetails(id: string): ProductDetails {
  return http.get("/product/details/" + id)
      .then(response => response.data)
}

export function getManageProductList(): Array<ManageProduct> {
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


