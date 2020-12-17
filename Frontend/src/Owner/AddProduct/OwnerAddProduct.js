import React, { Component } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";


import AntDesign from "react-native-vector-icons/AntDesign";
import { SAVED, UNSAVED } from "../SaveChangesComponent/SaveChangesComponent";
import { globalStyles, iconColor, iconSize, topBarIconStyle } from "../../../GlobalStyles";
import { http, TopBar } from "../../../Global";
import { bgColor } from "../../Authentication/Registration/RegistrationPageStyles";
import { loginStyles } from "../../Authentication/Login/LoginPageStyles";
import { launchImageLibrary } from 'react-native-image-picker/src';


export const Item = ({name, onChange, example, defaultValue, multiline}) => (
  <View>
    <Text style={globalStyles.blackInputLabel}> {name} </Text>
    <TextInput
      multiline={multiline}
      style={multiline ? [globalStyles.blackInput, {height: 60}] : globalStyles.blackInput}
      underlineColorAndroid="transparent"
      // placeholder={example}
      defaultValue={defaultValue ? defaultValue : ""}
      placeholderTextColor={"#000"}
      autoCapitalize="none"
      onChangeText={(text) => onChange(text)}

    />
  </View>
)


export default class OwnerAddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      changes: SAVED,
      name: "",
      alcoholPercentage: 0.0,
      amortizationFactor: 0,
      basePrice: 0,
      blg: 0,
      brewery: "",
      description: "",
      ebc: 0,
      ibu: 0,
      maxPrice: 0,
      minPrice: 0,
      onStore: false,
      origin: "",
      photo: null,
      type: "",
      year: "",
      productState: "HIDDEN",
      photoPath: "",
    };
  }

  changes() {
    this.setState({changes: UNSAVED})
  }


  onSave() {
    console.log(this.state)
    http.post("/product", {
      name: this.state.name,
      alcoholPercentage: this.state.alcoholPercentage,
      amortizationFactor: this.state.amortizationFactor,
      basePrice: this.state.basePrice,
      blg: this.state.blg,
      brewery: this.state.brewery,
      description: this.state.description,
      ebc: this.state.ebc,
      ibu: this.state.ibu,
      maxPrice: this.state.maxPrice,
      minPrice: this.state.minPrice,
      onStore: this.state.onStore,
      origin: this.state.origin,
      photo: this.state.photo,
      type: this.state.type,
      year: this.state.year,
      productState: this.state.productState
    }).catch((_) => alert("Failed to add the product")).then(() => this.props.navigation.navigate("ownerProductList"));
  }


  render() {
    const topBarIcons = [
      <AntDesign
        name="close"
        key={2}
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => {
          this.props.navigation.navigate("ownerProductList")
        }}
      />
    ];
    return (
      <View style={globalStyles.mainContainer}>
        <TopBar title={"Add product"} icons={topBarIcons}/>
        <View style={globalStyles.scrollViewFullWidth}>
          <ScrollView>
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity style={loginStyles.logInPageButton} onPress={() => this.selectImage()}>
                <Text style={{color: "#fff",}}>Select image</Text>
              </TouchableOpacity>
              <View style={{width: "100%"}}><Text style={{
                paddingVertical: 10, width: "60%",
                paddingHorizontal: 2, flexWrap: "wrap",
              }}>{this.state.photoPath}</Text>
              </View>
            </View>
            <Item
              name="Name"
              onChange={(text) => {
                this.setState({name: text});
              }}
              example="i.e. Pilsner"
            />
            <Item
              name="Alcohol percantage"
              onChange={(text) => {
                this.setState({alcoholPercentage: text});
              }}
              example="i.e. 5.5%"
            />
            <Item
              name="Brewery"
              onChange={(text) => {
                this.setState({brewery: text});
              }}
              example="i.e. Carlsberg"
            />
            <Item
              name="Description"
              onChange={(text) => {
                this.setState({description: text});
              }}
              example="i.e. The best beer in the world. From the first time it was invented in was sold in tousands every day..."
              multiline
            />
            <Item
              name="EBC"
              onChange={(text) => {
                this.setState({ebc: text});
              }}
              example="i.e. 8"
            />
            <Item
              name="BLG"
              onChange={(text) => {
                this.setState({blg: text});
              }}
              example="i.e. 8"
            />
            <Item
              name="IBU"
              onChange={(text) => {
                this.setState({name: text});
              }}
              example="i.e. 8"
            />
            <Item
              name="Origin country"
              onChange={(text) => {
                this.setState({origin: text});
              }}
              example="i.e. USA"
            />
            <Item
              name="Type"
              onChange={(text) => {
                this.setState({type: text});
              }}
              example="i.e. Dark"
            />
            <Item
              name="Year"
              onChange={(text) => {
                this.setState({year: text});
              }}
              example="i.e. 1998"
            />
            <TouchableOpacity style={loginStyles.logInPageButton} onPress={() => this.onSave()}>
              <Text style={{color: bgColor, textAlign: "center"}}>Save</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </View>
    )
  }

  selectImage() {
    let options = {
      includeBase64: true,
    };
    launchImageLibrary(options, (response) => {


      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {

        this.setState({
          photo: response.base64,
          photoPath: response.fileName
        });
      }
    });
  }

}
