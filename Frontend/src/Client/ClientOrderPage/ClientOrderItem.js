import { Text, View } from "react-native";
import { AntDesign, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { styles } from "./ClientOrderPageStyles";
import { listStyles } from "../../../ListStyles";
import { CURRENCY } from "../../../Global";
import React from "react";

const glass = (<FontAwesome5 name="glass-whiskey" size={20} color="black" />)

function ItemAmount(props) {
  if(props.amount < 6) {
    let beers = [];
    for (let i = 0; i < props.amount; i++) {
      beers.push(<View key={i}>{glass}</View>)
    }
    return (<View style={{flexDirection: "row"}}>{beers}</View>)
  } else {
    return (<View style={{flexDirection: "row"}}>{glass}<Text style={styles.smallText}>x{props.amount}</Text></View>)
  }
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
    <View style={styles.leftSection}>
      <View style={listStyles.attributeView}>
        <Text style={{fontSize: 20, color: 'black'}}>{ item.beerName } </Text>
      </View>
      <ItemAmount amount = {item.amount} />
      <View>
        <Text style={styles.mediumText}>Total: {item.totalPrice.toFixed(2)}{CURRENCY}</Text>
      </View>
    </View>
    <View style={styles.rightSection}>
      <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Text style={styles.smallText}> #{ item.orderViewId }</Text>
      </View>
      <View style={styles.listItemIconRow}>
        <OrderState orderState={item.orderState}/>
      </View>
      <View style={{ flex: 0.2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text style={styles.smallText}>{ item.timeOrdered }</Text>
      </View>
    </View>
  </View>
)
