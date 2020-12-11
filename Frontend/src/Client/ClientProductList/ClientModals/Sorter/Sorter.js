import React, {Component} from "react";
import {Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";
import {FontAwesome} from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import SwitchSelector from "react-native-switch-selector";

import {sorterStyles} from "./SorterStyles";

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
      isModalVisible: !this.state.isModalVisible,
      sortBy: this.props.context.state.sortBy
    })
  }

  sortList = (value) => {
    this.props.context.setState({sortBy: value});

    let products = this.props.context.state.products
    let productsFiltered = this.props.context.state.filteredProducts

    this.props.context.sortByChosenAttr(products, value)
    this.props.context.sortByChosenAttr(productsFiltered, value)

    this.props.context.setState({products: products, filteredProducts: productsFiltered})
    this.toggleModal()
  }

  render() {
    return <View style={{marginRight: 10}}>
      <TouchableOpacity onPress={() => this.state.isModalVisible = true}>
        <FontAwesome
            name="unsorted"
            size={32}
            color="black"
            style={{marginTop: 15}}
        />
      </TouchableOpacity>
      <Modal
          onBackdropPress={() => this.toggleModal()}
          onSwipeComplete={() => this.toggleModal()}
          swipeDirection="right" isVisible={this.state.isModalVisible}
          style={{backgroundColor: 'white', marginTop: 160, marginBottom: 160}}>
        <View style={sorterStyles.container}>
          <View style={sorterStyles.sorterProperty}>
            <Text style={sorterStyles.sorterPropertyTitle}> Sort by </Text>
          </View>
          <View style={sorterStyles.picker}>
            <DropDownPicker
                items={[
                  {label: 'Name', value: 'Name'},
                  {label: 'IBU', value: 'IBU'},
                  {label: 'Alcohol', value: 'Alcohol'},
                ]}
                defaultValue={this.state.sortBy}
                onChangeItem={item => this.setState({
                  sortBy: item.value
                })}
                style={sorterStyles.dropdownList}
                dropDownStyle={{backgroundColor: 'white', width: 200}}
                activeItemStyle={{
                  backgroundColor: '#D3D3D3',
                }}
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
                              {label: "Ascending", value: "Ascending"},
                              {label: "Descending", value: "Descending"},
                            ]}
            />
          </View>
          <View style={sorterStyles.sorterButtonContainer}>
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
