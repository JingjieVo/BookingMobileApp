import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
import Main from '../Main';
import revenueService from '../../Services/revenueServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker'
import dateHandler from '../../module/dateHandler';
import moneyHandler from '../../module/moneyHandler';

function RevenueManagement({ navigation } : any) {
  const today = new Date();
  const startDate = getFormatedDate(today, 'YYYY/MM/DD')
  const startMonth = getFormatedDate(today, 'YYYY MM')



  const [pickedDate, setPickedDate] =  useState(startDate);
  const [pickedMonth, setPickedMonth] =  useState(startMonth);

  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [isMonthModalVisible, setIsMonthModalVisible] = useState(false);
    
  const { navigate } = useNavigation<StackNavigation>();
  const [totalRevenue, setTotalRevenue] = useState('')
  const [dailyRevenue, setDailyRevenue] = useState('0')
  const [monthlyRevenue, setMonthlyRevenue] = useState('0')
  const [yearlyRevenue, setYearlyRevenue] = useState('')

  const handleDateChange = async(propDate : any) => {
    setPickedDate(propDate);
    setIsCalendarModalVisible(false);
    const daily = await revenueService.getDailyRevenue(dateHandler.formatDBDate(propDate));
    //console.log(dateHandler.formatDBDate(pickedDate))
    setDailyRevenue(daily.dailyRevenue);
  }
  const handleMonthChange = async (propMonth : any) => {
    setPickedMonth(propMonth);
    setIsMonthModalVisible(false);
    const monthly = await revenueService.getMonthlyRevenue(propMonth);
    setMonthlyRevenue(monthly.monthlyRevenue);
  }

  const getYearlylRevenue = async () => {
    const revenue = await revenueService.getYearlyRevenue(pickedMonth.split(' ')[0]);
    setTotalRevenue(revenue.totalRevenue);
  }

  const getTotalRevenue = async () => {
    const revenue = await revenueService.getTotalRevenue();
    setTotalRevenue(revenue.totalRevenue);
  }
  const handleOnCancel = () => {
    navigate('Main');
  };
  useEffect(() => {
    console.log('loadd')
    getTotalRevenue();
  }
  , [])
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 45, fontSize: 16 }}>Thống kê doanh thu</Text>
      </View>
      <View style={[styles.body]}>
      <View style={{flexDirection: 'row', marginBottom: 20, marginRight: 10}}>
        <Text style={{flex: 3,fontWeight: '900', color: 'black', fontSize: 18}}>Tổng thu: </Text>
        <Text style={{flex: 4,fontWeight: '900', color: 'black', fontSize: 18,alignSelf: 'center'}}>{moneyHandler.convertToVND(totalRevenue)}VND</Text>
        </View>
        <View style={{flex: 7,flexDirection: 'row',alignItems: 'center'}}>
          <Text style={{fontWeight: '900', color: 'black', fontSize: 15}}>Doanh thu    </Text>
          <TouchableOpacity style={styles.datePickerInput} onPress={() => setIsCalendarModalVisible(true)}>
              <Text style={{fontWeight: '900', color: 'black'}}><Text style={{fontWeight: '900', color: 'black', fontSize: 14}}>{dateHandler.formatDate(pickedDate)}</Text></Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: '700', color: 'black', fontSize: 16, marginTop: 20}}>= {moneyHandler.convertToVND(dailyRevenue)} VND</Text>
        <View style={{flex: 7,flexDirection: 'row',alignItems: 'center', marginTop: 15}}>
          <Text style={{fontWeight: '900', color: 'black', fontSize: 15}}>Doanh thu    </Text>
          <TouchableOpacity style={styles.datePickerInput} onPress={() => setIsMonthModalVisible(true)}>
              <Text style={{fontWeight: '900', color: 'black'}}><Text style={{fontWeight: '900', color: 'black', fontSize: 14}}>{dateHandler.formatMonthYear(pickedMonth)}</Text></Text>
          </TouchableOpacity>
        </View>
        <Text style={{fontWeight: '700', color: 'black', fontSize: 16, marginTop: 20}}>= {moneyHandler.convertToVND(monthlyRevenue)} VND</Text>
        <Text style={{fontWeight: '700', color: 'black', fontSize: 16, marginTop: 20}}>Doanh thu năm {pickedMonth.split(" ")[0]}</Text>
        <Text style={{fontWeight: '700', color: 'black', fontSize: 16, marginTop: 20}}>= {moneyHandler.convertToVND(monthlyRevenue)} VND</Text>

      </View>
      <View>
        <Modal
        animationType='slide'
        transparent={true}
        visible={isCalendarModalVisible}
        onRequestClose={() => setIsCalendarModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker 
              mode='calendar'
              selected={pickedDate}
              onDateChange={handleDateChange}>
              </DatePicker>
              <TouchableOpacity onPress={() => setIsCalendarModalVisible(false)}>
                <Text style={{fontWeight: '900'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Modal
        animationType='slide'
        transparent={true}
        visible={isMonthModalVisible}
        onRequestClose={() => setIsMonthModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView1}>
              <DatePicker 
              mode='monthYear'
              current={dateHandler.formatMonthYear1(pickedMonth)}
              onMonthYearChange={selectedDate => handleMonthChange(selectedDate)}>
              </DatePicker>
              <TouchableOpacity onPress={() => setIsMonthModalVisible(false)}>
                <Text style={{fontWeight: '900', marginBottom: 20, fontSize: 20}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
      marginVertical: 15,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: 'black',
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
      },
      container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 15,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
      },
      selectedTextStyle: {
        color: 'black',
        fontWeight: '600',
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      datePickerInput: {
        width: '50%',
        fontWeight: 'bold',
        height: 40,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      modalView1: {
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
});

export default RevenueManagement;
