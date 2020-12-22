import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
  dateSection: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "center",
  },
  dateSectionLabel: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,
  },
  fromDatePickerStyle: {
    width: 130,
    marginTop: 10,
    marginRight: 25,
  },
  toDatePickerStyle: {
    width: 130,
    marginTop: 10,
    marginRight: 5,
  },
  overallStatsValuesBox: {
    flex: 0.1,
    flexDirection: "row",
  },
  overallStatsValueCell: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  overallStatsLabelCell: {
    flex: 0.5,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: "15%",
  },
  overallStatsValues: {
    fontSize: 24,
    color: "black",
  },
  overallStatsLabelsBox: {
    flex: 0.02,
    flexDirection: "row",
  },
  overallStatsLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  tableLabelBox: {
    flex: 0.07,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  tableLabel: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
  },
  columnLabelsBox: {
    flex: 0.05,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  columnLabel: {
    flex: 0.3333,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  columnLabelValue: {
    flex: 0.3333,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  columnLabelText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  columnValueText: {
    fontSize: 16,
    color: "black",
  },
  plotTitleBox: {
    flex: 0.05,
    flexDirection: "row",
  },
  plotTitleText: {
    fontSize: 16,
    color: "black",
  },
  titleBox: {
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
  },
  tableBox: {
    flex: 0.23,
    width: "90%",
  },
  plotBox: {
    flex: 0.38,
    flexDirection: "row",
    backgroundColor: "white",
    width: "90%",
  },
});
