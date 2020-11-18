import {StatusBar, StyleSheet} from 'react-native';

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  titleContainer: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    padding: 10,
  },
  infoBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  photo: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightBlock: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  leftBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 20,
    marginLeft: 30,
    marginRight: 30,
  },
  orderButton: {
    backgroundColor: 'darkblue',
    elevation: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 20,
    borderRadius: 10,
    width: 100,
  },
});

