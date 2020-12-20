import React, {Component} from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

import {http} from '../../../Global.js'
import {globalStyles} from '../../../GlobalStyles.js'
import {ClientOrderItem} from "./ClientOrderItem";
import {logout, TopBar} from "../../../Global";
import {iconColor, iconSize, topBarIconStyle} from "../../../GlobalStyles";


export default class ClientOrderPage extends Component {

  state = {
    items: [],
    maxOrders: 20,
    waiting: 0,
    done: 0,
    cancelled: 0,
    lastOrderPresent: false,
    lastOrder: null,
    lastOrderExecuted: false
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
          <View style={{ flex: 0.9}}>
            <FlatList
                data={this.state.items}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
            />
          </View>
        </SafeAreaView>
    )
  }

}
