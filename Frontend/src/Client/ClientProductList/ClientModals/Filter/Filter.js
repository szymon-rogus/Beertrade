import React, {Component} from "react";
import Modal from "react-native-modal";
import {ScrollView, Text, TouchableOpacity, View} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {filterStyles} from "./FilterStyles";
import Slider from '@react-native-community/slider';

export class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      alcoholMin: this.props.context.state.alcoholMin,
      alcoholMax: this.props.context.state.alcoholMax,
      ibuMin: this.props.context.state.ibuMin,
      ibuMax: this.props.context.state.ibuMax,
    };
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  clear = () => {
    this.setState({
      alcoholMin: 0,
      alcoholMax: 10,
      ibuMin: 5,
      ibuMax: 80,
    });
    this.props.context.setState({
      alcoholMin: 0,
      alcoholMax: 10,
      ibuMin: 5,
      ibuMax: 80,
    });
    this.toggleModal();
  }

  filterList = () => {
    this.props.context.setState({
      alcoholMin: this.state.alcoholMin.toFixed(1),
      alcoholMax: this.state.alcoholMax.toFixed(1),
      ibuMin: this.state.ibuMin.toFixed(0),
      ibuMax: this.state.ibuMax.toFixed(0),
    });
    let products = this.props.context.state.products
    let productsFiltered = this.props.context.state.filteredProducts

    products = this.props.context.filterBy(products)
    productsFiltered = this.props.context.filterBy(productsFiltered)

    this.props.context.setState({products: products, filteredProducts: productsFiltered})
    this.toggleModal()
  }

  renderT = (products) => {
    let distinctProductTypes = []
    products.forEach((item, i) => {
      if(!distinctProductTypes.includes(item.type)) {
        distinctProductTypes.push(item.type)
      }
    })

    return distinctProductTypes
        .map((itemType, i) => {
      return <Text style={{paddingLeft: 10, paddingTop: 5, paddingBottom: 5, backgroundColor: '#DCDCDC'}} key={i}>{itemType}</Text>;
    });
  }

  render() {
    return <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => this.state.isModalVisible = true}>
        <Ionicons
            style={{ marginRight: 10, marginLeft: 10, marginTop: 15 }}
            name="ios-funnel"
            size={32}
            color="black"
        />
      </TouchableOpacity>
      <Modal
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          swipeDirection="right" isVisible={this.state.isModalVisible}
          style={{backgroundColor: 'white', marginTop: 60, marginBottom: 80}}>
        <View style={filterStyles.container}>
          <View style={filterStyles.filterTitle}>
            <Text style={filterStyles.filterPropertyTitle}> Filter </Text>
          </View>
          <View style={filterStyles.filterProperty}>
            <Text style={filterStyles.filterPropertyAttribute}> Alcohol [%]</Text>
            <View style={filterStyles.filterPropertyRow}>
              <Text style={filterStyles.filterBarier}>Min:</Text>
              <View style={filterStyles.filterValue}>
                <Text>{this.state.alcoholMin.toFixed(1)}</Text>
              </View>
              <Text style={{paddingTop: 10}}>0</Text>
              <Slider
                  style={{width: 200, height: 40, flex: 0.5}}
                  minimumValue={0}
                  maximumValue={10}
                  value={this.state.alcoholMin}
                  step={0.1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="blue"
                  onValueChange={(value) => this.setState({alcoholMin: value})}
              />
              <Text style={{paddingTop: 10}}>10</Text>
            </View>
            <View style={filterStyles.filterPropertyRow}>
              <Text style={filterStyles.filterBarier}>Max:</Text>
              <View style={filterStyles.filterValue}>
                <Text>{this.state.alcoholMax.toFixed(1)}</Text>
              </View>
              <Text style={{paddingTop: 10}}>0</Text>
              <Slider
                  style={{width: 200, height: 40, flex: 0.5}}
                  minimumValue={0}
                  maximumValue={10}
                  value={this.state.alcoholMax}
                  step={0.1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="blue"
                  onValueChange={(value) => this.setState({alcoholMax: value})}
              />
              <Text style={{paddingTop: 10}}>10</Text>
            </View>
          </View>

          <View style={filterStyles.filterProperty}>
            <Text style={filterStyles.filterPropertyAttribute}> IBU </Text>
            <View style={filterStyles.filterPropertyRow}>
              <Text style={filterStyles.filterBarier}>Min:</Text>
              <View style={filterStyles.filterValue}>
                <Text>{this.state.ibuMin.toFixed(0)}</Text>
              </View>
              <Text style={{paddingTop: 10}}>5</Text>
              <Slider
                  style={{width: 200, height: 40, flex: 0.5}}
                  minimumValue={5}
                  maximumValue={80}
                  value={this.state.ibuMin}
                  step={1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="blue"
                  onValueChange={(value) => this.setState({ibuMin: value})}
              />
              <Text style={{paddingTop: 10}}>80</Text>
            </View>
            <View style={filterStyles.filterPropertyRow}>
              <Text style={filterStyles.filterBarier}>Max:</Text>
              <View style={filterStyles.filterValue}>
                <Text>{this.state.ibuMax.toFixed(0)}</Text>
              </View>
              <Text style={{paddingTop: 10}}>5</Text>
              <Slider
                  style={{width: 200, height: 40, flex: 0.5}}
                  minimumValue={5}
                  maximumValue={80}
                  value={this.state.ibuMax}
                  step={1}
                  minimumTrackTintColor="red"
                  maximumTrackTintColor="blue"
                  onValueChange={(value) => this.setState({ibuMax: value})}
              />
              <Text style={{paddingTop: 10}}>80</Text>
            </View>
          </View>

          <View style={filterStyles.filterProperty}>
            <Text style={filterStyles.filterPropertyAttribute}> Beer style</Text>
            <View style={{flex: 1, marginTop: 10, width: '100%'}}>
              <ScrollView style={{width: "80%"}}>
                {this.renderT(this.props.context.state.products)}
              </ScrollView>
            </View>
          </View>

          <View style={filterStyles.filterButtonContainer}>
            <TouchableOpacity style={filterStyles.filterButton} onPress={() => this.clear()}>
              <Text style={{color: 'white'}}>Clear filters</Text>
            </TouchableOpacity>
            <TouchableOpacity style={filterStyles.filterButton} onPress={() => this.toggleModal()}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={filterStyles.filterButton} onPress={() => this.filterList()}>
              <Text style={{color: 'white'}}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  }
}
