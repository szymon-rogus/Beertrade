import {StyleSheet} from "react-native";

export const sorterStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: '4%',
    paddingVertical: '4%',
  },
  sorterProperty: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sorterPropertyTitle: {
    fontSize: 24,
  },
  sorterButton: {
    flexDirection: 'row',
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 12,
    margin: 5,
    fontSize: 14,
    borderRadius: 10,
    width: 80,
  },
  sortingSwitchSelector: {
    width: 200,
  },
  picker: {
    flex: 0.2,
    backgroundColor: '#D3D3D3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selector: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  filterButtonContainer: {
    flexDirection: 'row',
    flex: 0.3,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
});
