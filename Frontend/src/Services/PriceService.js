import { http } from "../../Global";

export function getPrice(id) {
  return http.get("/price/" + id)
      .then(response => response.data)
}

export function getPrices() {
  return http.get("/price/all")
      .then(response => response.data)
}
