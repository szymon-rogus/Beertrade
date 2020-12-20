import React, {Component} from "react";
import {View, Text, TouchableOpacity, Image} from "react-native";
import {Tooltip} from "react-native-elements";
import {Ionicons} from "@expo/vector-icons";
import AntDesign from "react-native-vector-icons/AntDesign";

import {beerPhoto, http, TopBar, CURRENCY, asMoney} from "../../../Global";
import {detailButtonStyleSheet, detailStyles} from "./ProductDetailsPageStyles";
import {globalStyles, iconColor, iconSize, topBarIconStyle} from "../../../GlobalStyles";

const B = (props) => (
    <Text style={{fontWeight: "bold"}}>{props.children}</Text>
);

const ToolTipInfo = (text) => {
  switch (text) {

    case "Type: ":
      return <Text style={{color: 'white'}}>Differentiate beers by factors such as colour, flavour, strength
        etc.</Text>;
    case "IBU: ":
      return <Text style={{color: 'white'}}>IBU Describes bitterness of a beer</Text>;
    case "BLG: ":
      return <Text style={{color: 'white'}}>BLG Describes the amount of sugar in a beer</Text>;
    case "EBC: ":
      return <Text style={{color: 'white'}}>EBC Describes the colour of beer and malt</Text>;
    default:
      return <Text style={{color: 'white'}}>{text}</Text>
  }
}

const Attribute = ({boldText, text, icon, padding, margin}) => (
    <View style={{flexDirection: "row"}}>
      <Tooltip popover={ToolTipInfo(boldText)} width={100} height={100}>
        <Ionicons
            name={icon}
            size={16}
            color="darkblue"
            style={{paddingRight: 5, paddingTop: padding}}
        />
      </Tooltip>
      <Text style={{marginTop: margin}}>
        <B>{boldText}</B>
        {text}
      </Text>
    </View>
);

const ItemDetails = ({product, price, onPress, buttonEnabled, backIcon, topBarIcons}) => (
    <View style={globalStyles.mainContainer}>
      <TopBar title={"Product details"} icons={topBarIcons}/>
      <View style={detailStyles.titleContainer}>
        <Text style={detailStyles.title}>{product.name}</Text>
      </View>
      <View style={detailStyles.infoBlock}>
        <View style={detailStyles.photo}>
          <Image style={detailStyles.beerImage} source={{uri: beerPhoto}}/>
        </View>
        <View style={detailStyles.rightBlock}>
          <Attribute
              boldText="Type: "
              text={product.type}
              icon="ios-information-circle"
              padding={3}
              margin={1}
          />
          <View style={{flexDirection: "row"}}>
            <Text style={{marginTop: 5, marginLeft: 18}}>
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
          <TouchableOpacity
              style={detailButtonStyleSheet(buttonEnabled).orderButton} onPress={onPress}
              disabled={!buttonEnabled}>
            <Text style={detailStyles.buttonText}>
              Order for{"\n"} {asMoney(price)} {CURRENCY}
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
        <Text style={{marginTop: 10}}>
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
      sessionEnabled: false,
    };
  }

  orderProduct(id, price) {
    http.post("/product/order/" + id, {price: price}).catch((err) => console.log(err));
  }

  checkSession() {
    http.get("/session").then((response) => {
      if (response.data === "START") {
        this.setState({
          sessionEnabled: true
        });
      } else {
        this.setState({
          sessionEnabled: false
        });
      }
    });
  }

  setProductDetails() {
    http
        .get("/product/details/" + this.props.route.params.itemId)
        .then((response) => this.setState({product: response.data}))
        .catch((err) => console.log(err));
  }

  setPrice = async () => {
    http.get("/price/" + this.props.route.params.itemId)
        .then((response) => {
          if (response.data.checkStamp === this.state.checkStamp) {
            this.setPrice();
          } else {
            this.setState({
              price: response.data.price,
              checkStamp: response.data.checkStamp,
            });
          }
        })
        .catch((err) => console.log(err));
    ;
  };

  async componentDidMount() {
    await this.setPrice();
    this.setProductDetails();
    this.checkSession();
    this.interval = setInterval(
        function (self) {
          self.setPrice();
        },
        15000,
        this
    );

    this.sessionInterval = setInterval(
        function (self) {
          self.setPrice();
        },
        5000,
        this
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.sessionInterval);
  }

  renderItemDetails = ({backIcon, topBarIcons}) => {
    return (
        <ItemDetails
            product={this.state.product}
            price={this.state.price}
            onPress={() => {
              this.orderProduct(this.props.route.params.itemId, this.state.price);
              alert("Product ordered.");
            }}
            buttonEnabled={this.state.sessionEnabled && this.props.route.params.isTableSet}
            backIcon={backIcon}
            topBarIcons={topBarIcons}
        />
    );
  };

  render() {
    const topBarIcons = [
      <AntDesign
          name="close"
          key={2}
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => {
            this.props.navigation.navigate("productList")
          }}
      />
    ];
    return (
        this.renderItemDetails({topBarIcons})
    );
  }
}
