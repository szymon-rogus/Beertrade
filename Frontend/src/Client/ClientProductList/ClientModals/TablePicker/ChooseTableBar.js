import React, {Component} from "react";
import {FlatList, Text, TouchableOpacity, View} from "react-native";
import Modal from "react-native-modal";

import {http, snackBar} from "../../../../../Global";
import {listStyles} from "../../../../../ListStyles";
import {chooseTablePopupStyles, tableStyles} from "./TableStyles";

const Item = ({item, onPress, style}) => (
    <TouchableOpacity onPress={onPress} style={style}>
      <Text style={listStyles.itemLabelText}> Table {item.tableNumber}</Text>
      <Text style={listStyles.itemValueText}>
        {" "}
        (Occupied {item.occupiedSeats} / {item.seats}){" "}
      </Text>
    </TouchableOpacity>
);

function BarText(props) {
  const table = props.table;
  if (!props.dataLoaded) {
    return <Text style={props.tableBar.title}>Loading...</Text>;
  }
  if (!props.sessionEnabled) {
    return (
        <Text style={props.tableBar.title}>
          Bar is closed for today. Come back tomorrow!
        </Text>
    );
  } else if (table != null && table.tableNumber != null) {
    return (
        <Text style={props.tableBar.title}>
          {" "}
          You sit at the table {table.tableNumber}. Click here to change the
          table.
        </Text>
    );
  }
  return (
      <Text style={props.tableBar.title}>
        {" "}
        Choose the table you want to order products to.{" "}
      </Text>
  );
}

export class ChooseTableBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      tables: [],
      selectedId: null,
      selectedTable: null,
      tableDataLoaded: false,
    };
  }

  componentDidMount() {
    this.setTables(this);
    this.setTable(this);
  }

  toggleModal = () => {
    this.setState({
      isModalVisible: !this.state.isModalVisible,
    });
    this.setTables(this);
  };

  unregisterPress() {
    this.setState({selectedId: null, selectedTable: null});
    this.unregister();
    this.toggleModal(this);
  }

  render() {
    const red = tableStyles("red", 14);
    const green = tableStyles("green", 14);
    let tableNow = tableStyles("grey", 14);
    if (this.props.productPageDataLoaded && this.state.tableDataLoaded) {
      tableNow =
          this.state.selectedTable !== null &&
          this.state.selectedTable.tableNumber !== null &&
          this.props.sessionEnabled
              ? green
              : red;
    }
    const chooseTablePopup = chooseTablePopupStyles();
    return (
        <View style={tableNow.topBar}>
          <TouchableOpacity
              onPress={() => this.toggleModal()}
              style={tableNow.titleBox}
              disabled={
                !this.props.sessionEnabled ||
                !this.props.productPageDataLoaded ||
                !this.state.tableDataLoaded
              }
          >
            <BarText
                tableBar={red}
                table={this.state.selectedTable}
                dataLoaded={
                  this.props.productPageDataLoaded && this.state.tableDataLoaded
                }
                sessionEnabled={this.props.sessionEnabled}
            />
          </TouchableOpacity>
          <Modal
              animationIn="slideInUp"
              animationOut="slideOutDown"
              onBackdropPress={() => this.toggleModal()}
              onSwipeComplete={() => this.toggleModal()}
              swipeDirection="right"
              isVisible={this.state.isModalVisible}
              style={chooseTablePopup.modalStyle}
          >
            <View style={chooseTablePopup.chooseTableLabel}>
              <Text style={{textAlign: "center"}}> Choose the table </Text>
            </View>
            <View style={chooseTablePopup.tableListBox}>
              <FlatList
                  data={this.state.tables}
                  renderItem={({item}) => (
                      <Item
                          item={item}
                          onPress={() => {
                            this.setState({selectedId: item.tableNumber});
                            this.selectTable(item.tableNumber).then((_) =>
                                this.setTable(this)
                            );
                            this.toggleModal();
                          }}
                          style={listStyles.item}
                      />
                  )}
                  keyExtractor={(item) => "Table" + item.tableNumber}
                  extraData={this.selectedId}
              />
            </View>
            <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  position: "absolute",
                  bottom: 0,
                }}
            >
              <View style={{flexDirection: "row"}}>
                <TouchableOpacity
                    style={chooseTablePopup.leaveTableButton}
                    onPress={() => this.unregisterPress()}
                >
                  <Text style={chooseTablePopup.text}>Leave table</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={chooseTablePopup.closeButton}
                    onPress={() => this.toggleModal()}
                >
                  <Text style={chooseTablePopup.text}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
    );
  }

  setTables() {
    http
        .get("/table/reservable/")
        .then((response) => response.data)
        .then((data) => this.setState({tables: data}))
        .catch((err) => console.log(err));
  }

  async selectTable(tableNumber) {
    return http
        .post("/table/reserve/" + tableNumber)
        .then((response) => {
          this.props.context.setState({
            isTableSet: true,
          });
        })
        .catch((error) => {
          alert("You already sit here.");
          console.log(error);
        });
  }

  setTable() {
    return http
        .get("/table/")
        .then((response) => {
          this.setState({
            selectedTable: response.data,
            tableDataLoaded: true,
          });
          let isTableSet = true;
          if (response.data.tableNumber === null) {
            isTableSet = false;
          }
          this.props.context.setState({
            isTableSet: isTableSet,
          });
        })
        .catch((err) => console.log(err));
  }

  unregister() {
    http
        .post("/table/unreserve/")
        .then((_) => {
          this.props.context.setState({
            isTableSet: false,
          });
        })
        .catch((err) => {
          alert("You already left the table.");
        });
  }
}
