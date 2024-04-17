import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from './Search';
import Searchscreen from './Home';
import MyTicketsscreen from './MyTickets';
import Profilescreen from './Profile';

import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessibilityInfo, Animated, Easing, StyleSheet } from "react-native";
import { SetStateAction, useEffect, useRef, useState } from "react";
const Tab = createBottomTabNavigator();

function Main() {
  const animatedValue = useRef(new Animated.Value(30)).current;
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 45,
      duration: 100,
      useNativeDriver: false,
    }).start();
  }, [animatedValue])
  return (
      <Tab.Navigator
        screenOptions= {() => ({
          headerShown: false,
          tabBarStyle: {
            height: 90,
            position: 'absolute',
            //bottom: 16,
            //right: 16,
            //left: 16,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          },
        })}
        
        >
        <Tab.Screen name="Home" component={Homescreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <Animated.View>
                <Icon name="home"  color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab } />
              </Animated.View>  
            ) 
          }}
        />
        <Tab.Screen name="Search" component={Searchscreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'SearchTrip',
            tabBarIcon: ({color, focused}) => (
              <Icon name="search" color="lightgray" style={[focused ? styles.focusedTab : styles.unfocusedTab]} />
            ) 
          }}
        />
        <Tab.Screen name="MyTickets" component={MyTicketsscreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'My Tickets',
            tabBarIcon: ({color, focused}) => (
              <Icon name="ticket" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab} />
            ) 
          }}
        />
        <Tab.Screen name="Profile" component={Profilescreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'Me',
            tabBarIcon: ({color, focused}) => (
                <Icon  name="user" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab } />
            ) 
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    fontSize : 45,
    backgroundColor: '#56e865',
    color: 'white',
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 0,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2.5,
    elevation: 7,
  },
  unfocusedTab: {
    padding: 15,
    borderRadius: 10,
    fontSize : 30,
  }
})

export default Main;