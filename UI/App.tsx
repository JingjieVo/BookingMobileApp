import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from './screens/Main';


import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, TurboModuleRegistry, View } from "react-native";
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
import EditProfile from "./screens/EditProfile";
import ResetPassword from "./screens/ResetPassword";
import PaymentSuccessful from "./screens/PaymentSuccessful";

import Page1 from "./screens/news/Page1";
import Page2 from "./screens/news/Page2";
import Page3 from "./screens/news/Page3";
import Page4 from "./screens/news/Page4"

import Tutorial from "./screens/tutorial/Tutorial"


import AdminMain from "./screens/admin/AdminMain";
import TripManagement from "./screens/admin/TripManagement";
import CoachManagement from "./screens/admin/CoachManagement";
import DriverManagement from "./screens/admin/DriverManagement";
import RevenueManagement from "./screens/admin/RevenueManagement";

import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import SplashScreen from "react-native-splash-screen";
export type ScreenNames = ["Login", "Register", "Main","SearchTicketResult", "BookTicket", "BookingConfirm", "PayForTicket", "EditProfile", "ResetPassword",
  "Page1", "Page2", "Page3", "Page4", "PaymentSuccessful", "AdminMain", "TripManagement", "CoachManagement", "DriverManagement", "RevenueManagement", "Tutorial"
 ] // type these manually
export type RootStackParamList = Record<ScreenNames[number], undefined>;
export type StackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
function App() : JSX.Element {
  useEffect(() => {
    // Hide the splash screen when the component is mounted
    //SplashScreen.hide();
  }, []);
  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props : any) => (
      <BaseToast
        {...props}
        style={{ width: '90%', borderLeftColor: '#56e865', height: 85, zIndex: 10 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 0 }}
        text1Style={{
          fontSize: 18,
          fontWeight: '900',
          color: '#56e865'
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: '400',
          color: 'gray'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props : any) => (
      <ErrorToast
        {...props}
        style={{ width: '90%', borderLeftColor: 'red', height: 85, zIndex: 10 }}
        contentContainerStyle={{ paddingHorizontal: 15, paddingVertical: 0 }}
        text1Style={{
          fontSize: 18,
          fontWeight: '900',
          color: 'red'
        }}
        text2Style={{
          fontSize: 12,
          fontWeight: '400',
          color: 'gray'
        }}
      />
    ),

    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props } : any) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
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
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="SearchTicketResult" component={SearchTicketResult} />
        <Stack.Screen name="BookTicket" component={BookTicket} />
        <Stack.Screen name="BookingConfirm" component={BookingConfirm} />
        <Stack.Screen name="PayForTicket" component={PayForTicket} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Page1" component={Page1} />
        <Stack.Screen name="Page2" component={Page2} />
        <Stack.Screen name="Page3" component={Page3} />
        <Stack.Screen name="Page4" component={Page4} />
        <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful} />
        <Stack.Screen name="AdminMain" component={AdminMain} />
        <Stack.Screen name="TripManagement" component={TripManagement} />
        <Stack.Screen name="CoachManagement" component={CoachManagement} />
        <Stack.Screen name="DriverManagement" component={DriverManagement} />
        <Stack.Screen name="RevenueManagement" component={RevenueManagement} />
        <Stack.Screen name="Tutorial" component={Tutorial} />


        
      </Stack.Navigator>
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}


export default App;