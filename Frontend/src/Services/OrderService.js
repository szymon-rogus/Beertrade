import { http } from "../../Global";

export function getWaitingOrders() {
  return http.get("/order/waiting")
      .then(response => response.data)
      .then(waitingOrders => {
        return [...waitingOrders]
      })
}

export function getBartenderStats() {
  return http.get("/order/bartenderStats")
      .then(response => response.data)
}

export function getClientOrders() {
  return http.get('/order/myOrders')
      .then(response => response.data)
      .then(orderList => {
        return [...orderList]
      })
}
