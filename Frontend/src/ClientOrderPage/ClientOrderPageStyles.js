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
  bartenderStatisticsBox: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  orderStatsInsideBox: {
    flex: 0.3,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    paddingBottom: 9
  },
  inQueueText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  statsText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  lastOrderLayer: {
    backgroundColor: 'rgba(105, 105, 105, 0.6)',
    flex: 1.0,
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});