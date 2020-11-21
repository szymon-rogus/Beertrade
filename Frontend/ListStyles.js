import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
  item: {
    flex: 0.25,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
    width: 350,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  attributeView: {
    flex: 0.25,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  itemLabelText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
  },
  itemValueText: {
    fontSize: 14,
    color: "black",
  },
  title: {
    fontSize: 32,
  },
});
