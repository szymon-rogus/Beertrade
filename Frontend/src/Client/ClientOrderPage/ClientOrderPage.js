import React, { Component } from 'react';
import { http } from '../../../Global.js'
import { FlatList, SafeAreaView } from "react-native";
import { globalStyles } from '../../../GlobalStyles.js'
import { ClientOrderItem } from "./ClientOrderItem";


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
    return (
      <SafeAreaView style={globalStyles.mainContainer}>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }

}
