import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    flex: 0.25,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 5,
    width: 300,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: 'black',
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2
  },
  title: {
    fontSize: 24,
    marginBottom: 25,
    fontWeight: 'bold',
  },
  attributes: {
    fontSize: 14,
    color: 'black'
  },

  tableChoose: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15
  },
  orderButton: {
    backgroundColor: 'darkblue',
    elevation: 8,
    paddingVertical: 3,
    paddingHorizontal: 12,
    marginTop: 5,
    fontSize: 12,
    borderRadius: 10,
  },

  searchBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderStyle: 'dotted',
    borderWidth: 1.5,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 220,
    paddingHorizontal: 10,
    marginTop: 10,
    marginRight: 20,
  },

  navBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
