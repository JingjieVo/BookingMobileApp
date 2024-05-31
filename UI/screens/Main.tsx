import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homescreen from './Home';
import Searchscreen from './SearchTickets';
import MyTicketsscreen from './MyTickets';
import Testpage from './testPage';

import LoggedMyTicketsscreen from './LoggedMyTickets'

import Profilescreen from './Profile';
import LoggedProfilescreen from './LoggedProfile';

import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View } from "react-native";
import { SetStateAction, useEffect, useRef, useState } from "react";
import userDAO from "../Services/userServices";
const Tab = createBottomTabNavigator();

function Main() {
  const [loggedUser, setLoggedUser] = useState(null);
  const getLoggedUser = async () => {
    const user = await userDAO.getUser();
    setLoggedUser(user);

  }
  useEffect(() => {

    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    getLoggedUser();
  }, []);
  
  return (
      <Tab.Navigator
        screenOptions= {() => ({
          headerShown: false,
          tabBarStyle: {
            height: 75,
            position: 'absolute',
            //bottom: 12,
            //right: 12,
            //left: 12,
            //borderRadius: 25,
            borderWidth: 0,
            borderColor: 'white',
            shadowColor: '#000000'
          },
        })}
        
        >
        <Tab.Screen name="Home" component={Homescreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View>
                <Icon name="home" color="lightgray" style={[focused ? styles.focusedTab : styles.unfocusedTab]} />
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Home</Text>
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
        <Tab.Screen name="MyTickets" component={!loggedUser ? MyTicketsscreen : LoggedMyTicketsscreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'My Tickets',
            tabBarIcon: ({color, focused}) => (
              <View>
                <Icon name="ticket" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab} />
                <Text style={focused ? styles.focusedText : styles.unfocusedText}>Tickets</Text>
              </View>
            ) 
          }}
        />
        <Tab.Screen name="Profile" component={!loggedUser ? Profilescreen : LoggedProfilescreen} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: 'Me',
            tabBarIcon: ({color, focused}) => (
                <View>
                  <Icon1 name="account-circle" color="lightgray" style={focused ? styles.focusedTab : styles.unfocusedTab} />
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
    color: '#1CA653',
    paddingHorizontal: 10,
    padding: 5,

  
  },
  unfocusedTab: {
    padding: 5,
    paddingHorizontal: 10,
    fontSize : 30,
  },
  focusedText: {
    color: '#1CA653',
    fontWeight: '900',
    alignSelf: 'center',
    fontSize: 15
  },
  unfocusedText: {
    alignSelf: 'center',
    fontWeight: '900',
    fontSize: 0,
  }
})

export default Main;