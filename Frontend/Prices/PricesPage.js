import React, {Component, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../GlobalStyles";
import { http } from '../Global'
import {styles} from './PricesPageStyles'


const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.title}> {item.price} </Text>
  </TouchableOpacity>
);

export default class PricesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedId : null,
            products : []
        };
        http.get('/product/list').then(response => response.data).then(data => self.setState({products: data})).catch();
        this.interval = setInterval((
          function (self){
              http.get('/product/list').then(response => response.data).then(data => self.setState({products: data})).catch();
          }
        ), 5000, this);
    }

    renderItem = ({item}) => {
        const backgroundColor = item.id === this.state.selectedId ? "#6e3b6e" : "#f9c2ff";

        return (
          <Item
            item={item}
            onPress={() => this.setState({selectedId: item.id})}
            style={{backgroundColor}}
          />
        );
    };
    render() {
        console.log(this.state)
        return (
          <SafeAreaView style={globalStyles.mainContainer}>
              <FlatList
                data={this.state.products}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                extraData={this.selectedId}
              />
          </SafeAreaView>
        );
    }
}
