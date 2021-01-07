import React, {Component} from "react";
import {View, Text, FlatList, processColor} from "react-native";
import {MaterialCommunityIcons, AntDesign} from "@expo/vector-icons";
import DatePicker from "react-native-datepicker-yaya";
import moment from "moment";
import {BarChart} from "react-native-charts-wrapper";

import {http, TopBar, logout, asMoney} from "../../../Global.js";
import {styles} from "./MainPageStyles.js";
import {globalStyles, topBarIconStyle} from "../../../GlobalStyles.js";
import { tr } from "../../../text";

const SORT_TYPE_ASC = "ASC";
const SORT_TYPE_DESC = "DESC";
const PRODUCT_NAME_SORT = "PRODUCT_NAME"
const INCOME_SORT = "INCOME"
const SAVED_SORT = "SAVED"

export default class OwnerMainPage extends Component {
  state = {
    fromDate: moment(new Date()).subtract(7, "day").format("YYYY-MM-DD"),
    toDate: moment(new Date()).format("YYYY-MM-DD"),
    overallIncome: 0.0,
    overallAlgorithmIncome: 0.0,
    productsStats: [],
    productIncomeValues: [],
    sortType: SORT_TYPE_ASC,
    sortAttribute: PRODUCT_NAME_SORT
  };

  onFromDateChange = (selectedDate) => {
    this.fetchData(
        moment(selectedDate).format("YYYY-MM-DD"),
        this.state.toDate
    );
  };

  onToDateChange = (selectedDate) => {
    this.fetchData(
        this.state.fromDate,
        moment(selectedDate).format("YYYY-MM-DD")
    );
  };

  fetchData = (fromDate, toDate) => {
    http
        .post(
            "/statistics/all",
            {dateFrom: fromDate, dateTo: toDate},
            {headers: {"Content-Type": "application/json"}}
        )
        .then((response) => {
          this.setState({
            overallIncome: response.data.overallIncome,
            overallAlgorithmIncome: response.data.overallAlgorithmIncome,
            productsStats: response.data.productStats,
            productIncomeValues: response.data.productStats.map(
                (item) => item.productIncome
            ),
            fromDate: fromDate,
            toDate: toDate,
          });
        })
        .catch((err) => console.log(err));
  };

  renderItem = (item) => {
    return (
        <View style={styles.columnLabelsBox}>
          <View style={styles.columnLabel}>
            <Text style={styles.columnValueText}>{item.productName}</Text>
          </View>
          {this.renderColumn(item.productIncome)}
          {this.renderColumn(item.algorithmIncome)}
        </View>
    );
  };

  renderColumn = (value) => {
    return (
        <View style={styles.columnLabelValue}>
          <Text style={styles.columnValueText}>{asMoney(value)} zł</Text>
        </View>
    );
  };

  setSortStateIfPossible = (sortWith, state) => {
    if (sortWith == state) {
      if(this.state.sortAttribute != state || this.state.sortType == SORT_TYPE_DESC) {
        this.setState({
          sortType: SORT_TYPE_ASC,
        })
      } else {
        this.setState({
          sortType: SORT_TYPE_DESC,
        })
      }
      this.setState({
        sortAttribute: state
      });
    }
  }

  sortWith = (sortWith) => {
    this.setSortStateIfPossible(sortWith, INCOME_SORT);
    this.setSortStateIfPossible(sortWith, SAVED_SORT);
    this.setSortStateIfPossible(sortWith, PRODUCT_NAME_SORT);
    this.state.productsStats.sort((a, b) => {
      if (sortWith === PRODUCT_NAME_SORT) {
        return this.state.sortType == SORT_TYPE_DESC
          ? a.productName.toLowerCase() > b.productName.toLowerCase()
          : a.productName.toLowerCase() < b.productName.toLowerCase();
      }
      if (sortWith === INCOME_SORT) {
        return this.state.sortType == SORT_TYPE_DESC
          ? a.productIncome > b.productIncome 
          : a.productIncome < b.productIncome;
      }
      if (sortWith === SAVED_SORT) {
        return this.state.sortType == SORT_TYPE_DESC
          ? a.algorithmIncome > b.algorithmIncome
          : a.algorithmIncome < b.algorithmIncome;
      }
    });
  }

  componentDidMount = () => {
    this.fetchData(this.state.fromDate, this.state.toDate);
  };

  chartConfig = (color) => {
    return {
      color: processColor(color),
      barShadowColor: processColor(color),
      highlightAlpha: 90,
      highlightColor: processColor(color),
    };
  };

  renderDatePicker = (date, onClickFunc) => {
    return (
        <DatePicker
            style={styles.toDatePickerStyle}
            date={date}
            mode="date"
            useNativeDriver={true}
            placeholder="Select date"
            format="YYYY-MM-DD"
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

  renderColumnLabel = (text, sortedByThis, sortWith, toLeft) => {
    let arrow = null;
    if(sortedByThis) {
      arrow = this.state.sortType === SORT_TYPE_ASC ? <AntDesign name="arrowup" style={{marginTop: '2%'}} size={16} color="lightblue" /> : <AntDesign name="arrowdown" size={16} color="lightblue" style={{marginTop: '2%'}} />;
    }
    return toLeft ? (
        <View style={styles.columnLabel}>
          <Text onPress={() => this.sortWith(sortWith)} style={[styles.columnLabelText, {color: sortedByThis ? "lightblue" : "black"}]}>{text}</Text>
          {arrow}
        </View>
    ) : (
        <View style={styles.columnLabelValue}>
          <Text onPress={() => this.sortWith(sortWith)} style={[styles.columnLabelText, {color: sortedByThis ? "lightblue" : "black"}]}>{text}</Text>
          {arrow}
        </View>
    );
  };

  render() {
    const iconSize = 36;
    const iconColor = "white";
    const topBarIcons = [
      <MaterialCommunityIcons
          key={1}
          name="cup"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => this.props.navigation.navigate("ownerProductList")}
      />,
      <MaterialCommunityIcons
          key={2}
          name="logout"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => logout(this)}
      />,
    ];
    let productIncomeValues = this.state.productsStats.map((item) => {
      return {y: item.productIncome};
    });
    let productAlgorithmIncomeValues = this.state.productsStats.map((item) => {
      return {y: item.algorithmIncome};
    });
    let data = {
      dataSets: [
        {
          values: productIncomeValues,
          label: "Product income",
          config: this.chartConfig("blue"),
        },
        {
          values: productAlgorithmIncomeValues,
          label: tr("algorithm_balance"),
          config: this.chartConfig("green"),
        },
      ],
      config: {
        barWidth: 0.425,
        group: {
          fromX: 0,
          groupSpace: 0.05,
          barSpace: 0.05,
        },
      },
    };
    let xValues = this.state.productsStats.map((item) => item.productName);
    let xAxis = {
      valueFormatter: xValues,
      granularityEnabled: true,
      granularity: 1,
      axisMaximum: 20,
      axisMinimum: 0,
      centerAxisLabels: true,
    };

    const legend = {
      enabled: true,
      textSize: 14,
      form: "SQUARE",
      formSize: 14,
      horizontalAlignment: "CENTER",
      yEntrySpace: 1,
      formToTextSpace: 1,
      wordWrapEnabled: false,
      maxSizePercent: 0.5,
    };

    return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Main Page"} icons={topBarIcons}/>
          <View style={styles.dateSection}>
            <Text style={styles.dateSectionLabel}>From:</Text>
            {this.renderDatePicker(this.state.fromDate, this.onFromDateChange)}
            <Text style={styles.dateSectionLabel}>To:</Text>
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
          <View style={styles.tableLabelBox}>
            <Text style={styles.tableLabel}>Income per product</Text>
          </View>
          <View style={styles.titleBox}>
            <View style={styles.columnLabelsBox}>
              {this.renderColumnLabel("Product name", this.state.sortAttribute === PRODUCT_NAME_SORT, PRODUCT_NAME_SORT, true)}
              {this.renderColumnLabel("Income", this.state.sortAttribute === INCOME_SORT, INCOME_SORT, false)}
              {this.renderColumnLabel("Balance", this.state.sortAttribute === SAVED_SORT, SAVED_SORT, false)}
            </View>
          </View>
          <View style={styles.tableBox}>
            <FlatList
                data={this.state.productsStats}
                renderItem={(item) => this.renderItem(item.item)}
                keyExtractor={(item) => item.productId}
            />
          </View>
          <View style={styles.plotTitleBox}>
            <Text style={styles.tableLabel}>{tr("income_and_balance_chart_title")}</Text>
          </View>
          <View style={styles.plotBox}>
            <BarChart
                style={{flex: 1}}
                data={data}
                xAxis={xAxis}
                animation={{durationX: 2000}}
                legend={legend}
                gridBackgroundColor={processColor("#ffffff")}
                visibleRange={{x: {min: 5, max: 5}}}
                drawBarShadow={false}
                drawValueAboveBar={true}
                drawHighlightArrow={true}
            />
          </View>
        </View>
    );
  }
}
