import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  //the only difference with listStyles.js#item is that it has smaller width
  item: {
    flex: 0.25,
    elevation: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin: 15,
    width: 320,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderColor: "black",
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
  },
  leftSection: {
    flex: 0.6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',

  },
  rightSection: {
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  mediumText: {fontSize: 18, color: 'black'},
  smallText: {fontSize: 16, color: 'black'},
});