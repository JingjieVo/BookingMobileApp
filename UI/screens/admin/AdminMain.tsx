import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
import Main from '../Main';
import userDAO from '../../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome6';
function AdminMain({ navigation } : any) {
  const { navigate } = useNavigation<StackNavigation>();


  const goTripManagement = () => {
    navigation.navigate('TripManagement')
  }
  const goCoachManagement = () => {
    navigation.navigate('CoachManagement')
  }
  const goDriverManagement = () => {
    navigation.navigate('DriverManagement')
  }
  const goRevenueManagement = () => {
    navigation.navigate('RevenueManagement')
  }
  const handleOnCancel = () => {
    navigate('Main');
  };
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 65, fontSize: 16 }}>ADMIN PANEL</Text>
      </View>
      <View style={[styles.body]}>
      <View style={[]}>
          <TouchableOpacity onPress={goTripManagement} style= {[styles.featureButton]}>
            <View style={{flex: 2}}>
              <Icon name="bus" color="#F7941D" style={{fontSize: 20, alignSelf: 'center'}} />
            </View>
            <View style={{flex: 7}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Các chuyến xe</Text>
              <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem, thêm, xóa và chỉnh sửa thông tin chuyến xe</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[]}>
          <TouchableOpacity onPress={goCoachManagement} style= {[styles.featureButton]}>
            <View style={{flex: 2}}>
              <Icon name="bus-simple" color="#F7941D" style={{fontSize: 20, alignSelf: 'center'}} />
            </View>
            <View style={{flex: 7}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Các xe của hãng</Text>
              <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem, thêm, xóa và chỉnh sửa thông tin của các xe</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[]}>
          <TouchableOpacity onPress={goRevenueManagement} style= {[styles.featureButton]}>
            <View style={{flex: 2}}>
              <Icon name="money-bill" color="#F7941D" style={{fontSize: 20, alignSelf: 'center'}} />
            </View>
            <View style={{flex: 7}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Doanh thu</Text>
              <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem doanh thu của hãng xe theo ngày và tháng</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[]}>
          <TouchableOpacity onPress={goDriverManagement} style= {[styles.featureButton]}>
            <View style={{flex: 2}}>
              <Icon name="user-group" color="#F7941D" style={{fontSize: 20, alignSelf: 'center'}} />
            </View>
            <View style={{flex: 7}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Tài xế</Text>
              <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem, thêm, xóa và chỉnh sửa thông tin của các tài xế</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    position:'relative',
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#1CA653',
      padding: 20,
    },
    body: {
      padding: 20,
    },
    titleText: {
      color: '#F7941D',
      fontWeight: '700',
    },
    descriptionText: {
      fontStyle: 'italic'
    },
    textInput: {
      fontWeight: 'bold',
      height: 50,
      marginVertical: 5,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: '#DCDEE8',
      padding: 10,
      borderRadius: 10,
    },
    alertMessage: {
      fontSize:14,
      fontStyle: 'italic',
      textAlign: 'center'
    },
    confirmButton: {
        height: 30,
        width: 100
    },
    confirmButtonText: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textAlert: {
      textAlign: 'center',
      fontWeight: '900',
    },
    featureButton: {
        paddingHorizontal: 15, 
        paddingVertical: 15, 
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      }
});

export default AdminMain;
