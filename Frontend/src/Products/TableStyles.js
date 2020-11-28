import { StyleSheet } from "react-native";

export const tableStyles = function (color, fontsize) {
  return StyleSheet.create({
    topBar: {
      flex: 0.25,
      marginTop: 10,
      marginBottom: 10,
      backgroundColor: color,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 10,
      paddingBottom: 10,
      width: "100%",
    },
    titleBox: {
      flex: 1.0,
      margin: 1,
      backgroundColor: color,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    title: {
      textAlign: "center",
      color: "white",
      fontSize: fontsize,
    },
  });
};

export const chooseTablePopupStyles = function () {
  return StyleSheet.create({
    leaveTableButton: {
      backgroundColor: "darkblue",
      width: "50%",
    },
    closeButton: {
      backgroundColor: "red",
      width: "50%",
    },
    text: {
      color: "white",
      textAlign: "center",
      padding: 10,
    },
    modalStyle: {
      alignItems: "center",
      backgroundColor: "white",
      width: "90%",
    },
    chooseTableLabel: {
      flex: 0.1,
      justifyContent: "center",
      width: "100%",
    },
    tableListBox: {
      flex: 0.9,
      alignItems: "center",
      width: "100%",
    },
  });
};
