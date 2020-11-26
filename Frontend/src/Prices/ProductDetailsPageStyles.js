import {StyleSheet} from 'react-native';

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    flex: 0.1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
  },
  infoBlock: {
    flex: 0.45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    flex: 0.55,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  beerImage: {
    width: 120,
    height: 240,
    marginLeft: 20,
  },
  rightBlock: {
    flex: 0.45,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  leftBlock: {
    flex: 0.35,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 30,
    marginRight: 30,
  },
  orderButton: {
    backgroundColor: 'darkblue',
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 30,
    borderRadius: 10,
    width: 100,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  }
});

