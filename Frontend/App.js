import React from "react";
import "react-native-gesture-handler";
import LoginPage from "./src/Authentication/Login/LoginPage.js";
import RegistrationPage from "./src/Authentication/Registration/RegistrationPage.js";
import ForgottenPasswordPage from "./src/Authentication/ForgottenPassword/ForgottenPasswordPage.js";
import { NavigationContainer } from "@react-navigation/native";
import stack from "./Global.js";
import BartenderOrderPage from "./src/Bartender/BartenderOrder/BartenderOrderPage.js";
import BartenderManagementPage from "./src/Bartender/BartenderProductManagement/BartenderManagementPage.js";
import ProductDetailsPage from "./src/Client/ClientProductDetails/ProductDetailsPage";
import ClientOrderPage from "./src/Client/ClientOrderPage/ClientOrderPage";
import ProductsPage from "./src/Client/ClientProductList/ProductsPage";
import OwnerProductList from "./src/Owner/OwnerProductList.js";
import OwnerMainPage from "./src/Owner/MainPage/MainPage.js";
import StatisticsPage from "./src/Owner/StatisticsPage/StatisticsPage.js";
import OwnerAddProduct from "./src/Owner/AddProduct/OwnerAddProduct";
import OwnerEditProduct from "./src/Owner/EditProduct/OwnerEditProduct";

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
          <stack.Screen
            name="ownerMainPage"
            component={OwnerMainPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="ownerProductList"
            component={OwnerProductList}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="ownerProductStats"
            component={StatisticsPage}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="ownerAddProduct"
            component={OwnerAddProduct}
            options={{ headerShown: false }}
          />
          <stack.Screen
            name="ownerEditProduct"
            component={OwnerEditProduct}
            options={{ headerShown: false }}
          />
        </stack.Navigator>
      </NavigationContainer>
    );
  }
}
