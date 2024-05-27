import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from './screens/Main';


import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessibilityInfo, Animated, Easing, StyleSheet } from "react-native";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
import SearchTicketResult from "./screens/SearchTicketResult";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import BookTicket from "./screens/BookTicket";
import BookingConfirm from "./screens/BookingConfirm";
import PayForTicket from "./screens/PayForTicket";

export type ScreenNames = ["Login", "Register", "Main","SearchTicketResult", "BookTicket", "BookingConfirm", "PayForTicket" ] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}
      >
        {/* */}
        <Stack.Screen name="Main" component={Main} />
        {/* */}
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SearchTicketResult" component={SearchTicketResult} />
        <Stack.Screen name="BookTicket" component={BookTicket} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
        <Stack.Screen name="PayForTicket" component={PayForTicket} />




      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;