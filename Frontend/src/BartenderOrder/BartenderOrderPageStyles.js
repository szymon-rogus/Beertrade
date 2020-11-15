import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  orderListContainer: {
    flex: 0.75,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  bartenderStatisticsBox: {
    flex: 0.15,
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  orderStatsInsideBox: {
    flex: 0.3,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 3,
    paddingBottom: 9,
  },
  statisticsLabel: {
    fontSize: 16,
    color: "black",
    fontWeight: "bold",
  },
  lastOrderLayer: {
    zIndex: 1,
    backgroundColor: "rgba(105, 105, 105, 0.6)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "108%",
    height: "123%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  listItemAttributeColumn: {
    flex: 0.6,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    borderRightWidth: 1,
    borderRightColor: "black",
  },
  listItemIconsColumn: {
    flex: 0.4,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  listItemOrderNumberRow: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  listItemCornerAttribute: {
    fontSize: 16,
    color: "black",
  },
  listItemIconRow: {
    flex: 0.6,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  listItemIcon: {
    marginRight: 10,
  },
  listItemTimestampRow: {
    flex: 0.2,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export const statisticsValueStyle = (paddingLeft) =>
  StyleSheet.create({
    style: {
      fontSize: 16,
      color: "black",
      paddingLeft: paddingLeft,
    },
  });

export const topBarIconStyle = (margin) =>
  StyleSheet.create({
    style: {
      margin: margin,
    },
  });

export const listItemAttributeTextStyle = (marginLeft) =>
  StyleSheet.create({
    style: {
      fontSize: 14,
      color: "black",
      marginLeft: marginLeft,
    },
  });
