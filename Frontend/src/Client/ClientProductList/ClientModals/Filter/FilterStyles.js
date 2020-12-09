import {StyleSheet} from "react-native";

export const filterStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },
  filterTitle: {
    flex: 0.12,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  filterProperty: {
    flex: 0.23,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  filterPropertyType: {
    flex: 0.25,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  filterPropertyTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
  },
  filterPropertyAttribute: {
    fontSize: 18,
    color: 'black',
  },
  filterPropertyRow: {
    flexDirection: 'row',
  },
  filterBarier: {
    paddingTop: 10,
    paddingLeft: 10,
    flex: 0.15
  },
  filterValue: {
    flex: 0.2,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  itemType: {
    flex: 1,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  filterButtonContainer: {
    flexDirection: 'row',
    flex: 0.17,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  filterButton: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 12,
    margin: 5,
    fontSize: 15,
    borderRadius: 10,
    width: 80,
  },
  dropdownList: {
    backgroundColor: '#D3D3D3',
    width: 200
  },
});
