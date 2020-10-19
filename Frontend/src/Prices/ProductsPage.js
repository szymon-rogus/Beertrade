import React, {Component, useState} from 'react';
import {FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {globalStyles} from "../../GlobalStyles";
import {http} from '../../Global'
import {styles} from './ProductsPageStyles'


const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.name}</Text>
    <Text style={styles.title}> {item.price} </Text>
  </TouchableOpacity>
);

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      products: []
    };

  }

  orderProduct(id) {
    http.post('/product/order/' + id).catch(err => console.log(err));
  }

  renderItem = ({item}) => {
    const backgroundColor = item.id === this.state.selectedId ? "#6e3b6e" : "#f9c2ff";

    return (
      <Item
        item={item}
        onPress={() => {
          this.setState({selectedId: item.id})
          this.orderProduct(item.id)
          alert("Product ordered.")
        }}
        style={{backgroundColor}}
      />
    );
  };

  setProducts(context) {
    http.get('/product/list').then(response => response.data).then(data => context.setState({products: data}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.setProducts(this)
    this.interval = setInterval((
      function (self) {
        self.setProducts(self)
      }
    ), 5000, this);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
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
