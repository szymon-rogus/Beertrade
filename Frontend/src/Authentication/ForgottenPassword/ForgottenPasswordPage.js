import React, {Component} from "react";
import {Text, View, TouchableOpacity, TextInput} from "react-native";

import {http, getErrorMessage, snackBar} from "../../../Global";
import {globalStyles} from "../../../GlobalStyles";
import {styles, fontColor, bgColor} from "./ForgottenPasswordPageStyles";

export default class ForgottenPasswordPage extends Component {
  state = {
    email: "",
  };

  handleSend = () => {
    if (this.state.email !== "") {
      http
          .post("/forgottenpass", this.state.email)
          .then((response) => {
            this.props.navigation.navigate("login");
            snackBar("Check your email for new credentials")
          })
          .catch((error) => {
            getErrorMessage(error)
          });
    }
  };

  render() {
    return (
        <View style={globalStyles.mainContainer}>
          <Text style={styles.textStyle}/>
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
          <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={this.handleSend}
                style={styles.buttonStyle}
            >
              <Text style={{color: bgColor}}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate("login")}
                style={styles.buttonStyle}
            >
              <Text style={{color: bgColor}}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}
