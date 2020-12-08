import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { bartStyles } from "./BartenderManagementPageStyles.js";
import { listStyles } from "../../../ListStyles.js";

export const ProductListItem = ({ item, actionIcon, photo }) => (
  <View style={listStyles.item}>
    <View style={bartStyles.listItemImageBox}>
      <Image style={bartStyles.listImage} source={{ uri: photo }} />
    </View>
    <View style={bartStyles.listItemAttributeBox}>
      <Text style={bartStyles.listTitle}>{item.name}</Text>
      <Text style={bartStyles.listAttributes}>
        {item.type} {item.alcoholPercentage}%
      </Text>
    </View>
    <View style={bartStyles.listItemIconBox}>{actionIcon}</View>
  </View>
);
