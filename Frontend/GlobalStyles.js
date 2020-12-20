import { StyleSheet } from "react-native";
import { fontColor } from "./src/Authentication/Login/LoginPageStyles";
import React from "react";

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F0FFFF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
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
    backgroundColor: "white",
  },
  blackInput: {
    marginTop: 10,
    marginHorizontal: 15,
    marginBottom: 0,
    height: 40,
    width: 325,
    borderColor: "#999",
    color: "#000",
    borderWidth: 1,
    borderRadius: 3,
  },
  blackInputLabel: {
    color: "#000",
    fontSize: 15,
    marginLeft: 15,
    marginTop: 10,
  },
  scrollViewFullWidth: {
    flex: 0.9,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  topBarTitle: {
    textAlign: "center",
    color: "white",
    fontSize: 24,
    marginLeft: 10,
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
    backgroundColor: "darkblue",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  navIconsBox: {
    flex: 0.4,
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

export const iconSize = 36;
export const iconColor = "white";

export const listItemAttributeTextStyle = (marginLeft) =>
  StyleSheet.create({
    style: {
      fontSize: 14,
      color: "black",
      marginLeft: marginLeft,
    },
  });
