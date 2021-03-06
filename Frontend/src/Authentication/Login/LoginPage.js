import React, {Component} from "react";
import {Text, View, TouchableOpacity, TextInput} from "react-native";

import {http, setAuthorizationToken, APP_TITLE, getErrorMessage} from "../../../Global";
import {globalStyles} from "../../../GlobalStyles";
import {loginStyles, fontColor, bgColor} from "./LoginPageStyles";

export default class LoginPage extends Component {
  state = {
    loggedIn: false,
    login: "",
    password: "",
  };

  handleLogin = (text) => {
    this.setState({login: text});
  };

  handleAuth = () => {
    if (this.state.login !== "" && this.state.password !== "") {
      http
          .post("/login", {
            login: this.state.login,
            password: this.state.password,
          })
          .then((response) => {
            setAuthorizationToken(response.data.token);
            this.setState({loggedIn: true});
            let role = response.data.role;
            if (role === "pl.beertrade.model.user.Bartender") {
              this.props.navigation.navigate("bartenderOrder");
            } else if (role === "pl.beertrade.model.user.Owner") {
              this.props.navigation.navigate("ownerMainPage");
            } else {
              this.props.navigation.navigate("productList");
            }
          })
          .catch((error) => {
            getErrorMessage(error)
          });
    }
  };

  handlePassword = (text) => {
    this.setState({password: text});
  };

  render() {
    return (
        <View style={globalStyles.mainContainer}>
          <Text style={globalStyles.appTitle}>{APP_TITLE}</Text>
          <TextInput
              style={globalStyles.input}
              underlineColorAndroid="transparent"
              placeholder="Login"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={this.handleLogin}
          />
          <TextInput
              style={globalStyles.input}
              secureTextEntry={true}
              underlineColorAndroid="transparent"
              placeholder="Password"
              placeholderTextColor={fontColor}
              autoCapitalize="none"
              onChangeText={this.handlePassword}
          />
          <View style={globalStyles.buttonContainer}>
            <TouchableOpacity
                onPress={this.handleAuth}
                style={loginStyles.logInPageButton}
            >
              <Text style={{color: bgColor}}>Log in</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("registration")}
                style={loginStyles.logInPageButton}
            >
              <Text style={{color: bgColor}}>Register</Text>
            </TouchableOpacity>
          </View>
          <Text
              style={loginStyles.forgottenPasswordText}
              onPress={() => this.props.navigation.navigate("forgottenpass")}
          >
            Forgotten password
          </Text>
        </View>
    );
  }
}
