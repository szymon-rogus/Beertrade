import React, { Component } from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./BartenderManagementPageStyles.js";
import { listStyles } from "../../ListStyles.js";

export const ProductListItem = ({ item, actionIcon, photo }) => (
  <View style={listStyles.item}>
    <View style={styles.listItemImageBox}>
      <Image style={styles.listImage} source={{ uri: photo }} />
    </View>
    <View style={styles.listItemAttributeBox}>
      <Text style={styles.listTitle}>{item.name}</Text>
      <Text style={styles.listAttributes}>
        {item.type} {item.alcoholPercentage}%
      </Text>
    </View>
    <View style={styles.listItemIconBox}>{actionIcon}</View>
  </View>
);
