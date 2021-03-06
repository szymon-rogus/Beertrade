import React, {Component} from "react";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";
import Autocomplete from "react-native-autocomplete-input";
import DialogInput from 'react-native-dialog-input';

import {http, beerPhoto, TopBar, logout, CURRENCY, asMoney, snackBar, EmptyView} from "../../../Global";
import {globalStyles, iconColor, iconSize, topBarIconStyle} from "../../../GlobalStyles";
import {buttonStyleSheet, styles} from "./ProductsPageStyles";
import {ChooseTableBar} from "./ClientModals/TablePicker/ChooseTableBar";
import {Sorter} from "./ClientModals/Sorter/Sorter";
import {Filter} from "./ClientModals/Filter/Filter";
import {getProductList} from "../../Services/ProductService";
import {getSession} from "../../Services/SessionService";
import {getPrices} from "../../Services/PriceService";

const Item = ({item, onPress, navigation, buttonEnabled, isTableSet, price,}) => (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <Image style={styles.beerImage} source={{uri: item.encodedPhoto ? "data:image/jpeg;base64," + item.encodedPhoto : beerPhoto}}/>
      </View>
      <View style={styles.itemCenter}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.attributes}>
          {item.type} {item.alcoholPercentage}%
        </Text>
        <Text style={styles.attributes}>IBU {item.ibu}</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity>
          <Ionicons
              name="ios-information-circle"
              size={24}
              color="darkblue"
              style={{marginBottom: 20, marginTop: 6}}
              onPress={() =>
                  navigation.navigate("productDetails", {
                    itemId: item.id,
                    isTableSet: isTableSet,
                  })
              }
          />
        </TouchableOpacity>
        <Text style={styles.attributes}>
          {asMoney(price)} {CURRENCY}
        </Text>
        <TouchableOpacity
            style={buttonStyleSheet(buttonEnabled).orderButton}
            disabled={!buttonEnabled}
            onPress={onPress}
        >
          <Text style={{color: "white"}}>Order</Text>
        </TouchableOpacity>
      </View>
    </View>
);

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: null,
      searchText: "",
      allProducts: [],
      filteredProducts: [],
      products: [],
      isModalVisible: false,
      isTableSet: false,
      sessionEnabled: false,
      prices: {},
      pricesCheckStamp: null,
      dataLoaded: false,
      sortBy: "Name",
      sortAsc: true,
      alcoholMin: null,
      alcoholMax: null,
      ibuMin: null,
      ibuMax: null,
      types: [],
      chosenTypes: null,
      amountDialog: false,
      amountInput: "Enter amount",
      ordered: false,
    };
  }

  orderProduct(id, price, amount) {
    http.post("/product/order/" + id, {price: price, amount: amount})
        .catch((err) => console.log(err));
  }

  getPrice(item) {
    return this.state.prices[item.id] != null
        ? this.state.prices[item.id]
        : item.basePrice;
  }

  renderItem = ({item}) => {
    return (
        <Item
            item={item}
            price={
              this.state.prices[item.id] != null
                  ? this.state.prices[item.id]
                  : item.basePrice
            }
            buttonEnabled={this.state.isTableSet && this.state.sessionEnabled}
            isTableSet={this.state.isTableSet}
            onPress={() => {this.setState({selectedItem: item, amountDialog: true})}}
            navigation={this.props.navigation}
        />
    );
  };

  renderEmpty = () => {
    return (
        <EmptyView/>
    );
  }

  setProductsAndSession() {
    getProductList()
        .then((data) => {
          this.setState({allProducts: data});
          return data;
        })
        .then((data) => {
          this.setTypes(data);
          return data;
        })
        .then((data) => {
          data = this.filterBy(data);
          return data;
        })
        .then((data) => {
          this.sortByChosenAttr(data);
          return data;
        })
        .then((data) => this.setState({products: data}))
        .catch((err) => console.log(err));
    getSession()
        .then(sessionStatus => {
          this.setState({
            sessionEnabled: sessionStatus,
            dataLoaded: true,
          });
        })
        .catch((err) => console.log(err));
  }

  setPrices = async () => {
    getPrices()
        .then((prices) => {
          if (prices.checkStamp === this.state.pricesCheckStamp) {
            this.setPrices();
          } else {
            this.setState({
              pricesCheckStamp: prices.checkStamp,
              prices: prices.prices,
            });
          }
        })
        .catch((err) => console.log(err));
  }

  async componentDidMount() {
    this.setProductsAndSession();
    await this.setPrices();
    this.interval = setInterval(
        function (self) {
          self.setProductsAndSession();
        },
        15000,
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

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevState.ordered && this.state.ordered) {
      setTimeout(() => {
        snackBar('Product ordered!')
        this.setState({ordered: false})
      }, 500)
    }
  }

  setTypes = (products) => {
    let types = [];
    products.forEach((item, i) => {
      if (!types.includes(item.type)) {
        types.push(item.type);
      }
    });

    this.setState({
      types: types,
    });
  };

  search = (searchText) => {
    this.setState({searchText: searchText});

    let filteredData = this.state.products.filter(function (item) {
      return searchText.length === 0
          ? false
          : item.name.substring(0, searchText.length).toLowerCase() ===
          searchText.toLowerCase();
    });

    this.setState({
      filteredProducts: filteredData,
    });
  };

  sortByChosenAttr = (list) => {
    list.sort((a, b) => {
      if (this.state.sortBy === "Name") {
        return this.state.sortAsc
            ? a.name.toLowerCase() > b.name.toLowerCase()
            : a.name.toLowerCase() < b.name.toLowerCase();
      }
      if (this.state.sortBy === "IBU") {
        return this.state.sortAsc ? a.ibu > b.ibu : a.ibu < b.ibu;
      }
      if (this.state.sortBy === "Alcohol") {
        return this.state.sortAsc
            ? a.alcoholPercentage > b.alcoholPercentage
            : a.alcoholPercentage < b.alcoholPercentage;
      }
    });
  };

  filterBy = (list) => {
    return list.filter((item) => {
      return (
          (this.state.alcoholMax
              ? item.alcoholPercentage <= this.state.alcoholMax
              : true) &&
          (this.state.alcoholMin
              ? item.alcoholPercentage >= this.state.alcoholMin
              : true) &&
          (this.state.ibuMax ? item.ibu <= this.state.ibuMax : true) &&
          (this.state.ibuMin ? item.ibu >= this.state.ibuMin : true) &&
          (this.state.chosenTypes
              ? this.state.chosenTypes.includes(item.type)
              : true)
      );
    });
  };

  render() {
    const topBarIcons = [
      <MaterialCommunityIcons
          key={1}
          name="cup"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => this.props.navigation.navigate("clientOrders")}
      />,
      <MaterialCommunityIcons
          key={1}
          name="logout"
          size={iconSize}
          color={iconColor}
          style={topBarIconStyle(6).style}
          onPress={() => logout(this)}
      />,
    ];
    return (
        <View style={globalStyles.mainContainer}>
          <TopBar title={"Product list"} icons={topBarIcons}/>
          <View style={styles.searchBar}>
            <Ionicons style={styles.searchIcon} name="ios-search" size={26}/>
            <View style={styles.autocomplete}>
              <Autocomplete
                  placeholder="Enter the beer name"
                  autoCapitalize="none"
                  autoCorrect={false}
                  defaultValue={this.state.searchText}
                  data={this.state.filteredProducts}
                  keyExtractor={(item) => item.id}
                  onChangeText={this.search}
                  renderItem={({item}) => (
                      <TouchableOpacity onPress={() => this.search(item.name)}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                  )}
                  style={styles.autocompleteElement}
                  listContainerStyle={{zIndex: 1, position: "absolute"}}
                  containerStyle={{zIndex: 1}}
              />
            </View>
            <Filter context={this}/>
            <Sorter context={this}/>
          </View>
          <View style={{flex: 0.1, width: "100%"}}>
            <ChooseTableBar
                context={this}
                sessionEnabled={this.state.sessionEnabled}
                productPageDataLoaded={this.state.dataLoaded}
            />
          </View>
          <DialogInput title={"Amount"}
                       isDialogVisible={this.state.amountDialog}
                       hintInput={this.state.amountInput}
                       submitInput={(amount) => {
                         if(Number.isInteger(parseFloat(amount))) {
                           this.setState({amountInput: "Enter amount", amountDialog: false, ordered: true})
                           this.orderProduct(this.state.selectedItem.id, this.getPrice(this.state.selectedItem), amount);
                         } else {
                           this.setState({amountInput: "Incorrect amount"})
                         }
                       }}
                       closeDialog={() => {this.setState({amountDialog: false})}}
                       textInputProps={{keyboardType: 'numeric'}}
                       submitText={"Order"}
          >
          </DialogInput>
          <View style={{flex: 0.8, width: "100%"}}>
            <FlatList
                data={
                  this.state.searchText.length > 0
                      ? this.state.filteredProducts
                      : this.state.products
                }
                renderItem={this.renderItem}
                keyExtractor={(item) => item.id}
                extraData={this.selectedItem}
                ListEmptyComponent={this.renderEmpty}
            />
          </View>
        </View>
    );
  }
}
