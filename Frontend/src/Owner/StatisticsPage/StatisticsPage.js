import React, { Component } from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker-yaya";
import moment from "moment";
import { LineChart } from "react-native-charts-wrapper";

import { http, TopBar, logout, asMoney } from "../../../Global.js";
import { styles } from "./StatisticsPageStyles.js";
import { globalStyles } from "../../../GlobalStyles.js";

const YEAR_MONTH_DAY_FORMAT = "YYYY-MM-DD";
const DATE_WITH_HOUR_FORMAT = "MM/dd/YYYY HH:mm:ss";
const HOUR_FORMAT = "HH:mm";

export default class StatisticsPage extends Component {
  state = {
    date: moment(new Date()).format(YEAR_MONTH_DAY_FORMAT),
    overallIncome: 0.0,
    overallAlgorithmIncome: 0.0,
    pricesAndTime: [],
    demandAndTime: [],
    fetchedData: false,
  };

  onDateChange = (selectedDate) => {
    this.fetchData(moment(selectedDate).format(YEAR_MONTH_DAY_FORMAT));
  };

  fetchData = (date) => {
    http
      .post(
        "/statistics/product/" + this.props.route.params.productId,
        { date: date },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        this.setState({
          overallIncome: response.data.productFinancialStats.productIncome,
          overallAlgorithmIncome:
            response.data.productFinancialStats.algorithmIncome,
          pricesAndTime: response.data.archivedPriceInfoList,
          demandAndTime: response.data.archivedDemandInfoList,
          date: date,
          fetchedData: true,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchData(this.state.date);
  };

  renderDatePicker = (date, onClickFunc) => {
    return (
      <DatePicker
        style={styles.datePickerStyle}
        date={date}
        mode="date"
        useNativeDriver={true}
        placeholder="Select date"
        format={YEAR_MONTH_DAY_FORMAT}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: "absolute",
            left: 0,
            top: 4,
            marginLeft: 0,
          },
        }}
        onDateChange={(date) => onClickFunc(date)}
      />
    );
  };

  renderOverallStatsValues = (value) => {
    return (
      <View style={styles.overallStatsValueCell}>
        <Text style={styles.overallStatsValues}>{asMoney(value)} zł</Text>
      </View>
    );
  };

  renderOverallStatsLabels = (text) => {
    return (
      <View style={styles.overallStatsLabelCell}>
        <Text style={styles.overallStatsLabel}>{text}</Text>
      </View>
    );
  };

  render() {
    const backIcon = [
      <Ionicons
        key={1}
        name="md-arrow-round-back"
        size={36}
        color="white"
        style={{ marginLeft: 20 }}
        onPress={() => this.props.navigation.navigate("ownerProductList")}
      />,
    ];
    const topBarIcons = [
      <MaterialCommunityIcons
        key={1}
        name="logout"
        size={36}
        color={"white"}
        style={{ marginRight: 20 }}
        onPress={() => logout(this)}
      />,
    ];

    let demandData = {
      dataSets: [
        {
          values: this.state.demandAndTime.map((item) => {
            return {
              x:
                moment(item.time, DATE_WITH_HOUR_FORMAT).hours() +
                moment(item.time, DATE_WITH_HOUR_FORMAT).minutes() / 60,
              y: item.demandValue,
            };
          }),
          label: "Demand",
        },
      ],
    };
    let pricesData = {};
    if (this.state.fetchedData) {
      pricesData = {
        dataSets: [
          {
            values: this.state.pricesAndTime.map((item) => {
              return {
                x:
                  moment(item.time, DATE_WITH_HOUR_FORMAT).hours() +
                  moment(item.time, DATE_WITH_HOUR_FORMAT).minutes() / 60,
                y: item.priceValue,
              };
            }),
            label: "Prices",
          },
        ],
      };
    }

    const marker = {
      enabled: true,
      markerColor: 4,
    };

    const xAxis = {
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      valueFormatter: "date",
      valueFormatterPattern: HOUR_FORMAT,
      timeUnit: "HOURS",
    };
    if (this.state.fetchedData) {
      return (
        <View style={globalStyles.mainContainer}>
          <TopBar backIcon={backIcon} icons={topBarIcons} />
          <View style={styles.dateSection}>
            <Text style={[styles.title, { marginRight: "70%" }]}>
              {this.props.route.params.productName}
            </Text>
          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateSectionLabel}>Date:</Text>
            {this.renderDatePicker(this.state.date, this.onDateChange)}
          </View>
          <View style={styles.overallStatsValuesBox}>
            {this.renderOverallStatsValues(this.state.overallIncome)}
            {this.renderOverallStatsValues(this.state.overallAlgorithmIncome)}
          </View>
          <View style={styles.overallStatsLabelsBox}>
            {this.renderOverallStatsLabels("Total income")}
            {this.renderOverallStatsLabels("Algorithm bonus")}
          </View>
          <View style={{ flex: 0.03 }}>
            <Text style={{ fontSize: 16, color: "black" }}>
              Demand changes in time
            </Text>
          </View>
          <View style={styles.plotBox}>
            <LineChart
              style={{ flex: 1, width: "100%" }}
              data={demandData}
              chartDescription={{ text: "Demand" }}
              xAxis={xAxis}
              drawGridBackground={false}
              borderWidth={1}
              drawBorders={false}
              marker={marker}
              width={400}
              autoScaleMinMaxEnabled={false}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              scaleXEnabled={true}
              scaleYEnabled={true}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              drawValues={false}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              ref="chart"
              keepPositionOnRotation={false}
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
          <View style={{ flex: 0.03 }}>
            <Text style={{ fontSize: 16, color: "black" }}>
              Price changes in time
            </Text>
          </View>
          <View style={styles.plotBox}>
            <LineChart
              style={{ flex: 1, width: "100%" }}
              data={pricesData}
              chartDescription={{ text: "Prices" }}
              xAxis={xAxis}
              drawGridBackground={false}
              borderWidth={1}
              drawBorders={false}
              marker={marker}
              width={400}
              autoScaleMinMaxEnabled={false}
              touchEnabled={true}
              dragEnabled={true}
              scaleEnabled={true}
              drawValues={false}
              scaleXEnabled={true}
              scaleYEnabled={true}
              pinchZoom={true}
              doubleTapToZoomEnabled={true}
              highlightPerTapEnabled={true}
              highlightPerDragEnabled={false}
              dragDecelerationEnabled={true}
              dragDecelerationFrictionCoef={0.99}
              ref="chart"
              keepPositionOnRotation={false}
              onChange={(event) => console.log(event.nativeEvent)}
            />
          </View>
        </View>
      );
    } else {
      return (
        <View style={globalStyles.mainContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  }
}
