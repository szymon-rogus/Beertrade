import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    color: 'white',
    fontSize: 28
  },
  topBar: {
    flex: 0.15,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleBox: {
    flex: 0.5,
    margin: 15,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  navIconsBox: {
    flex: 0.5,
    margin: 15,
    backgroundColor: 'darkblue',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  listTitle: {
    fontSize: 18,
    color: 'black',
    marginBottom: 12
  },
  listImage: {
    width: 50,
    height: 100,
  },
  listAttributes: {
    fontSize: 14,
    color: 'black'
  }
});