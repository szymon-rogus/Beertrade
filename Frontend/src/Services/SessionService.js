import { http } from "../../Global";

export function getSession(): boolean {
  return http.get("/session")
      .then((response) => response.data === "START")
}
