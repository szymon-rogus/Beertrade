import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from "react-native";
import {http} from "../../Global";
import { detailStyles } from "./ProductDetailsPageStyles";
import {globalStyles} from "../../GlobalStyles";
import {Ionicons} from "@expo/vector-icons";
import {styles} from "./ProductsPageStyles";

export default class ProductDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  orderProduct(id) {
    http.post('/product/order/' + id).catch(err => console.log(err));
  }

  setProductDetails(context) {
    http.get('/product/' + context.props.route.params.itemId).then(response => response.data).then(data => context.setState({product: data}))
        .catch(err => console.log(err));
  }

  componentDidMount() {
    this.setProductDetails(this)
    this.interval = setInterval((
        function (self) {
          self.setProductDetails(self)
        }
    ), 5000, this);
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  render() {
    const {product} = this.state
    return (
        <View style={detailStyles.container}>
          <View style={detailStyles.titleContainer}>
            <Text style={detailStyles.title}>{product.name}</Text>
          </View>
          <View style={detailStyles.infoBlock}>
            <View style={detailStyles.photo}>

            </View>
            <View style={detailStyles.rightBlock}>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-information-circle" size={14} color="darkblue" style={{paddingRight: 5, paddingTop: 3}}/>
                <Text>Type: {product.type}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{marginTop: 5}}>Alcohol: {product.alcoholPercentage}%</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-information-circle" size={14} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
                <Text style={{marginTop: 5}}>IBU: {product.ibu}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-information-circle" size={14} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
                <Text style={{marginTop: 5}}>BLG: {product.blg}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Ionicons name="ios-information-circle" size={14} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
                <Text style={{marginTop: 5}}>EBC: {product.ebc}</Text>
              </View>
              <TouchableOpacity style={detailStyles.orderButton} onPress={() => {
                this.orderProduct(product.id)
                alert("Product ordered.")}}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: "bold"}}>Order for{"\n"}{product.price} PLN</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={detailStyles.leftBlock}>
            <Text>{product.origin}</Text>
            <Text>{product.brewery}</Text>
            <Text>{product.year}</Text>
            <Text>{product.description}</Text>
          </View>
        </View>
        );
  }
}
