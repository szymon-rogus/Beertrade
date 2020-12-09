import React, {Component} from "react";
import Modal from "react-native-modal";
import {Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {filterStyles} from "./FilterStyles";
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

export class Filter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      alcoholMin: this.props.context.state.alcoholMin,
      alcoholMax: this.props.context.state.alcoholMax,
      ibuMin: this.props.context.state.ibuMin,
      ibuMax: this.props.context.state.ibuMax,
      types: this.props.context.state.types,
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
      types: this.props.context.state.types,
    });
    this.props.context.setState({
      alcoholMin: 0,
      alcoholMax: 10,
      ibuMin: 5,
      ibuMax: 80,
      chosenTypes: this.props.context.state.types,
    });
    this.toggleModal();
  }

  filterList = () => {
    this.props.context.setState({
      alcoholMin: this.state.alcoholMin,
      alcoholMax: this.state.alcoholMax,
      ibuMin: this.state.ibuMin,
      ibuMax: this.state.ibuMax,
      chosenTypes: this.state.types
    });
    let products = this.props.context.state.products
    let productsFiltered = this.props.context.state.filteredProducts

    products = this.props.context.filterBy(products)
    productsFiltered = this.props.context.filterBy(productsFiltered)

    this.props.context.setState({products: products, filteredProducts: productsFiltered})
    this.toggleModal()
  }

  getDistinctTypes = (types) => {
    let distinctProductTypes = []
    types.forEach((type, i) => {
      if(!distinctProductTypes.includes(type)) {
        distinctProductTypes.push({label: type, value: type})
      }
    })

    return distinctProductTypes
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
                <Text>{this.state.alcoholMin ? this.state.alcoholMin.toFixed(1) : this.state.alcoholMin}</Text>
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
                <Text>{this.state.alcoholMax ? this.state.alcoholMax.toFixed(1) : this.state.alcoholMax}</Text>
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
                <Text>{this.state.ibuMin ? this.state.ibuMin.toFixed(0) : this.state.ibuMin}</Text>
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
                <Text>{this.state.ibuMax ? this.state.ibuMax.toFixed(0) : this.state.ibuMax}</Text>
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

          <View style={filterStyles.filterPropertyType}>
            <Text style={filterStyles.filterPropertyAttribute}> Beer style</Text>
            <SafeAreaView style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}>
                <DropDownPicker
                    items={this.getDistinctTypes(this.props.context.state.types)}
                    defaultValue={this.props.context.state.chosenTypes ? this.props.context.state.chosenTypes : this.props.context.state.types}
                    multiple={true}
                    style={filterStyles.dropdownList}
                    onChangeItem={ types => this.setState({
                      types: types
                    })}
                    activeItemStyle={{
                      backgroundColor: '#1E90FF',
                    }}
                    isVisible={true}
                />
            </SafeAreaView>
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
