import { StyleSheet } from "react-native";

const innerPadding = 5;

export const changesSaver = StyleSheet.create({
  bar:
    {
      width: "100%",
      backgroundColor: "#ddd",
      color: "darkblue",
      padding: innerPadding,
      flexDirection: "row",
      justifyContent: "space-around",
    },
  text: {fontSize: 15, color: "#000", textAlign: "center", padding: innerPadding},
  button: {
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "#fff",
    paddingHorizontal:8,
    paddingVertical: innerPadding,
    borderRadius: 3,

  },
  buttonText: {
    color: "#000",
  }
})