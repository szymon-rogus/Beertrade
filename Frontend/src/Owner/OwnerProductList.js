import React, {Component} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {AntDesign, MaterialCommunityIcons} from "@expo/vector-icons";

import {asMoney, asMoneyString, CURRENCY, http, TopBar} from "../../Global";
import {globalStyles, iconColor, iconSize, topBarIconStyle} from "../../GlobalStyles";
import {bartStyles} from "../Bartender/BartenderProductManagement/BartenderManagementPageStyles";
import {ownerStyles} from "./OwnerProductListStyles"
import {getSession} from "../Services/SessionService";
import {changesSaver} from "./SaveChangesComponent/SaveChangesComponentStyles";
import {getProductsConfiguration} from "../Services/ProductService";

const Button = ({text, onPressButton, item}) => (
    <TouchableOpacity style={ownerStyles.button} onPress={() => onPressButton(item)}>
      <Text style={ownerStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
)

const MyTextInput = ({ varName, initValue, onVarChange, id, editable }) => (
  <TextInput
    style={ownerStyles.input}
    onChangeText={(varValue) => onVarChange(id, varValue, varName)}
    defaultValue={asMoneyString(initValue)}
    keyboardType="decimal-pad"
    editable={editable}
  />
);


const Item = ({item, onVarChange, sessionEnabled, editProduct, openStatistics}) => (
    <View style={ownerStyles.item}>
      <Text style={ownerStyles.title}>{item.name}</Text>
      <View style={ownerStyles.parameterView}>
        <Text style={ownerStyles.parameter}>Base price:</Text>
        <MyTextInput varName="basePrice" initValue={asMoney(item.basePrice)} onVarChange={onVarChange} id={item.id}
                     editable={!sessionEnabled}/>
      </View>
      <View style={ownerStyles.parameterView}>
        <MyTextInput varName="minPrice" initValue={asMoney(item.minPrice)} onVarChange={onVarChange} id={item.id}
                     editable={!sessionEnabled}/>
        <Text style={ownerStyles.parameter}>&lt; price range &lt;</Text>
        <MyTextInput varName="maxPrice" initValue={asMoney(item.maxPrice)} onVarChange={onVarChange} id={item.id}
                     editable={!sessionEnabled}/>
      </View>
      <View style={ownerStyles.buttons}>
        <Button text="Statistics" onPressButton={openStatistics} item={item}/>
        <Button text="Edit details" onPressButton={editProduct} item={item} />
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
      infoBar: "Your currency is " + CURRENCY,
    };
  }

  onVarChange(id, varValue, varName) {
    this.setState({
      infoBar: "Saving changes",
    });
    http
      .post("product/" + varName + "/" + id + "/" + varValue)
      .then((r) => this.setState({ infoBar: "All changes are saved." }))
      .catch((_) => this.setState({ infoBar: "Failed to save changes" }));
  }

  setProducts() {
    getProductsConfiguration()
        .then(products => {
          this.setState({products: products})
        })
        .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setProducts();
    getSession().then((sessionEnabled) => {
      this.setState({
        sessionEnabled: sessionEnabled,
      });
      if (sessionEnabled)
        this.setState({
          infoBar: "Disable session in order to configure prices",
        });
    });
  }

  openStatistics(item) {
    this.props.navigation.navigate("ownerProductStats", {
      productId: item.id,
      productName: item.name,
    })
  }

  editProduct(item) {
    this.props.navigation.navigate("ownerEditProduct", {id: item.id, ctx: this, update: true})
  }

  renderItem = ({item}) => {
    return (
        <Item item={item}
              onVarChange={this.onVarChange.bind(this)}
              sessionEnabled={this.state.sessionEnabled}
              editProduct={this.editProduct.bind(this)}
              openStatistics={this.openStatistics.bind(this)}
        />
    )
  }

  render() {
    const topBarIcons = [
      <AntDesign
        name="barschart"
         key={2}
         size={iconSize}
         color={iconColor}
         style={topBarIconStyle(6).style}
         onPress={() => {
           this.props.navigation.navigate("ownerMainPage")
         }}
      />,
      <MaterialCommunityIcons
          key={3}
          name="plus"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => this.props.navigation.navigate("ownerAddProduct")}
      />,
    ];
    return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Configure products"} icons={topBarIcons}/>
          <View style={changesSaver.bar}><Text style={changesSaver.text}>{this.state.infoBar}</Text></View>
          {/*todo to listStyles*/}
          <View style={bartStyles.listBox}>
            <FlatList data={this.state.products} renderItem={this.renderItem} keyExtractor={(item) => item.id}/>
          </View>
        </View>
    )
  }
}
