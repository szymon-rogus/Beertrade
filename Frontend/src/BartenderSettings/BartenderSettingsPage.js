import React, { Component } from "react";
import { http, TopBar } from "../../Global.js";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { globalStyles, topBarIconStyle } from "../../GlobalStyles.js";
import { styles } from "./BartenderSettingsPageStyles.js";
import { FontAwesome5 } from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";

export default class BartenderSettingsPage extends Component {
  state = {
    isSessionDisabled: null,
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.getSessionState();
  }

  getSessionState = () => {
    http
      .get("/session")
      .then((response) => {
        const sessionState = response.data;
        const isSessionDisabled = sessionState === "START" ? false : true;
        this.setState({
          isSessionDisabled: isSessionDisabled,
          isLoading: false,
        });
      })
      .catch((err) => console.log(err));
  };

  changeSessionState = (state) => {
    this.postSessionChange(state);
    if (state === "enable") {
      this.setState({
        isSessionDisabled: false,
      });
    } else {
      this.setState({
        isSessionDisabled: true,
      });
    }
  };

  postSessionChange = async (state) => {
    http.post("/session/" + state).catch((err) => console.log(err));
  };

  clearSession = async () => {
    http.delete("/session").catch((err) => console.log(err));
  };

  render() {
    const iconSize = 36;
    const iconColor = "white";
    const topBarIcons = [
      <FontAwesome5
        key={1}
        name="th-list"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(4).style}
        onPress={() => this.props.navigation.navigate("bartenderOrder")}
      />,
      <MaterialCommunityIcons
        key={2}
        name="cup"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(4).style}
        onPress={() => this.props.navigation.navigate("bartenderManage")}
      />,
      <MaterialIcons
        key={3}
        name="account-circle"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(4).style}
      />,
    ];
    if (this.state.isLoading) {
      return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Settings"} icons={topBarIcons} />
          <View style={styles.loadingPageStyle}>
            <Text>Loading...</Text>
          </View>
        </View>
      );
    } else {
      const initialSelectorValue = this.state.isSessionDisabled ? 1 : 0;
      const clearSessionButtonStyle = this.state.isSessionDisabled
        ? styles.clearSessionButton
        : styles.clearSessionButtonDisabled;
      return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Settings"} icons={topBarIcons} />
          <View style={styles.settingsPageContainer}>
            <Text style={styles.sessionText}>Session</Text>
            <SwitchSelector
              style={styles.sessionSwitchSelector}
              initial={initialSelectorValue}
              onPress={(value) => this.changeSessionState(value)}
              textColor="black"
              selectedColor="white"
              buttonColor="black"
              borderColor="black"
              hasPadding
              options={[
                {label: "Enabled", value: "enable"},
                {label: "Disabled", value: "disable"},
              ]}
            />
            <TouchableOpacity
              onPress={this.clearSession}
              style={clearSessionButtonStyle}
              disabled={!this.state.isSessionDisabled}
            >
              <Text style={styles.clearSessionButtonText}>Clear session</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}
