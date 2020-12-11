import React from "react";
import {View, Text} from "react-native";
import {AntDesign} from "@expo/vector-icons";

import {listItemAttributeTextStyle} from "../../../GlobalStyles.js";
import {listStyles} from "../../../ListStyles.js";
import {styles} from "./BartenderOrderPageStyles.js";

const orderItemIconSize = 40;
const orderItemIconColor = "black";

export const OrderItem = ({item, executeFunc, cancelFunc, shadowLayer}) => (
    <View style={listStyles.item}>
      {shadowLayer}
      <View style={styles.listItemAttributeColumn}>
        <ItemAttribute label={"Name:"} value={item.beerName} marginLeft={40}/>
        <ItemAttribute label={"Amount:"} value={item.amount} marginLeft={27}/>
        <ItemAttribute
            label={"Table:"}
            value={item.tableNumber}
            marginLeft={42}
        />
        <ItemAttribute label={"User:"} value={item.userLogin} marginLeft={48}/>
      </View>
      <View style={styles.listItemIconsColumn}>
        <View style={styles.listItemOrderNumberRow}>
          <Text style={styles.listItemStamp}>#{item.orderViewId}</Text>
        </View>
        <View style={styles.listItemIconRow}>
          <AntDesign
              name="check"
              size={orderItemIconSize}
              color={orderItemIconColor}
              style={styles.listItemIcon}
              onPress={() => executeFunc(item.id)}
          />
          <AntDesign
              name="close"
              size={orderItemIconSize}
              color={orderItemIconColor}
              style={styles.listItemIcon}
              onPress={() => cancelFunc(item.id)}
          />
        </View>
        <View style={styles.listItemTimestampRow}>
          <Text style={styles.listItemStamp}>{item.timeOrdered}</Text>
        </View>
      </View>
    </View>
);

const ItemAttribute = ({label, value, marginLeft}) => (
    <View style={listStyles.attributeView}>
      <Text style={listStyles.itemLabelText}>{label}</Text>
      <Text style={listItemAttributeTextStyle(marginLeft).style}>{value}</Text>
    </View>
);
