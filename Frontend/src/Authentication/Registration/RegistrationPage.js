import React, {Component} from "react";
import {Text, View, TouchableOpacity, TextInput} from "react-native";
import base64 from "react-native-base64";

import {http, getErrorMessage, snackBar} from "../../../Global";
import {globalStyles} from "../../../GlobalStyles";
import {styles, fontColor, bgColor} from "./RegistrationPageStyles";

export default class RegistrationPage extends Component {
  state = {
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  };

  handleRegister = () => {
    if (
        this.state.login !== "" &&
        this.state.password !== "" &&
        this.state.firstName !== "" &&
        this.state.lastName !== "" &&
        this.state.email !== "" &&
        this.state.phoneNumber !== ""
    ) {
      http
          .post("/register", {
            login: base64.encode(this.state.login),
            password: base64.encode(this.state.password),
            firstName: base64.encode(this.state.firstName),
            lastName: base64.encode(this.state.lastName),
            email: base64.encode(this.state.email),
            phoneNumber: base64.encode(this.state.phoneNumber),
          }).then((response) => {
            this.props.navigation.navigate("login");
            snackBar("Account created")
          })
          .catch((error) => {
            getErrorMessage(error)
          });
    }
  };

  render() {
    return (
        <View style={globalStyles.mainContainer}>
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Login"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({login: text});
              }}
          />
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Password"
              secureTextEntry={true}
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({password: text});
              }}
          />
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="First name"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({firstName: text});
              }}
          />
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Last name"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({lastName: text});
              }}
          />
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Email"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({email: text});
              }}
          />
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Phone number"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({phoneNumber: text});
              }}
          />
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
                onPress={this.handleRegister}
                style={styles.registerPageButton}
            >
              <Text style={{color: bgColor}}>Register</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("login")}
                style={styles.registerPageButton}
            >
              <Text style={{color: bgColor}}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
