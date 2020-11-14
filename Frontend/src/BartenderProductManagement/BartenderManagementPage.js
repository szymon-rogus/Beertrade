import React, { Component } from 'react';
import { http } from '../../Global.js'
import { FlatList, Text, View } from "react-native";
import { AntDesign, FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { globalStyles } from '../../GlobalStyles.js'
import { styles } from './BartenderManagementPageStyles.js'
import { listStyles } from "../../ListStyles";
import SwitchSelector from "react-native-switch-selector";
import Image from "react-native-web";

const EnabledListItem = ({item, disableFunc, actionIcon}) => (
  <View style={listStyles.item}>
    <View style={{
      flex: 0.25,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image style={styles.listImage} source={{uri: item.encodedPhoto}}/>
    </View>
    <View style={{
      flex: 0.625,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center'
    }}>
      <Text style={styles.listTitle}>{item.name}</Text>
      <Text style={styles.listAttributes}>{item.type} {item.alcoholPercentage}</Text>
    </View>
    <View style={{
      flex: 0.125,
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'center'
    }}>
      {actionIcon}
    </View>
  </View>
)

export default class BartenderSettingsPage extends Component {

  state = {
    enabledItems: [],
    disabledItems: [],
    chosenItems: 'enabled'
  }

  constructor(props) {
    super(props);
    this.getItems();
  }

  getItems = async () => {
    http.get('/product/manage/all').then((response) => {
      let fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
      }
      const enabled = fetchedList.filter(item => item.onStore);
      const disabled = fetchedList.filter(item => !item.onStore);
      this.setState({
        enabledItems: enabled,
        disabledItems: disabled,
        chosenItems: 'enabled'
      });
    }).catch(err => console.log(err));
  }

  sendRequestEnableItem = (id) => {
    http.post('/product/enable/' + id).then((response) => {
      let actualEnabledItems = this.state.enabledItems;
      items.push(response.data);
      let actualDisabledItems = this.state.disabledItems;
      actualDisabledItems = actualDisabledItems.filter(item => item.id !== id);
      this.setState({
        enabledItems: actualEnabledItems,
        disabledItems: actualDisabledItems
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  sendRequestDisableItem = (id) => {
    http.post('/product/disable/' + id).then((response) => {
      let actualDisabledItems = this.state.disabledItems;
      actualDisabledItems.push(response.data);
      let actualEnabledItems = this.state.enabledItems;
      actualEnabledItems = actualEnabledItems.filter(item => item.id !== id);
      this.setState({
        enabledItems: actualEnabledItems,
        disabledItems: actualDisabledItems
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  renderItem = ({item}) => {
    const actionIcon = item.onStore ?
      <AntDesign name="close" size={36} color="black" onPress={() => disableFunc(item.id)}/>
      : <Ionicons name="md-add" size={36} color="black" onPress={() => enableFunc(item.id)}/>
    return (
      <EnabledListItem item={item} actionIcon={actionIcon}/>
    );
  };

  render() {
    let visibleItems;
    if (this.state.chosenItems === 'enabled') {
      visibleItems = this.state.enabledItems;
    } else if (this.state.chosenItems === 'disabled') {
      visibleItems = this.state.disabledItems;
    } else {
      visibleItems = this.state.enabledItems;
      visibleItems.push(...this.state.disabledItems);
    }
    return (
      <View style={globalStyles.mainContainer}>
        <View style={styles.topBar}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Manage products</Text>
          </View>
          <View style={styles.navIconsBox}>
            <Ionicons name="md-settings" size={36} color="white" style={{margin: 4}}
                      onPress={() => this.props.navigation.navigate('bartenderSettings')}/>
            <FontAwesome5 name="th-list" size={36} color="white" style={{margin: 4}}
                          onPress={() => this.props.navigation.navigate('bartenderOrder')}/>
            <MaterialIcons name="account-circle" size={36} color="white" style={{margin: 4}}/>
          </View>
        </View>
        <SwitchSelector initial={0} onPress={value => this.setState({chosenItems: value})} textColor='black'
                        selectedColor='white' buttonColor='black' borderColor='black' hasPadding
                        options={[
                          {label: 'Enabled', value: 'enabled'},
                          {label: 'All', value: 'all'},
                          {label: 'Disabled', value: 'disabled'}
                        ]}
        />
        <FlatList
          data={visibleItems}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}