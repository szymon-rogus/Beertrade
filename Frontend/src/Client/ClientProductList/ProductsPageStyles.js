import {StatusBar, StyleSheet} from "react-native";

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
    marginBottom: 5,
    width: "90%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    color: "#222",
  },
  title: {
    fontSize: 24,
    marginBottom: 25,
    fontWeight: "bold",
  },
  attributes: {
    fontSize: 14,
    color: "black",
  },

  tableChoose: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 15,
  },
  searchBar: {
    flex: 0.1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  autocomplete: {
    zIndex: 1,
    width: '70%',
    marginTop: 15,
  },
  autocompleteElement: {
    backgroundColor: "white",
    width: "100%",
    borderWidth: 1,
  },
  navBar: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  beerImage: {
    width: 60,
    height: 80,
    alignSelf: "center",
  },
  searchIcon: {
    marginRight: 10,
    marginTop: 5
  },
});

export const buttonStyleSheet = (isTableSet) =>
    StyleSheet.create({
      orderButton: {
        backgroundColor: isTableSet ? "darkblue" : "grey",
        elevation: 8,
        paddingVertical: 3,
        paddingHorizontal: 12,
        marginTop: 5,
        fontSize: 12,
        borderRadius: 10,
      },
    });
