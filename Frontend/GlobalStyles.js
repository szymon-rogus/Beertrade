import { StyleSheet } from "react-native";
import { bgColor, fontColor } from "./src/Login/LoginPageStyles";

export const globalStyles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: fontColor,
    fontSize: 48
  },
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: 'darkblue',
    borderWidth: 1
  },
})