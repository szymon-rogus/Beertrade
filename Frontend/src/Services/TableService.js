import { http } from "../../Global";

export function getTable() {
  return http.get("/table/")
      .then(response => response.data)
      .then(table => {
        let isTableSet = true;
        if (!table.tableNumber) {
          isTableSet = false;
        }
        return {table, isTableSet}
      })
}

export function getAllTables() {
  return http.get("/table/reservable/")
      .then(response => response.data)
}
