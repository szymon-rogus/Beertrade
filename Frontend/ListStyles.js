import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
  item: {
    flex: 0.25,
    elevation: 8,
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    width: "90%",
    marginBottom: "2%",
    marginTop: "2%",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
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
