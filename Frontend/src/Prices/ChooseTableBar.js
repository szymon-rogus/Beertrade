import { FlatList, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import React, { Component } from "react";
import { chooseTablePopupStyles, tableStyles } from "./TableStyles";
import { http } from "../../Global";
import { listStyles } from "../../ListStyles";
import { globalStyles } from "../../GlobalStyles";

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={style}>
    <Text style={listStyles.itemLabelText}> Table {item.tableNumber}</Text>
    <Text style={listStyles.itemValueText}> (Occupied {item.occupiedSeats} / {item.seats}) </Text>
  </TouchableOpacity>
);

function BarText(props) {
  const table = props.table
  if (table != null)
    return (<Text style={props.tableBar.title}> You sit at the table {table.tableNumber}. Click here to change the
      table.</Text>);
  else
    return (<Text style={props.tableBar.title}> Choose the table you want to order products to. </Text>);
}

export class ChooseTableBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      tables: [],
      selectedId: null,
      selectedTable: null
    };
  }

  componentDidMount() {
    this.setTables(this)
    this.setTable(this)
  }


  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible
    })
    this.setTables(this)
  }

  unregisterPress() {
    this.setState({selectedId: null, selectedTable: null})
    this.unregister()
    this.toggleModal(this)
  }

  render() {
    const red = tableStyles("red", 14)
    const green = tableStyles("green", 14)
    const tableNow = this.state.selectedTable != null ? green : red;
    const chooseTablePopup = chooseTablePopupStyles()
    return <View style={tableNow.topBar}>
      <TouchableOpacity onPress={() => this.toggleModal()}
                        style={tableNow.titleBox}>
        <BarText tableBar={red} table={this.state.selectedTable}/>
      </TouchableOpacity>
      <Modal animationIn="slideInUp" animationOut="slideOutDown" onBackdropPress={() => this.toggleModal()}
             onSwipeComplete={() => this.toggleModal()} swipeDirection="right" isVisible={this.state.isModalVisible}
             style={{backgroundColor: 'white'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text style={{textAlign: 'center'}}> Choose the table </Text>
        </View>
        <FlatList
          data={this.state.tables}
          renderItem={({item, index, separators}) => (
            <Item
              item={item}
              onPress={() => {
                this.setState({selectedId: item.tableNumber})
                this.selectTable(item.tableNumber).then(_ => this.setTable(this))
                this.toggleModal()
                alert("You've chosen table " + item.tableNumber)
              }}
              style={listStyles.item}
            />
          )}
          keyExtractor={(item) => "Table" + item.tableNumber}
          extraData={this.selectedId}
        />
        <View style={{flex: 1, justifyContent: 'center', position: 'absolute', bottom: 0}}>
          <View style={{flexDirection: 'row',}}>
            <TouchableOpacity style={chooseTablePopup.leaveTableButton} onPress={() => this.unregisterPress()}>
              <Text style={chooseTablePopup.text}>Leave table</Text>
            </TouchableOpacity>
            <TouchableOpacity style={chooseTablePopup.closeButton} onPress={() => this.toggleModal()}>
              <Text style={chooseTablePopup.text}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  }

  setTables() {
    http.get('/table/reservable/')
      .then(response => response.data)
      .then(data => this.setState({tables: data}))
      .catch(err => console.log(err));
  }

  async selectTable(tableNumber) {
    return http.post('/table/reserve/' + tableNumber)
      .then(result => console.log(result.status))
      .catch(_ => alert("You already sit here."));
  }

  setTable() {
    return http.get('/table/')
      .then(response => this.setState({selectedTable: response.data}))
      .catch(err => console.log(err));
  }

  async unregister() {
    http.post('/table/unreserve/').catch(err => {
      console.log(err)
      alert("You already left the table.")
    }).then(_ => this.setTable(this))
  }
}