import {StyleSheet} from 'react-native';

export const fontColor = 'darkblue'
export const bgColor = 'white'

export const styles = StyleSheet.create({
  logInPageButton: {
    backgroundColor: 'darkblue',
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15
  },
  forgottenPasswordText: {
    color: fontColor,
    textDecorationLine: 'underline'
  }
})