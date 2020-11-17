import React, {Component} from "react";
import Modal from "react-native-modal";
import {Text, TouchableOpacity, View} from "react-native";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import {sorterStyles} from "./SorterStyles";
import RNPickerSelect from 'react-native-picker-select';
import SwitchSelector from "react-native-switch-selector";

export class Sorter extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      sortBy: 'Name',
    };
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
  }

  sortList = (value) => {
    this.props.context.setState({sortBy : value});

    let products = this.props.context.state.products
    let productsFiltered = this.props.context.state.filteredProducts

    this.props.context.sortThisShit(products, value)
    this.props.context.sortThisShit(productsFiltered, value)

    this.props.context.setState({products: products, filteredProducts: productsFiltered})

    console.log(products)

  }

  render() {
    return <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => this.state.isModalVisible = true}>
        <FontAwesome
            name="unsorted"
            size={32}
            color="black"
            style={{ marginTop: 15 }}
        />
      </TouchableOpacity>
      <Modal
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          swipeDirection="right" isVisible={this.state.isModalVisible}
          style={{backgroundColor: 'white', marginTop: 160, marginBottom: 260}}>
        <View style={sorterStyles.container}>
          <View style={sorterStyles.sorterProperty}>
            <Text style={sorterStyles.sorterPropertyTitle}> Sort by </Text>
          </View>
          <View style={sorterStyles.picker}>
            <RNPickerSelect
                onValueChange={(value) => this.setState({sortBy : value})}
                value={this.props.context.state.sortBy}
                items={[
                  { label: 'Name', value: 'Name' },
                  { label: 'IBU', value: 'IBU' },
                  { label: 'Alcohol', value: 'Alcohol' },
                ]}
            />
          </View>
          <View style={sorterStyles.selector}>
            <SwitchSelector height={30}
                            style={sorterStyles.sortingSwitchSelector}
                            initial={this.props.context.state.sortAsc ? 0 : 1}
                            onPress={(value) => this.props.context.setState({sortAsc: value === "Ascending"})}
                            textColor="black"
                            selectedColor="white"
                            buttonColor="black"
                            borderColor="black"
                            hasPadding
                            options={[
                              { label: "Ascending", value: "Ascending" },
                              { label: "Descending", value: "Descending" },
                            ]}
            />
          </View>
          <View style={sorterStyles.filterButtonContainer}>
            <TouchableOpacity style={sorterStyles.sorterButton} onPress={() => this.toggleModal()}>
              <Text style={{color: 'white'}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={sorterStyles.sorterButton} onPress={() => this.sortList(this.state.sortBy)}>
              <Text style={{color: 'white'}}>Sort</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  }

}