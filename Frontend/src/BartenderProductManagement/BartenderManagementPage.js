import React, { Component } from "react";
import { http, TopBar } from "../../Global.js";
import { View, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles, topBarIconStyle } from "../../GlobalStyles.js";
import { styles } from "./BartenderManagementPageStyles.js";
import { FontAwesome5 } from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import { ProductListItem } from "./ProductListItem.js";

const ENABLED = "enabled"
const DISABLED = "disabled"

export default class BartenderManagementPage extends Component {

  state = {
    enabledItems: [],
    disabledItems: [],
    chosenItems: ENABLED,
  };

  constructor(props) {
    super(props);
    this.getItems();
  }

  getItems = async () => {
    http
      .get("/product/manage/all")
      .then((response) => {
        let fetchedList = [];
        fetchedList.push(...response.data);
        const enabled = fetchedList.filter(
          (item) => item.productState === "ON_STORE"
        );
        const disabled = fetchedList.filter(
          (item) => item.productState !== "ON_STORE"
        );
        this.setState({
          enabledItems: enabled,
          disabledItems: disabled,
          chosenItems: ENABLED,
        });
      })
      .catch((err) => console.log(err));
  };

  sendRequestEnableItem = (id) => {
    http
      .post("/product/state/" + id + "/ON_STORE")
      .then((response) => {
        let actualEnabledItems = this.state.enabledItems;
        actualEnabledItems.push(response.data);
        let actualDisabledItems = this.state.disabledItems;
        actualDisabledItems = actualDisabledItems.filter(
          (item) => item.id !== id
        );
        this.setState({
          enabledItems: actualEnabledItems,
          disabledItems: actualDisabledItems,
        });
      })
      .catch((err) => console.log(err));
  };

  sendRequestDisableItem = (id) => {
    http
      .post("/product/state/" + id + "/HIDDEN")
      .then((response) => {
        let actualDisabledItems = this.state.disabledItems;
        actualDisabledItems.push(response.data);
        let actualEnabledItems = this.state.enabledItems;
        actualEnabledItems = actualEnabledItems.filter(
          (item) => item.id !== id
        );
        this.setState({
          enabledItems: actualEnabledItems,
          disabledItems: actualDisabledItems,
        });
      })
      .catch((err) => console.log(err));
  };

  renderItem = ({item}) => {
    const actionIcon =
      item.productState === "ON_STORE" ? (
        <AntDesign
          name="close"
          style={{marginTop: 60}}
          size={36}
          color="black"
          onPress={() => this.sendRequestDisableItem(item.id)}
        />
      ) : (
        <Ionicons
          name="md-add"
          size={40}
          color="black"
          style={{marginTop: 60}}
          onPress={() => this.sendRequestEnableItem(item.id)}
        />
      );
    const encodedPhoto =
      item.encodedPhoto !== null
        ? item.encodedPhoto
        : "data:image/jpeg;base64,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";
    return (
      <ProductListItem
        item={item}
        actionIcon={actionIcon}
        photo={encodedPhoto}
      />
    );
  };

  render() {
    let visibleItems = [];
    if (this.state.chosenItems === ENABLED) {
      visibleItems.push(...this.state.enabledItems);
    } else if (this.state.chosenItems === DISABLED) {
      visibleItems.push(...this.state.disabledItems);
    } else {
      visibleItems.push(...this.state.enabledItems);
      visibleItems.push(...this.state.disabledItems);
    }
    const iconSize = 36;
    const iconColor = "white";
    const topBarIcons = [
      <Ionicons
        key={1}
        name="md-settings"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.props.navigation.navigate("bartenderSettings")}
      />,
      <FontAwesome5
        key={2}
        name="th-list"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.props.navigation.navigate("bartenderOrder")}
      />,
      <MaterialIcons
        key={3}
        name="account-circle"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
      />,
    ];
    return (
      <View style={globalStyles.mainContainer}>
        <TopBar title={"Manage products"} icons={topBarIcons} />
        <View style={styles.listBox}>
          <SwitchSelector
            initial={0}
            onPress={(value) => this.setState({chosenItems: value})}
            textColor="black"
            selectedColor="white"
            buttonColor="black"
            borderColor="black"
            hasPadding
            style={styles.switchSelector}
            options={[
              {label: "Enabled", value: ENABLED},
              {label: "All", value: "all"},
              {label: "Disabled", value: DISABLED},
            ]}
          />
          <FlatList
            data={visibleItems}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}
