import {StyleSheet} from "react-native";

export const ownerStyles = StyleSheet.create({
  item: {
    paddingVertical: "2%",
    paddingHorizontal: "3%",
    marginBottom: "2%",
    marginTop: "2%",
    backgroundColor: "white",
    borderColor: '#000',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    color: '#245234',
    borderRadius: 3
  },
  title: {
    fontSize: 23,
    color: '#000'
  },
  parameterView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: '1%'
  },
  parameter: {
    color: '#000',
    paddingVertical: 3,
    fontSize: 17,
  },
  input: {
    height: 30,
    borderColor: `#000`,
    borderWidth: 1,
    padding: 0,
    width: '30%',
    borderRadius: 3,
    textAlign: "right",
    paddingHorizontal: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: "2%",
  },
  button: {
    borderColor: `#000`,
    borderWidth: 1,
    padding: 5,
    borderRadius: 3,
    backgroundColor: '#eee',
    flex: 0.35,
  },
  buttonText: {
    color: '#000',
    textAlign: "center"
  }
});
