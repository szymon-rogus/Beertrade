import React, { Component } from "react";
import { FlatList, View } from "react-native";
import { http } from "../../Global";

export default class OwnerProductList extends Component{

  setProducts(){
    http.get("/product/configure/all")
      .then((response) => response.data)
      .then(data => {console.log(data); return data;})
      .then((data) => this.setState({ products: data }))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setProducts();
  }

  render(){
    return (
      <View>

      </View>
    )
  }
}
