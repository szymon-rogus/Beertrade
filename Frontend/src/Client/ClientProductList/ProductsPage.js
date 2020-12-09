import React, { Component } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../../GlobalStyles";
import { http, beerPhoto, TopBar, logout, CURRENCY } from "../../../Global";
import { buttonStyleSheet, styles } from "./ProductsPageStyles";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { ChooseTableBar } from "./ClientModals/TablePicker/ChooseTableBar";
import { Sorter } from "./ClientModals/Sorter/Sorter";
import Autocomplete from 'react-native-autocomplete-input';
import { Filter } from "./ClientModals/Filter/Filter";

const Item = ({ item, onPress, navigation, buttonEnabled, isTableSet, price }) => (
  <View style={styles.item}>
    <View
      style={{
        flex: 0.3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image style={styles.beerImage} source={{ uri: beerPhoto }} />
    </View>
    <View
      style={{
        flex: 0.4,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
      }}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.attributes}>
        {item.type} {item.alcoholPercentage}%
      </Text>
      <Text style={styles.attributes}>IBU {item.ibu}</Text>
    </View>
    <View
      style={{
        flex: 0.3,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity>
        <Ionicons
          name="ios-information-circle"
          size={24}
          color="darkblue"
          style={{ marginBottom: 20, marginTop: 6 }}
          onPress={() =>
            navigation.navigate("productDetails", {
              itemId: item.id,
              isTableSet: isTableSet
            })
          }
        />
      </TouchableOpacity>
      <Text style={styles.attributes}>{price != null ? price.toFixed(2) : price} {CURRENCY}</Text>
      <TouchableOpacity
        style={buttonStyleSheet(buttonEnabled).orderButton}
        disabled={!buttonEnabled}
        onPress={onPress}
      >
        <Text style={{ color: "white" }}>Order</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      searchText: "",
      filteredProducts: [],
      products: [],
      isModalVisible: false,
      isTableSet: false,
      sessionEnabled: false,
      prices: {},
      pricesCheckStamp: null,
      dataLoaded: false,
      sortBy: 'Name',
      sortAsc: true,
      alcoholMin: 0,
      alcoholMax: 10,
      ibuMin: 5,
      ibuMax: 80,
      types: [],
      chosenTypes: null,
    };
  }

  orderProduct(id, price) {
    http.post("/product/order/" + id, {price : price}).catch((err) => console.log(err));
  }

  getPrice(item) {
    return this.state.prices[item.id] != null ? this.state.prices[item.id] : item.basePrice
  }

  renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        price={
          this.state.prices[item.id] != null
            ? this.state.prices[item.id]
            : item.basePrice
        }
        buttonEnabled={this.state.isTableSet && this.state.sessionEnabled}
        isTableSet = {this.state.isTableSet}
        onPress={() => {
          this.setState({ selectedId: item.id });
          this.orderProduct(item.id, this.getPrice(item));
          alert("Product ordered.");
        }}
        navigation={this.props.navigation}
      />
    );
  };

  setProductsAndSession() {
    http
      .get("/product/onStore")
      .then((response) => response.data)
        .then((data) => {this.setTypes(data); return data})
        .then((data) => {data = this.filterBy(data); return data})
        .then((data) => {this.sortByChosenAttr(data); return data;})
      .then((data) => this.setState({ products: data}))
      .catch((err) => console.log(err));
    http.get("/session").then((response) => {
      if (response.data === "START") {
        this.setState({
          sessionEnabled: true,
          dataLoaded: true,
        });
      } else {
        this.setState({
          sessionEnabled: false,
          dataLoaded: true,
        });
      }
    });
  }

  setPrices = async () => {
    let responseCheckStamp = null;
    let prices = {};
    http
      .get("/price/all")
      .then((response) => {
        responseCheckStamp = response.data.checkStamp;
        prices = response.data.prices;
        if (responseCheckStamp === this.state.pricesCheckStamp) {
          this.setPrices();
        } else {
          this.setState({
            pricesCheckStamp: responseCheckStamp,
            prices: prices,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.setProductsAndSession();
    this.setPrices();
    this.interval = setInterval(
      function (self) {
        self.setProductsAndSession();
      },
      5000,
      this
    );
    this.pricesInterval = setInterval(
      function (self) {
        self.setPrices();
      },
      15000,
      this
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.pricesInterval);
  }

  setTypes = (products) => {
    let types = []
    products.forEach((item, i) => {
      if(!types.includes(item.type)) {
        types.push(item.type)
      }
    })

    this.setState({
      types: types,
    })
  }

  search = (searchText) => {
    this.setState({ searchText: searchText });

    let filteredData = this.state.products.filter(function (item) {
      return (
          searchText.length === 0 ? false:
        item.name.substring(0, searchText.length).toLowerCase() ===
        searchText.toLowerCase()
      );
    });

    this.setState({
      filteredProducts: filteredData
    });
  };

  sortByChosenAttr = (list) => {
    list.sort((a,b) => {
      if(this.state.sortBy === 'Name') {
        return this.state.sortAsc ? a.name.toLowerCase() > b.name.toLowerCase() : a.name.toLowerCase() < b.name.toLowerCase()
      }
      if(this.state.sortBy === 'IBU') {
        return this.state.sortAsc ? a.ibu > b.ibu : a.ibu < b.ibu
      }
      if(this.state.sortBy === 'Alcohol') {
        return this.state.sortAsc ? a.alcoholPercentage > b.alcoholPercentage : a.alcoholPercentage < b.alcoholPercentage
      }
    })
  }

  filterBy = (list) => {
    return list.filter((item) => {
      return item.alcoholPercentage <= this.state.alcoholMax
          && item.alcoholPercentage >= this.state.alcoholMin
          && item.ibu <= this.state.ibuMax
          && item.ibu >= this.state.ibuMin
          && (this.state.chosenTypes ? this.state.chosenTypes.includes(item.type) : true)
    })
  }

  render() {
    const topBarIcons = [
      <MaterialCommunityIcons
          key={1}
          name="logout"
          size={36}
          color={"white"}
          style={{ marginRight: 20 }}
          onPress={() => logout(this)}
      />,
    ];
    const menuIcon = [
      <FontAwesome5
          key={1}
          name="th-list"
          size={36}
          color={"white"}
          style={{ marginLeft: 20 }}
          onPress={() => this.props.navigation.navigate("clientOrders")}
      />,
    ];
    return (
      <View style={globalStyles.mainContainer}>
        <TopBar backIcon={menuIcon} icons={topBarIcons}/>
        <View style={styles.searchBar}>
          <Ionicons
            style={{ marginRight: 10, marginTop: 5 }}
            name="ios-search"
            size={26}
          />
          <View style={styles.autocomplete}>
            <Autocomplete
                placeholder="Enter the beer name"
                autoCapitalize="none"
                autoCorrect={false}
                defaultValue={this.state.searchText}
                data={this.state.filteredProducts}
                keyExtractor={(item) => item.id}
                onChangeText={this.search}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => this.search(item.name)}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                style={{
                  backgroundColor: "white",
                  width: "100%",
                  borderWidth: 1,
                }}
                listContainerStyle={{zIndex: 1, position: 'absolute'}}
                containerStyle={{zIndex: 1}}
            />

          </View>
          <Filter context={this} />
          <Sorter context={this} />
        </View>
        <View style={{ flex: 0.1, width: "100%"}}>
          <ChooseTableBar
            context={this}
            sessionEnabled={this.state.sessionEnabled}
            productPageDataLoaded={this.state.dataLoaded}
          />
        </View>
        <View style={{ flex: 0.8, width: "100%" }}>
          <FlatList
            data={
              this.state.searchText.length > 0
                ? this.state.filteredProducts
                : this.state.products
            }
            renderItem={this.renderItem}
            keyExtractor={(item) => item.id}
            extraData={this.selectedId}
          />
        </View>
      </View>
    );
  }
}
