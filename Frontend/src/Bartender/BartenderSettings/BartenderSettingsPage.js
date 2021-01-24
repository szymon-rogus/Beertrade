import React, {Component} from "react";
import {View, Text, TouchableOpacity} from "react-native";
import SwitchSelector from "react-native-switch-selector";

import {http} from "../../../Global";
import {globalStyles} from "../../../GlobalStyles";
import {styles} from "./BartenderSettingsPageStyles";
import {getSession} from "../../Services/SessionService";

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
    getSession()
        .then(sessionStatus => {
          this.setState({
            isSessionDisabled: !sessionStatus,
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
    if (this.state.isLoading) {
      return (
          <View style={globalStyles.mainContainer}>
            <View style={styles.loadingPageStyle}>
              <Text>Loading...</Text>
              {this.props.slideDownIcon}
            </View>
          </View>
      );
    } else {
      let noClearWarn = null;
      if (this.props.ordersWaiting) {
        noClearWarn = (
            <Text style={{color: "red"}}>
              Cannot finish the day - orders still waiting
            </Text>
        );
      }
      const initialSelectorValue = this.state.isSessionDisabled ? 1 : 0;
      const clearSessionButtonStyle =
          this.state.isSessionDisabled && !this.props.ordersWaiting
              ? styles.clearSessionButton
              : styles.clearSessionButtonDisabled;
      return (
          <View style={globalStyles.mainContainer}>
            <View style={styles.settingsPageContainer}>
              <Text style={styles.sessionText}>Ordering products</Text>
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
                  disabled={
                    !this.state.isSessionDisabled || this.props.ordersWaiting
                  }
              >
                <Text style={styles.clearSessionButtonText}>Finish the day</Text>
              </TouchableOpacity>
              {noClearWarn}
              {this.props.slideDownIcon}
            </View>
          </View>
      );
    }
  }
}
