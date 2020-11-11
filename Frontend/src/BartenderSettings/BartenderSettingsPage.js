import React, { Component }  from 'react';
import { http } from '../../Global.js'
import { View, Text, FlatList } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { globalStyles } from '../../GlobalStyles.js'
import { styles } from './BartenderSettingsPageStyles.js'
import { FontAwesome5 } from '@expo/vector-icons'; 
import SwitchSelector from "react-native-switch-selector";

export default class BartenderManagementPage extends Component {
    
  state = {
    sessionState: None,
    isSessionDisabled: None
  }

  constructor(props) {
    super(props);
    this.getSessionState();
  }

  getSessionState = async () => {
    http.get('/product/manage/all').then((response) => {
      fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
      }
      enabled = fetchedList.filter(item => item.onStore);
      disabled = fetchedList.filter(item => !item.onStore);
      this.setState({
        enabledItems: enabled,
        disabledItems: disabled,
        chosenItems: 'enabled'
      });
    }).catch(err => console.log(err));
  }

  changeSessionState = async () => {
  }

  clearSession = async () => {

  }

  render() {
    return (
      <View style={ globalStyles.mainContainer }>
        <View style={ styles.topBar }>
          <View style={ styles.titleBox }>
            <Text style={ styles.title }>Settings</Text>
          </View>
          <View style={ styles.navIconsBox }>
            <FontAwesome5 name="th-list" size={ 36 } color="white" style={{margin: 4}} onPress={() => this.props.navigation.navigate('bartenderOrder')} />
            <MaterialCommunityIcons name="cup" size={ 36 } color="white" style={{margin: 4}} onPress={() => this.props.navigation.navigate('bartenderManage')} />
            <MaterialIcons name="account-circle" size={ 36 } color="white" style={{margin: 4}} />
          </View>
        </View>
        <Text>Session</Text>
        <SwitchSelector initial={ this.state.sessionState } onPress={ value => changeSessionState(value) } textColor='black'
          selectedColor='white' buttonColor='black' borderColor='black' hasPadding
          options={[
            { label: 'Enabled', value: 'enabled' },
            { label: 'Disabled', value: 'disabled' }
          ]}
        />
        <TouchableOpacity onPress={ this.clearSession } style={styles.clearSessionButton} disabled={ !this.state.isSessionDisabled }>
          <Text style={{color: 'blue'}}>Clear session</Text>
          </TouchableOpacity>
      </View>
    )
  }

}