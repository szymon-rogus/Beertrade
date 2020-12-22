import React, { Component } from "react";
import { View, Text, processColor } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DatePicker from "react-native-datepicker-yaya";
import moment from "moment";
import { LineChart } from "react-native-charts-wrapper";
import AntDesign from "react-native-vector-icons/AntDesign";

import { http, TopBar, asMoney } from "../../../Global.js";
import { styles } from "./StatisticsPageStyles.js";
import { globalStyles } from "../../../GlobalStyles.js";
import { tr } from "../../../text";
import {iconColor, iconSize, topBarIconStyle} from "../../../GlobalStyles";

const YEAR_MONTH_DAY_FORMAT = "YYYY-MM-DD";
const DATE_WITH_HOUR_FORMAT = "MM/dd/YYYY HH:mm:ss";
const HOUR_FORMAT = "HH:mm";
const DATE_WITH_HOUR_FORMAT_2 = "MM/DD/YYYY HH:mm:ss";
const MONTH_DAY_HOUR_FORMAT = "MM/dd HH:mm"

export default class StatisticsPage extends Component {
  state = {
    fromDate: moment(new Date()).format(YEAR_MONTH_DAY_FORMAT),
    toDate: moment(new Date()).format(YEAR_MONTH_DAY_FORMAT),
    overallIncome: 0.0,
    overallAlgorithmIncome: 0.0,
    pricesAndTime: [],
    demandAndTime: [],
    fetchedData: false,
    sameDay: true
  };

  onFromDateChange = (selectedDate) => {
    this.fetchData(
        moment(selectedDate).format(YEAR_MONTH_DAY_FORMAT),
        this.state.toDate
    );
  };

  onToDateChange = (selectedDate) => {
    this.fetchData(
        this.state.fromDate,
        moment(selectedDate).format(YEAR_MONTH_DAY_FORMAT)
    );
  };

  fetchData = (fromDate, toDate) => {
    http
      .post(
        "/statistics/product/" + this.props.route.params.productId,
        {dateFrom: fromDate, dateTo: toDate},
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => {
        this.setState({
          overallIncome: response.data.productFinancialStats.productIncome,
          overallAlgorithmIncome:
            response.data.productFinancialStats.algorithmIncome,
          pricesAndTime: response.data.archivedPriceInfoList,
          demandAndTime: response.data.archivedDemandInfoList,
          fromDate: fromDate,
          toDate: toDate,
          sameDay: fromDate == toDate,
          fetchedData: true,
        });
      })
      .catch((err) => console.log(err));
  };

  componentDidMount = () => {
    this.fetchData(this.state.fromDate, this.state.toDate);
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

  getXAxisTimeValue = (item) => {
    return this.state.sameDay ? moment(item.time, DATE_WITH_HOUR_FORMAT).hours() +
      moment(item.time, DATE_WITH_HOUR_FORMAT).minutes() / 60 : moment(item.time, DATE_WITH_HOUR_FORMAT_2).valueOf();
  }

  render() {
    const topBarIcons = [
      <AntDesign
          name="close"
          key={2}
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => {
            this.props.navigation.navigate("ownerProductList")
          }}
      />
    ];

    let demandData = {
      dataSets: [
        {
          values: this.state.demandAndTime.map((item) => {
            return {
              x:
                this.getXAxisTimeValue(item),
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
                this.getXAxisTimeValue(item),
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
    };

    const xAxis = {
      granularityEnabled: true,
      granularity: 1,
      position: "BOTTOM",
      valueFormatter: "date",
      valueFormatterPattern: this.state.sameDay ? HOUR_FORMAT : MONTH_DAY_HOUR_FORMAT,
      timeUnit: this.state.sameDay ? "HOURS" : "MILLISECONDS",
    };
    if (this.state.fetchedData) {
      return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Detailed statistics"} icons={topBarIcons} />
          <View style={[styles.titleSection]}>
            <Text style={[styles.title]}>
              {this.props.route.params.productName}
            </Text>

          </View>
          <View style={styles.dateSection}>
            <Text style={styles.dateSectionLabel}>From:</Text>
            {this.renderDatePicker(this.state.fromDate, this.onFromDateChange)}
            <Text style={[styles.dateSectionLabel, {marginLeft: 10}]}>To:</Text>
            {this.renderDatePicker(this.state.toDate, this.onToDateChange)}
          </View>
          <View style={styles.overallStatsValuesBox}>
            {this.renderOverallStatsValues(this.state.overallIncome)}
            {this.renderOverallStatsValues(this.state.overallAlgorithmIncome)}
          </View>
          <View style={styles.overallStatsLabelsBox}>
            {this.renderOverallStatsLabels("Total income")}
            {this.renderOverallStatsLabels(tr("algorithm_balance"))}
          </View>
          <View style={{ flex: 0.03 }}>
            <Text style={styles.plotTitle}>
              Demand changes in time
            </Text>
          </View>
          <View style={styles.plotBox}>
            <LineChart
              style={{ flex: 1}}
              data={demandData}
              chartDescription={{ text: "Demand" }}
              xAxis={xAxis}
              drawGridBackground={false}
              borderWidth={1}
              drawBorders={false}
              marker={marker}
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
            <Text style={styles.plotTitle}>
              Price changes in time
            </Text>
          </View>
          <View style={styles.plotBox}>
            <LineChart
              style={{ flex: 1 }}
              data={pricesData}
              chartDescription={{ text: "Prices" }}
              xAxis={xAxis}
              drawGridBackground={false}
              borderWidth={1}
              drawBorders={false}
              marker={marker}
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
