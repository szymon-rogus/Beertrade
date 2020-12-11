import React, {Component} from "react";
import {FlatList, Text, TextInput, TouchableOpacity, View} from "react-native";
import {FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";

import {asMoney, asMoneyString, CURRENCY, http, TopBar} from "../../Global";
import {globalStyles, iconColor, iconSize, topBarIconStyle} from "../../GlobalStyles";
import {bartStyles} from "../Bartender/BartenderProductManagement/BartenderManagementPageStyles.js";
import {ownerStyles} from "./OwnerProductListStyles"
import {getSession} from "../services/SessionService";
import {changesSaver} from "./SaveChangesComponent/SaveChangesComponentStyles";

const Button = ({text}) => (
    <TouchableOpacity style={ownerStyles.button}>
      <Text style={ownerStyles.buttonText}>{text}</Text>
    </TouchableOpacity>
)

const MyTextInput = ({varName, initValue, onVarChange, id, editable}) => (
    <TextInput style={ownerStyles.input}
               onChangeText={varValue => onVarChange(id, varValue, varName)}
               defaultValue={asMoneyString(initValue)}
               keyboardType="decimal-pad"
               editable={editable}
    />
)


const Item = ({item, onVarChange, sessionEnabled}) => (
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
      infoBar: "Your currency is " + CURRENCY,
    };
  }

  onVarChange(id, varValue, varName) {
    this.setState({
      infoBar: "Saving changes"
    })
    http.post("product/" + varName + "/" + id + "/" + varValue)
        .then(r => this.setState({infoBar: "All changes are saved."}))
        .catch(_ => this.setState({infoBar: "Failed to save changes"}))
  }

  setProducts() {
    http.get("/product/configure/all")
        .then((response) => response.data)
        .then(data => {
          return data;
        })
        .then((data) => this.setState({products: data}))
        .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setProducts();
    getSession().then(sessionEnabled => {
      this.setState({
        sessionEnabled: sessionEnabled
      });
      if (sessionEnabled) this.setState({infoBar: "Disable session in order to configure prices"})
    })
  }

  renderItem = ({item}) => {
    return (
        <Item item={item}
              onVarChange={this.onVarChange.bind(this)}
              sessionEnabled={this.state.sessionEnabled}
        />
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
          <View style={changesSaver.bar}><Text style={changesSaver.text}>{this.state.infoBar}</Text></View>
          {/*todo to listStyles*/}
          <View style={bartStyles.listBox}>
            <FlatList data={this.state.products} renderItem={this.renderItem} keyExtractor={(item) => item.id}/>
          </View>
        </View>
    )
  }
}
