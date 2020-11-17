import axios from "axios";
import { createStackNavigator } from "@react-navigation/stack";
import { globalStyles } from "./GlobalStyles.js";
import React from "react";
import { View, Text } from "react-native";

export const http = axios.create({
  baseURL: "http://10.0.2.2:8080/",
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// uncomment below to see all requests:
// http.interceptors.request.use(request => {
//       console.log('Starting Request', JSON.stringify(request, null, 2))
//       return request
//   })

export default stack = createStackNavigator();

export const setAuthorizationToken = (token) => {
  http.defaults.headers.common["Authorization"] = "Bearer " + token;
};

export const TopBar = ({title, icons}) => (
  <View style={globalStyles.topBar}>
    <View style={globalStyles.titleBox}>
      <Text style={globalStyles.topBarTitle}>{title}</Text>
    </View>
    <View style={globalStyles.navIconsBox}>{icons}</View>
  </View>
);
