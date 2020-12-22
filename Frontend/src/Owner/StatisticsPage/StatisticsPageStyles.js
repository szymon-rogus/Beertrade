import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  titleSection: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: 40,
    color: "black",
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 5,
    marginLeft: 10,
  },
  dateSection: {
    flex: 0.1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  dateSectionLabel: {
    marginTop: 15,
    fontSize: 18,
    color: "black",
    marginRight: 10,
  },
  datePickerStyle: {
    width: "35%",
    marginTop: 10,
    marginRight: "0%",
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
    color: "black",
  },
  plotBox: {
    flex: 0.26,
    width: "100%",
  },
  plotTitle: {
    fontSize: 16, color: "black", fontWeight: "bold"
  }
});
