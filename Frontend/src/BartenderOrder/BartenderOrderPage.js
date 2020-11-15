import React, { Component } from "react";
import { http, TopBar } from "../../Global.js";
import { View, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../../GlobalStyles.js";
import {
  styles,
  statisticsValueStyle,
  topBarIconStyle,
} from "./BartenderOrderPageStyles.js";
import * as Progress from "react-native-progress";
import OrderItem from "./OrderItem.js";

export default class BartenderOrderPage extends Component {
  state = {
    items: [],
    maxOrders: 20,
    waiting: 0,
    done: 0,
    cancelled: 0,
    lastOrderPresent: false,
    lastOrder: null,
    deletedOrders: [],
    lastOrderExecuted: false,
  };

  constructor(props) {
    super(props);
    this.updateItems();
    this.updateStatistics();
  }

  updateItems = async () => {
    http
      .get("/order/waiting")
      .then((response) => {
        var fetchedList = [];
        fetchedList.push(...response.data);
        this.state.deletedOrders.forEach((deletedId) => {
          fetchedList = fetchedList.filter((item) => item.id !== deletedId);
        });
        if (this.state.lastOrderPresent) {
          fetchedList = fetchedList.filter(
            (item) => item.id !== this.state.lastOrder.id
          );
          fetchedList.unshift(this.state.lastOrder);
        }
        this.setState({
          items: fetchedList,
          waiting: this.state.lastOrderPresent
            ? fetchedList.length - 1
            : fetchedList.length,
        });
        if (fetchedList.length > this.state.maxOrders) {
          this.setState({
            maxOrders: fetchedList.length,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  updateStatistics = async () => {
    http.get("/order/bartenderStats").then((response) => {
      this.setState({
        done: response.data.done,
        cancelled: response.data.cancelled,
      });
    });
  };

  sendRequestExecuteItem = (id) => {
    if (!this.state.lastOrderPresent || this.state.lastOrder.id !== id) {
      var itemsToUpdate = this.sendRequestAndPrepareListForUpdate(
        "/order/execute/",
        id
      );
      var actualItems = itemsToUpdate[0];
      var newLastOrder = itemsToUpdate[1];
      var deletedOrders = itemsToUpdate[2];
      this.setState({
        items: actualItems,
        done: this.state.done + 1,
        waiting: this.state.waiting - 1,
        lastOrder: newLastOrder,
        deletedOrders: deletedOrders,
        lastOrderExecuted: true,
      });
    }
  };

  sendRequestCancelItem = (id) => {
    if (!this.state.lastOrderPresent || this.state.lastOrder.id !== id) {
      var itemsToUpdate = this.sendRequestAndPrepareListForUpdate(
        "/order/cancel/",
        id
      );
      var actualItems = itemsToUpdate[0];
      var newLastOrder = itemsToUpdate[1];
      var deletedOrders = itemsToUpdate[2];
      this.setState({
        items: actualItems,
        cancelled: this.state.cancelled + 1,
        waiting: this.state.waiting - 1,
        lastOrder: newLastOrder,
        deletedOrders: deletedOrders,
        lastOrderExecuted: false,
      });
    }
  };

  sendRequestAndPrepareListForUpdate = (path, id) => {
    this.doPost(path, id);
    var actualItems = this.state.items;
    var deletedOrders = this.state.deletedOrders;
    if (this.state.lastOrderPresent) {
      actualItems = actualItems.filter(
        (item) => item.id !== this.state.lastOrder.id
      );
      deletedOrders.push(this.state.lastOrder.id);
    } else {
      this.setState({
        lastOrderPresent: true,
      });
    }
    var newLastOrder = actualItems.filter((item) => item.id == id)[0];
    actualItems = actualItems.filter((item) => item.id !== newLastOrder.id);
    actualItems.unshift(newLastOrder);
    return [actualItems, newLastOrder, deletedOrders];
  };

  restoreItem = (id) => {
    this.doPost("/order/restore/", id);
    if (this.state.lastOrderExecuted) {
      this.setState({
        done: this.state.done - 1,
      });
    } else {
      this.setState({
        cancelled: this.state.cancelled - 1,
      });
    }
    if (this.state.waiting + 1 > this.state.maxOrders) {
      this.setState({
        maxOrders: this.state.maxOrders + 1,
      });
    }
    this.setState({
      lastOrderPresent: false,
      lastOrder: null,
      waiting: this.state.waiting + 1,
    });
  };

  doPost = async (path, id) => {
    http.post(path + id).catch((err) => console.log(err));
  };

  updateInterval = setInterval(async () => {
    this.updateItems();
  }, 5000);

  componentDidMount() {
    try {
      this.updateInterval;
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  renderItem = ({ item }) => {
    var shadowLayerValue =
      this.state.lastOrderPresent && item == this.state.lastOrder ? (
        <View style={styles.lastOrderLayer}>
          <Ionicons
            name="md-refresh"
            size={40}
            color="black"
            onPress={() => this.restoreItem(this.state.lastOrder.id)}
          />
        </View>
      ) : null;
    return (
      <OrderItem
        item={item}
        executeFunc={this.sendRequestExecuteItem}
        cancelFunc={this.sendRequestCancelItem}
        shadowLayer={shadowLayerValue}
      />
    );
  };

  StatisticsView = ({ label, value, paddingLeft }) => (
    <View style={styles.orderStatsInsideBox}>
      <Text style={styles.statisticsLabel}>{label}</Text>
      <Text style={statisticsValueStyle(paddingLeft).style}>{value}</Text>
    </View>
  );

  render() {
    const iconSize = 36;
    const iconColor = "white";
    const topBarIcons = [
      <MaterialIcons
        key={1}
        name="settings"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.props.navigation.navigate("bartenderSettings")}
      />,
      <MaterialCommunityIcons
        key={2}
        name="cup"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.props.navigation.navigate("bartenderManage")}
      />,
      <MaterialIcons
        key={3}
        name="account-circle"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
      />,
    ];
    return (
      <View style={globalStyles.mainContainer}>
        <TopBar title={"Orders"} icons={topBarIcons} />
        <View style={styles.orderListContainer}>
          <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.bartenderStatisticsBox}>
          <Progress.Bar
            progress={this.state.waiting / this.state.maxOrders}
            width={320}
            height={10}
            animated={true}
          />
          <this.StatisticsView
            label={"In queue"}
            value={this.state.waiting}
            paddingLeft={50}
          />
          <this.StatisticsView
            label={"Done"}
            value={this.state.done}
            paddingLeft={75}
          />
          <this.StatisticsView
            label={"Cancelled"}
            value={this.state.cancelled}
            paddingLeft={40}
          />
        </View>
      </View>
    );
  }
}
