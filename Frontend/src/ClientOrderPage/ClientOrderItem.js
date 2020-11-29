import { Text, View } from "react-native";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ClientOrderPageStyles";
import { listStyles } from "../../ListStyles";
import { CURRENCY } from "../../Global";
import React from "react";

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


export const ClientOrderItem = ({ item }) => (
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