import React from "react";
import "react-native-gesture-handler";
import LoginPage from "./src/Login/LoginPage.js";
import RegistrationPage from "./src/Registration/RegistrationPage.js";
import ForgottenPasswordPage from "./src/ForgottenPassword/ForgottenPasswordPage.js";
import ProductsPage from "./src/Prices/ProductsPage";
import { NavigationContainer } from "@react-navigation/native";
import stack from "./Global.js";
import BartenderOrderPage from "./src/BartenderOrder/BartenderOrderPage.js";
import BartenderManagementPage from "./src/BartenderProductManagement/BartenderManagementPage.js";
import BartenderSettingsPage from "./src/BartenderSettings/BartenderSettingsPage.js";

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen
            name="login"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="registration"
            component={RegistrationPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="forgottenpass"
            component={ForgottenPasswordPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="prices"
            component={ProductsPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="bartenderOrder"
            component={BartenderOrderPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="bartenderSettings"
            component={BartenderSettingsPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="bartenderManage"
            component={BartenderManagementPage}
            options={{ headerShown: false }}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}
