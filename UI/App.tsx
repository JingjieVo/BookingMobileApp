import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Main from './screens/Main';


import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessibilityInfo, Animated, Easing, StyleSheet } from "react-native";
import { SetStateAction, useEffect, useRef, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "./screens/Login";
import Home from "./screens/Home";
export type ScreenNames = ["Login", "Main"] // type these manually
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;