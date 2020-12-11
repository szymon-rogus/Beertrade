import React, {Component} from "react";
import {Text, TouchableOpacity, View, SafeAreaView} from "react-native";
import Modal from "react-native-modal";
import {Ionicons} from "@expo/vector-icons";
import Slider from '@react-native-community/slider';
import DropDownPicker from 'react-native-dropdown-picker';

import {filterStyles} from "./FilterStyles";

const AttributeSlider = ({title, min, max, toFixed, minimumValue, maximumValue, step, onChangeMin, onChangeMax}) => (
    <View style={filterStyles.filterProperty}>
      <Text style={filterStyles.filterPropertyAttribute}>{title}</Text>
      <View style={filterStyles.filterPropertyRow}>
        <Text style={filterStyles.filterBarier}>Min:</Text>
        <View style={filterStyles.filterValue}>
          <Text>{min ? min.toFixed(toFixed) : min}</Text>
        </View>
        <Text style={{paddingTop: 10}}>{minimumValue}</Text>
        <Slider
            style={{width: 200, height: 40, flex: 0.5}}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            value={min}
            step={step}
            minimumTrackTintColor="red"
            maximumTrackTintColor="blue"
            onValueChange={onChangeMin}
        />
        <Text style={{paddingTop: 10}}>{maximumValue}</Text>
      </View>
      <View style={filterStyles.filterPropertyRow}>
        <Text style={filterStyles.filterBarier}>Max:</Text>
        <View style={filterStyles.filterValue}>
          <Text>{max ? max.toFixed(toFixed) : max}</Text>
        </View>
        <Text style={{paddingTop: 10}}>{minimumValue}</Text>
        <Slider
            style={{width: 200, height: 40, flex: 0.5}}
            minimumValue={minimumValue}
            maximumValue={maximumValue}
            value={max}
            step={step}
            minimumTrackTintColor="red"
            maximumTrackTintColor="blue"
            onValueChange={onChangeMax}
        />
        <Text style={{paddingTop: 10}}>{maximumValue}</Text>
      </View>
    </View>
);

const ActionButton = ({text, onPress}) => (
    <TouchableOpacity style={filterStyles.filterButton} onPress={onPress}>
      <Text style={{color: 'white'}}>{text}</Text>
    </TouchableOpacity>
);

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
      if (!distinctProductTypes.includes(type)) {
        distinctProductTypes.push({label: type, value: type})
      }
    })

    return distinctProductTypes
  }

  render() {
    return <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => this.state.isModalVisible = true}>
        <Ionicons
            style={filterStyles.iconStyle}
            name="ios-funnel"
            size={32}
            color="black"
        />
      </TouchableOpacity>
      <Modal
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          swipeDirection="right" isVisible={this.state.isModalVisible}
          style={filterStyles.modal}>
        <View style={filterStyles.container}>
          <View style={filterStyles.filterTitle}>
            <Text style={filterStyles.filterPropertyTitle}> Filter </Text>
          </View>
          <AttributeSlider title='Alcohol [%]' min={this.state.alcoholMin} max={this.state.alcoholMax} toFixed={1}
                           minimumValue={0} maximumValue={10} step={0.1}
                           onChangeMin={(value => this.setState({alcoholMin: value}))}
                           onChangeMax={(value => this.setState({alcoholMax: value}))}
          />
          <AttributeSlider title='IBU' min={this.state.ibuMin} max={this.state.ibuMax} toFixed={0}
                           minimumValue={5} maximumValue={80} step={1}
                           onChangeMin={(value => this.setState({ibuMin: value}))}
                           onChangeMax={(value => this.setState({ibuMax: value}))}
          />

          <View style={filterStyles.filterPropertyType}>
            <Text style={filterStyles.filterPropertyAttribute}> Beer style</Text>
            <SafeAreaView style={{flex: 1, marginTop: 10, width: '100%', height: '100%'}}>
              <DropDownPicker
                  items={this.getDistinctTypes(this.props.context.state.types)}
                  defaultValue={this.props.context.state.chosenTypes ? this.props.context.state.chosenTypes : this.props.context.state.types}
                  multiple={true}
                  style={filterStyles.dropdownList}
                  onChangeItem={types => this.setState({
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
            <ActionButton text='Clear filters' onPress={() => this.clear()}/>
            <ActionButton text='Cancel' onPress={() => this.toggleModal()}/>
            <ActionButton text='Filter' onPress={() => this.filterList()}/>
          </View>
        </View>
      </Modal>
    </View>
  }
}
