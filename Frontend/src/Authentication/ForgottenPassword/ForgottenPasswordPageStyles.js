import { StyleSheet } from "react-native";

export const fontColor = "darkblue";
export const bgColor = "white";

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColor,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: "darkblue",
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
  },
  textStyle: {
    textAlign: "center",
    color: fontColor,
    fontSize: 24,
  },
});
