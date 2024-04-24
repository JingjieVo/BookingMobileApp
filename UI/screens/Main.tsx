import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from './Home';
import Searchscreen from './Search';
import MyTicketsscreen from './MyTickets';
import Profilescreen from './Profile';

import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View } from "react-native";
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
              <View>
                <Icon name="home" color="lightgray" style={[focused ? styles.focusedTab : styles.unfocusedTab]} />
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>News</Text>
              </View>
            ) 
          }}
        />
        <Tab.Screen name="Search" component={Searchscreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'SearchTrip',
            tabBarIcon: ({color, focused}) => (
              <View>
                <Icon name="search" color="lightgray" style={[focused ? styles.focusedTab : styles.unfocusedTab]} />
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Trips</Text>

              </View>
            ) 
          }}
        />
        <Tab.Screen name="MyTickets" component={MyTicketsscreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'My Tickets',
            tabBarIcon: ({color, focused}) => (
              <View>
                <Icon name="ticket" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab} />
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>My tickets</Text>
              </View>
            ) 
          }}
        />
        <Tab.Screen name="Profile" component={Profilescreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'Me',
            tabBarIcon: ({color, focused}) => (
                <View>
                  <Icon name="user-o" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab} />
                  <Text style={focused ? styles.focusedText : styles.unfocusedText}>Account</Text>
                </View>
            ) 
          }}
        />
      </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedTab: {
    fontSize : 30,
    color: '#56e865',
    padding: 10,
    borderRadius: 10,
  
  },
  unfocusedTab: {
    padding: 10,
    borderRadius: 10,

    fontSize : 30,
  },
  focusedText: {
    color: '#56e865',
    fontWeight: '900',
    alignSelf: 'center',
  },
  unfocusedText: {
    alignSelf: 'center',
    fontWeight: '600',
  }
})

export default Main;