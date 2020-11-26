import React, { Component } from 'react';
import { FlatList, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../GlobalStyles";
import { http } from '../../Global'
import { styles } from "./ProductsPageStyles";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ChooseTableBar } from "./ChooseTableBar";


const Item = ({item, onPress}) => (
  <View style={styles.item}>
    <View style={{
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
    </View>
    <View style={{
      flex: 0.4,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'stretch'
    }}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.attributes}>{item.type} {item.alcoholPercentage}%</Text>
      <Text style={styles.attributes}>IBU {item.ibu}</Text>
    </View>
    <View style={{
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-end'
    }}>
      <TouchableOpacity>
        <Ionicons name="ios-information-circle" size={24} color="darkblue" style={{marginBottom: 20, marginTop: 6}}/>
      </TouchableOpacity>
      <Text style={styles.attributes}>{item.price} PLN</Text>
      <TouchableOpacity style={styles.orderButton} onPress={onPress}>
        <Text style={{color: 'white'}}>Order</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default class ProductsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: null,
      searchText: '',
      filteredProducts: [],
      products: [],
      isModalVisible: false,
    };
  }

  orderProduct(id) {
    http.post("/product/order/" + id).catch((err) => console.log(err));
  }

  renderItem = ({item}) => {
    return (
      <Item
        item={item}
        onPress={() => {
          this.setState({selectedId: item.id});
          this.orderProduct(item.id);
          alert("Product ordered.");
        }}
      />
    );
  };

  setProducts(context) {
    http
      .get("/product/onStore")
      .then((response) => response.data)
      .then((data) => context.setState({products: data}))
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.setProducts(this);
    this.interval = setInterval(
      function (self) {
        self.setProducts(self);
      },
      5000,
      this
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  search = (searchText) => {
    this.setState({searchText: searchText});

    let filteredData = this.state.products.filter(function (item) {
      return item.name.substring(0, searchText.length).toLowerCase() === searchText.toLowerCase()
    });

    this.setState({filteredProducts: filteredData});
  };

  render() {
    return (
      <SafeAreaView style={globalStyles.mainContainer}>
        <View style={styles.navBar}>
          <View style={styles.searchBar}>
            <Ionicons name="ios-search" size={26}/>
            <TextInput placeholder="Search..." onChangeText={this.search} autoCorrect={false}
                       value={this.state.searchText}/>
          </View>
          <View style={{marginRight: 10}}>
            <Ionicons name="ios-funnel" size={32} color="black"/>
          </View>
          <View style={{marginRight: 10}}>
            <FontAwesome name="unsorted" size={32} color="black"/>
          </View>
        </View>

        <ChooseTableBar/>
        <FlatList
          data={this.state.searchText.length > 0 ? this.state.filteredProducts : this.state.products}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
          extraData={this.selectedId}
        />
      </SafeAreaView>
    );
  }
}
