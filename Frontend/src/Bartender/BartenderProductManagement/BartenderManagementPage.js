import React, { Component } from "react";
import { http, TopBar, logout } from "../../../Global.js";
import { View, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { globalStyles, iconColor, iconSize, topBarIconStyle } from "../../../GlobalStyles.js";
import { bartStyles } from "./BartenderManagementPageStyles.js";
import { FontAwesome5 } from "@expo/vector-icons";
import SwitchSelector from "react-native-switch-selector";
import { ProductListItem } from "./ProductListItem.js";
import { beerPhoto } from "../../../Global";

const ENABLED = "enabled";
const DISABLED = "disabled";

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

  renderItem = ({ item }) => {
    const actionIcon =
      item.productState === "ON_STORE" ? (
        <AntDesign
          name="minuscircleo"
          style={{ marginTop: 60 }}
          size={36}
          color="black"
          onPress={() => this.sendRequestDisableItem(item.id)}
        />
      ) : (
        <AntDesign
          name="pluscircleo"
          size={36}
          color="black"
          style={{ marginTop: 60 }}
          onPress={() => this.sendRequestEnableItem(item.id)}
        />
      );
    const encodedPhoto =
      item.encodedPhoto !== null ? item.encodedPhoto : beerPhoto;
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
    const topBarIcons = [
      <FontAwesome5
        key={2}
        name="th-list"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => this.props.navigation.navigate("bartenderOrder")}
      />,
      <MaterialCommunityIcons
        key={3}
        name="logout"
        size={iconSize}
        color={iconColor}
        style={topBarIconStyle(6).style}
        onPress={() => logout(this)}
      />,
    ];
    return (
      <View style={globalStyles.mainContainer}>
        <TopBar title={"Manage products"} icons={topBarIcons} />
        <View style={bartStyles.listBox}>
          <SwitchSelector
            initial={0}
            onPress={(value) => this.setState({ chosenItems: value })}
            textColor="black"
            selectedColor="white"
            buttonColor="black"
            borderColor="black"
            hasPadding
            style={bartStyles.switchSelector}
            options={[
              { label: "Enabled", value: ENABLED },
              { label: "All", value: "all" },
              { label: "Disabled", value: DISABLED },
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
