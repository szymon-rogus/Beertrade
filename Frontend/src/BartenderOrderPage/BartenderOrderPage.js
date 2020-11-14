import React, { Component } from 'react';
import { http } from '../../Global.js'
import { View, Text, FlatList } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { globalStyles } from '../../GlobalStyles.js'
import { styles } from './BartenderOrderPageStyles.js'
import { listStyles } from "../../ListStyles";
import * as Progress from 'react-native-progress';

const OrderItem = ({item, executeFunc, cancelFunc, shadowLayer}) => (

  <View style={listStyles.item}>
    {shadowLayer}
    <View style={{
      flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-start',
      borderRightWidth: 1,
      borderRightColor: 'black'
    }}>
      <View style={listStyles.attributeView}>
        <Text style={listStyles.itemLabelText}>Name:</Text>
        <Text style={{fontSize: 14, color: 'black', marginLeft: 40}}>{item.beerName}</Text>
      </View>
      <View style={listStyles.attributeView}>
        <Text style={listStyles.itemLabelText}>Amount:</Text>
        <Text style={{fontSize: 14, color: 'black', marginLeft: 27}}>{item.amount}</Text>
      </View>
      <View style={listStyles.attributeView}>
        <Text style={listStyles.itemLabelText}>Table:</Text>
        <Text style={{fontSize: 14, color: 'black', marginLeft: 42}}>{item.tableNumber}</Text>
      </View>
      <View style={listStyles.attributeView}>
        <Text style={listStyles.itemLabelText}>User:</Text>
        <Text style={{fontSize: 14, color: 'black', marginLeft: 48}}>{item.userLogin}</Text>
      </View>
    </View>
    <View style={{
      flex: 0.4,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end'
    }}>
      <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: 'black'}}>{item.orderViewId}</Text>
      </View>
      <View style={{flex: 0.6, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
        <AntDesign name="check" size={40} color="black" style={{marginRight: 10}} onPress={() => executeFunc(item.id)}/>
        <AntDesign name="close" size={40} color="black" style={{marginRight: 10}} onPress={() => cancelFunc(item.id)}/>
      </View>
      <View style={{flex: 0.2, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text style={{fontSize: 16, color: 'black'}}>{item.timeOrdered}</Text>
      </View>
    </View>
  </View>
)

export default class BartenderOrderPage extends Component {

  state = {
    items: [],
    maxOrders: 20,
    waiting: 0,
    done: 0,
    cancelled: 0,
    lastOrderPresent: false,
    lastOrder: null,
    lastOrderExecuted: false
  }

  constructor(props) {
    super(props);
    this.updateItems();
    this.updateStatistics();
  }

  updateItems = async () => {
    http.get('/order/waiting').then((response) => {
      let fetchedList = [];
      for (let order of response.data) {
        fetchedList.push(order);
      }
      this.setState({
        items: fetchedList,
        waiting: fetchedList.length
      });
      if (fetchedList.length > this.state.maxOrders) {
        this.setState({
          maxOrders: fetchedList.length
        });
      }
    }).catch(err => console.log(err));
  }

  updateStatistics = async () => {
    http.get('/order/bartenderStats').then((response) => {
      this.setState({
        done: response.data.done,
        cancelled: response.data.cancelled
      });
    });
  }

  sendRequestExecuteItem = (id) => {
    http.post('/order/execute/' + id).then(() => {
      let actualItems = this.state.items;
      if (this.state.lastOrderPresent) {
        actualItems = actualItems.filter(item => item.id !== this.state.lastOrder.id);
      } else {
        this.setState({
          lastOrderPresent: true
        });
      }
      const newLastOrder = actualItems.filter(item => item.id == id)[0];
      actualItems = actualItems.filter(item => item.id !== newLastOrder.id);
      acutalItems.unshift(newLastOrder);
      this.setState({
        items: acutalItems,
        done: this.state.done + 1,
        waiting: this.state.waiting - 1,
        lastOrder: newLastOrder,
        lastOrderExecuted: true
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  sendRequestCancelItem = (id) => {
    http.post('/order/cancel/' + id).then(() => {
      let actualItems = this.state.items;
      if (this.state.lastOrderPresent) {
        actualItems = actualItems.filter(item => item.id !== this.state.lastOrder.id);
      } else {
        this.setState({
          lastOrderPresent: true
        });
      }
      const newLastOrder = actualItems.filter(item => item.id === id)[0];
      actualItems = actualItems.filter(item => item.id !== newLastOrder.id);
      acutalItems.unshift(newLastOrder);
      this.setState({
        items: acutalItems,
        cancelled: this.state.cancelled + 1,
        waiting: this.state.waiting - 1,
        lastOrder: newLastOrder,
        lastOrderExecuted: false
      });
    }).catch((err) => {
      console.log(err);
    });
  }

  restoreItem = () => {
    http.post('/order/restore/' + id).then(() => {
      if (this.state.lastOrderExecuted) {
        this.setState({
          done: this.state.done - 1
        });
      } else {
        this.setState({
          cancelled: this.state.cancelled - 1
        });
      }
      if (this.state.waiting + 1 > this.state.maxOrders) {
        this.setState({
          maxOrders: this.state.maxOrders + 1
        })
      }
      this.setState({
        lastOrderPresent: false,
        lastOrder: null,
        waiting: this.state.waiting + 1
      })
    }).catch((err) => {
      console.log(err);
    });
  }

  renderItem = ({item}) => {
    var shadowLayerValue = this.state.lastOrderPresent && item === this.state.lastOrder ?
      <View style={styles.lastOrderLayer}>
        <Ionicons name="md-refresh" size={40} color="black" onPress={this.restoreItem}/>
      </View> : null;
    return (
      <OrderItem item={item} executeFunc={this.sendRequestExecuteItem} cancelFunc={this.sendRequestCancelItem}
                 shadowLayer={shadowLayerValue}/>
    );
  };

  updateInterval = setInterval(async () => {
    this.updateItems();
  }, 5000)

  componentDidMount() {
    try {
      this.updateInterval;
    } catch (e) {
      console.log(e);
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    return (
      <View style={globalStyles.mainContainer}>
        <View style={styles.topBar}>
          <View style={styles.titleBox}>
            <Text style={styles.title}>Orders</Text>
          </View>
          <View style={styles.navIconsBox}>
            <Ionicons name="md-settings" size={36} color="white" style={{margin: 4}}
                      onPress={() => this.props.navigation.navigate('bartenderSettings')}/>
            <MaterialCommunityIcons name="cup" size={36} color="white" style={{margin: 4}}
                                    onPress={() => this.props.navigation.navigate('bartenderManage')}/>
            <MaterialIcons name="account-circle" size={36} color="white" style={{margin: 4}}/>
          </View>
        </View>
        <FlatList
          data={this.state.items}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.id}
        />
        <View style={styles.bartenderStatisticsBox}>
          <Progress.Bar progress={this.state.done / this.state.maxOrders} width={320} height={10} animated={true}/>
          <View style={styles.orderStatsInsideBox}>
            <Text style={styles.inQueueText}>In queue</Text>
            <Text style={{fontSize: 16, color: 'black', paddingLeft: 50}}>{this.state.waiting}</Text>
          </View>
          <View style={styles.orderStatsInsideBox}>
            <Text style={styles.statsText}>Done</Text>
            <Text style={{fontSize: 16, color: 'black', paddingLeft: 72}}>{this.state.done}</Text>
          </View>
          <View style={styles.orderStatsInsideBox}>
            <Text style={styles.statsText}>Cancelled</Text>
            <Text style={{fontSize: 16, color: 'black', paddingLeft: 40}}>{this.state.cancelled}</Text>
          </View>
        </View>
      </View>
    )
  }

}