import {StyleSheet} from 'react-native';

export const fontColor = 'white'
export const bgColor = 'darkorchid'

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: bgColor,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    margin: 15,
    height: 40,
    width: 300,
    borderColor: 'white',
    borderWidth: 1
  },
  buttonStyle: {
    backgroundColor: 'white',
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15
  },
  textStyle: {
    textAlign: 'center',
    color: fontColor,
    fontSize: 24
  }
})
