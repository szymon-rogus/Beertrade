import React, { Component }  from 'react';
import { http } from '../../Global.js'
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { globalStyles } from '../../GlobalStyles.js'
import { styles } from './BartenderOrderPageStyles.js'
 
const OrderItem = ({ item, onPressFunc }) => (
  <TouchableOpacity onPress={ () => onPressFunc(item.id) } style={ styles.item }>
    <Text style={ styles.itemText }>Name: { item.name }</Text>
    <Text style={ styles.itemText }>User: { item.userLogin }</Text>
  </TouchableOpacity>
)

export default class BartenderOrderPage extends Component {
    
  state = {
    items: []
  }

  constructor(props) {
    super(props);
    this.updateItems();
  }

  updateItems = async () => {
    http.get('/product/orders').then((response) => {
      fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
    }
    this.setState({
      items: fetchedList
    });
    }).catch(err => console.log(err));
  }

  sendRequestDeleteItem = (id) => {
    actualItems = this.state.items;
    modifiedList = actualItems.filter(item => item.id !== id);
    this.setState({ items: modifiedList });
    http.delete('/order/' + id).catch((err) => {
      console.loeg(err);
    });
  }

  renderItem = ({item}) => {
    return (
      <OrderItem item={ item } onPressFunc = { this.sendRequestDeleteItem }/>
    );
  };

  updateInterval = setInterval(async () => {
    this.updateItems();
  }, 5000)

  componentDidMount() {
    try {
      this.updateInterval;
    } catch(e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    return (
      <View style={ globalStyles.mainContainer }>
        <Text style={ globalStyles.title }>Order List</Text>
        <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
        />
      </View>
    )
  }

}