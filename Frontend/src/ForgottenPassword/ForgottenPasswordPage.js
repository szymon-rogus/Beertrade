import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { http } from "../../Global.js";
import { styles, fontColor, bgColor } from "./ForgottenPasswordPageStyles.js";

export default class ForgottenPasswordPage extends Component {
  state = {
    email: "",
  };

  handleSend = () => {
    if (this.state.email != "") {
      http
        .post("/forgottenpass", this.state.email)
        .catch((err) => alert("Server is not responding!"));
      this.props.navigation.navigate("login");
    }
  };

  render() {
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}></Text>
        <TextInput
          style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Email"
          placeholderTextColor={fontColor}
          autoCapitalize="none"
          onChangeText={(text) => {
            this.setState({ email: text });
          }}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.handleSend}
            style={styles.buttonStyle}
          >
            <Text style={{ color: bgColor }}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("login")}
            style={styles.buttonStyle}
          >
            <Text style={{ color: bgColor }}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
