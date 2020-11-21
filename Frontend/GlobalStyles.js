import { StyleSheet } from "react-native";
import { fontColor } from "./src/Login/LoginPageStyles";


export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appTitle: {
    textAlign: "center",
    fontWeight: "bold",
    color: fontColor,
    fontSize: 48,
  },
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: "darkblue",
    borderWidth: 1,
  },
  topBarTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  topBar: {
    flex: 0.1,
    backgroundColor: "darkblue",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  titleBox: {
    flex: 0.6,
    margin: 15,
    backgroundColor: "darkblue",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navIconsBox: {
    flex: 0.4,
    margin: 15,
    backgroundColor: "darkblue",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export const topBarIconStyle = (margin) =>
  StyleSheet.create({
    style: {
      margin: margin,
    },
  });

export const listItemAttributeTextStyle = (marginLeft) =>
  StyleSheet.create({
    style: {
      fontSize: 14,
      color: "black",
      marginLeft: marginLeft,
    },
  });
