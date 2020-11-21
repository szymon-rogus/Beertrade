import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image} from "react-native";
import {beerPhoto, http, TopBar} from "../../Global";
import { detailStyles } from "./ProductDetailsPageStyles";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";

const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

const ItemDetails = ({product, onPress, backIcon, topBarIcons}) => (
    <View style={detailStyles.container}>
      <TopBar backIcon={backIcon} icons={topBarIcons}/>
      <View style={detailStyles.titleContainer}>
        <Text style={detailStyles.title}>{product.name}</Text>
      </View>
      <View style={detailStyles.infoBlock}>
        <View style={detailStyles.photo}>
          <Image style={detailStyles.beerImage} source={{uri: beerPhoto}} />
        </View>
        <View style={detailStyles.rightBlock}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="ios-information-circle" size={16} color="darkblue" style={{paddingRight: 5, paddingTop: 3}}/>
            <Text><B>Type: </B> {product.type}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 5, marginLeft: 18}}><B>Alcohol: </B> {product.alcoholPercentage}%</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="ios-information-circle" size={16} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
            <Text style={{marginTop: 5}}><B>IBU: </B> {product.ibu}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="ios-information-circle" size={16} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
            <Text style={{marginTop: 5}}><B>BLG: </B> {product.blg}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="ios-information-circle" size={16} color="darkblue" style={{paddingRight: 5, paddingTop: 6}}/>
            <Text style={{marginTop: 5}}><B>EBC: </B> {product.ebc}</Text>
          </View>
          <TouchableOpacity style={detailStyles.orderButton} onPress={onPress}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: "bold"}}>Order for{"\n"}{product.price} PLN</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={detailStyles.leftBlock}>
        <Text><B>Origin country: </B> {product.origin}</Text>
        <Text><B>Brewery: </B> {product.brewery}</Text>
        <Text><B>Creation year: </B> {product.year}</Text>
        <Text style={{marginTop: 10}}><B>Description:</B></Text>
        <Text>{product.description}</Text>
      </View>
    </View>
);

export default class ProductDetailsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

  orderProduct(id) {
    http.post('/product/order/' + id)
        .catch(err => console.log(err));
  }

  setProductDetails(context) {
    http.get('/product/' + context.props.route.params.itemId)
        .then(response => response.data)
        .then(data => context.setState({product: data}))
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
    const backIcon = [
      <Ionicons
          key={1}
          name="md-arrow-round-back"
          size={36}
          color="white"
          style={{marginLeft: 20}}
          onPress = {() => this.props.navigation.navigate('productList')}
      />
    ];
    const topBarIcons = [
      <MaterialIcons
          key={1}
          name="account-circle"
          size={36}
          color={"white"}
          style={{marginRight: 20}}
      />,
    ];
    return (
        <ItemDetails
            product={product}
            onPress={() => {
              this.orderProduct(this.props.route.params.itemId)
              alert("Product ordered.")}}
            backIcon={backIcon}
            topBarIcons={topBarIcons}
        />
        );
  }
}
