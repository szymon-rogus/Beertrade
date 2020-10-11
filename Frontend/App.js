import React from 'react';
import 'react-native-gesture-handler';
import LoginPage from './LoginPage/LoginPage.js'
import RegistrationPage from './RegistrationPage/RegistrationPage.js'
import { NavigationContainer } from '@react-navigation/native';
import stack from './Global.js'

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name='login' component={ LoginPage } options={ { headerShown: false } } />
          <stack.Screen name='registration' component={ RegistrationPage } options={ { headerShown: false } } />
        </stack.Navigator>
      </NavigationContainer>
  );
}
}
