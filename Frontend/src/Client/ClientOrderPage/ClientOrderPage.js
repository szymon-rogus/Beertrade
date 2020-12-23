import React, {Component} from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";

import {http, EmptyView, logout, TopBar} from '../../../Global'
import {globalStyles, iconColor, iconSize, topBarIconStyle} from '../../../GlobalStyles'
import {ClientOrderItem} from "./ClientOrderItem";
import {clientOrderStyles} from "./ClientOrderPageStyles";

const ALL = "ALL";
const WAITING = "WAITING";
const DONE = "DONE";
const CANCELLED = "CANCELLED";


export default class ClientOrderPage extends Component {

  state = {
    items: [],
    maxOrders: 20,
    waiting: 0,
    done: 0,
    cancelled: 0,
    lastOrderPresent: false,
    lastOrder: null,
    lastOrderExecuted: false,
    chosenItems: ALL,
  }

  constructor(props) {
    super(props);
    this.updateItems()
  }

  updateItems = async () => {
    http.get('/order/myOrders').then((response) => {
      let fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
      }
      this.setState({
        items: fetchedList,
      });
    }).catch(err => console.log(err));
  }

  renderItem = ({item}) => {
    return (
        <ClientOrderItem item={item}/>
    );
  };

  renderEmpty = () => {
    return (
        <EmptyView />
    );
  }


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

  getItems = () => {
    return this.state.items.filter((item) => {
      return item.orderState === this.state.chosenItems || this.state.chosenItems === "ALL"
    })
  }

  render() {
    const topBarIcons = [
      <FontAwesome5
          key={1}
          name="th-list"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => this.props.navigation.navigate("productList")}
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
    return (
        <SafeAreaView style={globalStyles.mainContainer}>
          <TopBar title={"My orders"} icons={topBarIcons}/>
          <View style={clientOrderStyles.listBox}>
            <SwitchSelector
                initial={0}
                onPress={(value) => this.setState({chosenItems: value})}
                textColor="black"
                selectedColor="white"
                buttonColor="black"
                borderColor="black"
                hasPadding
                style={clientOrderStyles.selector}
                options={[
                  {label: ALL, value: ALL},
                  {label: WAITING, value: WAITING},
                  {label: DONE, value: DONE},
                  {label: CANCELLED, value: CANCELLED},
                ]}
            />
            <FlatList
                data={this.getItems()}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={this.renderEmpty()}
            />
          </View>
        </SafeAreaView>
    )
  }

}
