import React from "react";
import "react-native-gesture-handler";
import LoginPage from "./src/Login/LoginPage.js";
import RegistrationPage from "./src/Registration/RegistrationPage.js";
import ForgottenPasswordPage from "./src/ForgottenPassword/ForgottenPasswordPage.js";
import { NavigationContainer } from "@react-navigation/native";
import stack from "./Global.js";
import BartenderOrderPage from "./src/BartenderOrder/BartenderOrderPage.js";
import BartenderManagementPage from "./src/BartenderProductManagement/BartenderManagementPage.js";
import ProductDetailsPage from "./src/Products/ProductDetailsPage";
import ClientOrderPage from "./src/ClientOrderPage/ClientOrderPage";
import ProductsPage from "./src/Products/ProductsPage";

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
            name="productList"
            component={ProductsPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="clientOrders"
            component={ClientOrderPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="productDetails"
            component={ProductDetailsPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="bartenderOrder"
            component={BartenderOrderPage}
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
