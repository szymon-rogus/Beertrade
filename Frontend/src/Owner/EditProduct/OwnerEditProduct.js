import React, { Component } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { launchImageLibrary } from "react-native-image-picker/src/index";

import { asMoneyString, http, TopBar } from "../../../Global";
import { globalStyles, iconColor, iconSize, topBarIconStyle } from "../../../GlobalStyles";
import { loginStyles } from "../../Authentication/Login/LoginPageStyles";
import { bgColor } from "../../Authentication/Registration/RegistrationPageStyles";
import { Item } from "../AddProduct/OwnerAddProduct";

export default class OwnerEditProduct extends Component {
  constructor(props) {
    super(props);
    const {id, ctx, update} = props.route.params;
    this.state = {
      productId: id,
      ctx: ctx
    }
    if(update)
      this.setProduct(this.state.id)
  }

  componentDidMount() {
    this.setProduct(this.state.productId)
  }

  setProduct(id) {
    http.get("/product/" + id).then(r => r.data).then(r => {
      this.setState({
        id: id,
        name: r.name,
        alcoholPercentage: asMoneyString(r.alcoholPercentage),
        amortizationFactor: r.amortizationFactor,
        basePrice: asMoneyString(r.basePrice),
        blg: asMoneyString(r.blg.toString()),
        brewery: r.brewery,
        description: r.description,
        ebc: r.ebc.toString(),
        ibu: r.ibu.toString(),
        maxPrice: asMoneyString(r.maxPrice),
        minPrice: asMoneyString(r.minPrice),
        onStore: r.onStore,
        origin: r.origin,
        photo: r.encodedPhoto,
        type: r.type,
        year: r.year,
        productState: r.productState
      })
    })
  }

  onSave() {
    http.post("/product", {
      id: this.state.id,
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
    }).catch((_) => alert("Failed to edit the product")).then(() => {
      this.state.ctx.setProducts()
      this.props.navigation.navigate("ownerProductList")
    });

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
        <TopBar title={"Edit product"} icons={topBarIcons}/>
        <View style={globalStyles.scrollViewFullWidth}>
          <ScrollView>
            <View style={{flexDirection: "row"}}>
              <TouchableOpacity style={loginStyles.logInPageButton} onPress={() => this.selectImage()}>
                <Text style={{color: "#fff",}}>Select image</Text>
              </TouchableOpacity>
              <View><Image style={{width: 20, height: 40, marginTop: 15}}
                           source={{uri: "data:image/jpeg;base64," + this.state.photo}}/></View>
              <View style={{}}><Text style={{
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
              defaultValue={this.state.name}
            />
            <Item
              name="Alcohol percantage (%)"
              onChange={(text) => {
                this.setState({alcoholPercentage: text});
              }}
              example="i.e. 5.5%"
              defaultValue={this.state.alcoholPercentage}
            />
            <Item
              name="Brewery"
              onChange={(text) => {
                this.setState({brewery: text});
              }}
              example="i.e. Carlsberg"
              defaultValue={this.state.brewery}
            />
            <Item
              name="Description"
              onChange={(text) => {
                this.setState({description: text});
              }}
              example="i.e. The best beer in the world. From the first time it was invented in was sold in tousands every day..."
              defaultValue={this.state.description}
              multiline
            />
            <Item
              name="EBC"
              onChange={(text) => {
                this.setState({ebc: text});
              }}
              example="i.e. 8"
              defaultValue={this.state.ebc}
            />
            <Item
              name="BLG"
              onChange={(text) => {
                this.setState({blg: text});
              }}
              example="i.e. 8"
              defaultValue={this.state.blg}
            />
            <Item
              name="IBU"
              onChange={(text) => {
                this.setState({name: text});
              }}
              example="i.e. 8"
              defaultValue={this.state.ibu}
            />
            <Item
              name="Origin country"
              onChange={(text) => {
                this.setState({origin: text});
              }}
              example="i.e. USA"
              defaultValue={this.state.origin}
            />
            <Item
              name="Type"
              onChange={(text) => {
                this.setState({type: text});
              }}
              example="i.e. Dark"
              defaultValue={this.state.type}
            />
            <Item
              name="Year"
              onChange={(text) => {
                this.setState({year: text});
              }}
              example="i.e. 1998"
              defaultValue={this.state.year}
            />
            <TouchableOpacity style={loginStyles.logInPageButton} onPress={() => this.onSave()}>
              <Text style={{color: bgColor, textAlign: "center"}}>Save</Text>
            </TouchableOpacity>
          </ScrollView>

        </View>
      </View>
    )
  }
}
