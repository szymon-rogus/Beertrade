import { StyleSheet } from "react-native";
import { bgColor, fontColor } from "./src/Login/LoginPageStyles";

export const listStyles = StyleSheet.create({
  item: {
    flex: 1,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
    width: 300,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'darkorchid',
    borderRadius: 20,
    borderColor: 'white',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  itemText: {
    fontSize: 16,
    color: 'white'
  },
  title: {
    fontSize: 32,
  },
})