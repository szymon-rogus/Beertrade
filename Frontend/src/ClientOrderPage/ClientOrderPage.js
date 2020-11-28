import React, { Component } from 'react';
import { http } from '../../Global.js'
import { FlatList, SafeAreaView, Text, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../../GlobalStyles.js'
import { styles } from './ClientOrderPageStyles.js'
import { listStyles } from "../../ListStyles";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { CURRENCY } from "../../Global";


function ItemAmount(props) {
  let beers = [];
  for (let i = 0; i < props.amount; i++){
    beers.push(<View><FontAwesome5 name="glass-whiskey" size={20} color="black" /></View>)
  }
  if(props.amount < 6)
    return (<View style = {{flexDirection: "row"}}>{beers}</View>)
  else
    return (<View style = {{flexDirection: "row"}}><FontAwesome5 name="glass-whiskey" size={20} color="black" /><Text style={{fontSize: 16, color: 'black'}}>x{props.amount}</Text></View>)
}

function OrderState(props) {
  const orderState = props.orderState;
  const iconSize = 30;
  if (orderState === "WAITING")
    return <MaterialIcons name="hourglass-full" size={iconSize} color="black" />
  else if (orderState === "DONE")
    return <AntDesign name="checkcircle" size={iconSize} color="black" />
  else if (orderState === "CANCELLED")
    return <MaterialIcons name="cancel" size={iconSize} color="black" />

}


const OrderItem = ({ item }) => (
  <View style={ styles.item }>
    <View style={{
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',

    }}>
    <View style={listStyles.attributeView}>
      <Text style={{fontSize: 20, color: 'black'}}>{ item.beerName } </Text>
    </View>
    <ItemAmount amount = {item.amount} />
    <View><Text style={{fontSize: 18, color: 'black'}}>Total: {item.totalPrice.toFixed(2)}{CURRENCY}</Text></View>
  </View>
  <View style={{
    flex: 0.4,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end'
  }}>
    <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
      <Text style={{fontSize: 16, color: 'black'}}> #{ item.orderViewId }</Text>
    </View>
    <View style={styles.listItemIconRow}>
      <OrderState orderState={item.orderState}/>
    </View>
    <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text style={{fontSize: 16, color: 'black'}}>{ item.timeOrdered }</Text>
    </View>
  </View>
</View>
)

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
    this.updateItems();
  }

  updateItems = async () => {
    http.get('/order/myOrders').then((response) => {
      let fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
    }
    this.setState({
      items: fetchedList,
      waiting: fetchedList.length
    });
    if (fetchedList.length > this.state.maxOrders) {
      this.setState({
        maxOrders: fetchedList.length
      });
    }
    }).catch(err => console.log(err));
  }

  renderItem = ({item}) => {

    return (
      <OrderItem item={ item }/>
    );
  };

  updateInterval = setInterval(async () => {
    this.updateItems();
  }, 5000)

  componentDidMount() {

  }

  componentWillUnmount() {
  }

  render() {
    return (
      <SafeAreaView style={ globalStyles.mainContainer }>

        <FlatList
            data={this.state.items}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    )
  }

}