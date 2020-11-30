import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  listBox: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "center",
    width: "90%",
  },
  listTitle: {
    fontSize: 18,
    color: "black",
    marginBottom: 12,
  },
  listImage: {
    width: 50,
    height: 100,
  },
  listAttributes: {
    fontSize: 14,
    color: "black",
    marginBottom: 40,
  },
  switchSelector: {
    marginTop: 12,
    marginRight: 12,
    marginLeft: 12,
  },
  listItemImageBox: {
    flex: 0.25,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemAttributeBox: {
    flex: 0.625,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  listItemIconBox: {
    flex: 0.125,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
