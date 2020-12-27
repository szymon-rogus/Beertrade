import { http } from "../../Global";

export function getSession() {
  return http.get("/session")
      .then((response) => response.data === "START")
}
