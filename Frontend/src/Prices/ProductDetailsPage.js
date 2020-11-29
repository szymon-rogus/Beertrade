import React, { Component } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { beerPhoto, http, TopBar, logout } from "../../Global";
import { detailStyles } from "./ProductDetailsPageStyles";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const Attribute = ({ boldText, text, icon, padding, margin }) => (
  <View style={{ flexDirection: "row" }}>
    <Ionicons
      name={icon}
      size={16}
      color="darkblue"
      style={{ paddingRight: 5, paddingTop: padding }}
    />
    <Text style={{ marginTop: margin }}>
      <B>{boldText}</B>
      {text}
    </Text>
  </View>
);

const ItemDetails = ({ product, onPress, backIcon, topBarIcons, price }) => (
  <View style={detailStyles.container}>
    <TopBar backIcon={backIcon} icons={topBarIcons} />
    <View style={detailStyles.titleContainer}>
      <Text style={detailStyles.title}>{product.name}</Text>
    </View>
    <View style={detailStyles.infoBlock}>
      <View style={detailStyles.photo}>
        <Image style={detailStyles.beerImage} source={{ uri: beerPhoto }} />
      </View>
      <View style={detailStyles.rightBlock}>
        <Attribute
          boldText="Type: "
          text={product.type}
          icon="ios-information-circle"
          padding={3}
          margin={1}
        />
        <View style={{ flexDirection: "row" }}>
          <Text style={{ marginTop: 5, marginLeft: 18 }}>
            <B>Alcohol: </B> {product.alcoholPercentage}%
          </Text>
        </View>
        <Attribute
          boldText="IBU: "
          text={product.ibu}
          icon="ios-information-circle"
          padding={6}
          margin={5}
        />
        <Attribute
          boldText="BLG: "
          text={product.blg}
          icon="ios-information-circle"
          padding={6}
          margin={5}
        />
        <Attribute
          boldText="EBC: "
          text={product.ebc}
          icon="ios-information-circle"
          padding={6}
          margin={5}
        />
        <TouchableOpacity style={detailStyles.orderButton} onPress={onPress}>
          <Text style={detailStyles.buttonText}>
            Order for{"\n"}
            {price} PLN
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={detailStyles.leftBlock}>
      <Text>
        <B>Origin country: </B> {product.origin}
      </Text>
      <Text>
        <B>Brewery: </B> {product.brewery}
      </Text>
      <Text>
        <B>Creation year: </B> {product.year}
      </Text>
      <Text style={{ marginTop: 10 }}>
        <B>Description:</B>
      </Text>
      <Text>{product.description}</Text>
    </View>
  </View>
);

export default class ProductDetailsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      price: null,
      checkStamp: null,
    };
  }

  orderProduct(id) {
    http.post("/product/order/" + id).catch((err) => console.log(err));
  }

  setProductDetails() {
    http
      .get("/product/" + this.props.route.params.itemId)
      .then((response) => this.setState({ product: response.data }))
      .catch((err) => console.log(err));
  }

  setPrice = async () => {
    http.get("/price/" + this.props.route.params.itemId).then((response) => {
      if (response.data.checkStamp == this.state.checkStamp) {
        this.setPrice();
      } else {
        this.setState({
          price: response.data.price,
          checkStamp: response.data.checkStamp,
        });
      }
    });
  };

  componentDidMount() {
    this.setPrice();
    this.setProductDetails();
    this.interval = setInterval(
      function (self) {
        self.setPrice();
      },
      15000,
      this
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const backIcon = [
      <Ionicons
        key={1}
        name="md-arrow-round-back"
        size={36}
        color="white"
        style={{ marginLeft: 20 }}
        onPress={() => this.props.navigation.navigate("productList")}
      />,
    ];
    const topBarIcons = [
      <MaterialCommunityIcons
        key={1}
        name="logout"
        size={36}
        color={"white"}
        style={{ marginRight: 20 }}
        onPress={() => logout(this)}
      />,
    ];
    return (
      <ItemDetails
        product={this.state.product}
        price={this.state.price}
        onPress={() => {
          this.orderProduct(this.props.route.params.itemId);
          alert("Product ordered.");
        }}
        backIcon={backIcon}
        topBarIcons={topBarIcons}
      />
    );
  }
}
