import React, { Component } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { http, TopBar } from "../../Global";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles, iconColor, iconSize, topBarIconStyle } from "../../GlobalStyles";
import { bartStyles } from "../Bartender/BartenderProductManagement/BartenderManagementPageStyles.js";
import { ownerStyles } from "./OwnerProductListStyles"

const Button = ({text, onPress}) =>
  (
    <TouchableOpacity style={ownerStyles.button}>
      <Text style={ownerStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
  )


const Item = ({item}) =>
  (<View style={ownerStyles.item}>

      <Text style={ownerStyles.title}>{item.name}</Text>
      <View style={ownerStyles.parameterView}>
        <Text style={ownerStyles.parameter}>Base price:</Text>
        <TextInput style={ownerStyles.input} value={item.basePrice}/>
      </View>
      <View style={ownerStyles.parameterView}>
        <TextInput style={ownerStyles.input} value={item.basePrice}/>
        <Text style={ownerStyles.parameter}>&lt; price range &lt;</Text>
        <TextInput style={ownerStyles.input} value={item.basePrice}/>
      </View>
      <View style={ownerStyles.buttons}>
        <Button text="Statistics"/>
        <Button text="Edit details"/>
      </View>
    </View>
  )

export default class OwnerProductList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      searchText: "",
      products: [],
      sessionEnabled: false,
      prices: {},
    };
  }


  setProducts() {
    http.get("/product/configure/all")
      .then((response) => response.data)
      .then(data => {
        console.log(data);
        return data;
      })
      .then((data) => this.setState({products: data}))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setProducts();
  }

  renderItem = ({item}) => {
    return (
      <Item item={item}/>
    )
  }

  addProduct() {
  }

  render() {
    const topBarIcons = [
      <FontAwesome5
        key={2}
        name="th-list"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => {
        }}
      />,
      <MaterialCommunityIcons
        key={3}
        name="plus"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.addProduct()}
      />,
    ];

    return (
      <View style={globalStyles.mainContainer}>
        <TopBar title={"Configure products"} icons={topBarIcons}/>
        {/*todo to listStyles*/}
        <View style={bartStyles.listBox}>
          <FlatList data={this.state.products} renderItem={this.renderItem} keyExtractor={(item) => item.id}/>
        </View>
      </View>
    )
  }
}
