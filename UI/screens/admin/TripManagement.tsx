import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
import Main from '../Main';
import userService from '../../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Dropdown } from 'react-native-element-dropdown';
import locationService from '../../Services/locationServices';
import driverService from '../../Services/driverServices';
import coachService from '../../Services/coachServices';
import tripService from '../../Services/tripServices';
import { getFormatedDate } from 'react-native-modern-datepicker';
import dateHandler from '../../module/dateHandler';
import DatePicker from 'react-native-modern-datepicker'
import Toast from 'react-native-toast-message';

const location1 = {
    "_id": "6631258bc1cca90cf940033d",
    "name": "Can Tho",
    "description": "Đường dẫn cầu Cần Thơ, QL1A, Hưng Thành, Cái Răng",
    "imgLink": "cantho.jpg",
    "__v": 0
  }
const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

function TripManagement({ navigation } : any) {
    const today = new Date();
    const startDate = getFormatedDate(today, 'YYYY/MM/DD')
    const { navigate } = useNavigation<StackNavigation>();
    const [locations, setLocations] = useState<any[]>([]);
    const [drivers, setDrivers] = useState<any[]>([]);
    const [coaches, setCoaches] = useState<any[]>([]);

    const [pickedDate, setPickedDate] =  useState(startDate);
    const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
    
    const [toValue, setToValue] = useState('');
    const [isToFocus, setIsToFocus] = useState(false);

    const [fromValue, setFromValue] = useState('');
    const [isFromFocus, setIsFromFocus] = useState(false);

    const [driverValue, setDriverValue] = useState('');
    const [isDriverFocus, setIsDriverFocus] = useState(false);

    const [driverId, setDriverId] = useState('');
    const [coachId, setCoachId] = useState('');

    const [coachValue, setCoachValue] = useState('');
    const [isCoachFocus, setIsCoachFocus] = useState(false);
    
    
    
    const [ departureTime, setDepartureTime] = useState('');
    const [ estimatedTime, setEstimatedTime] = useState('');
    const [ tripPrice, setTripPrice] = useState('');

    const handleDateChange = (propDate : any) => {
        setPickedDate(propDate);
        setIsCalendarModalVisible(false);
    }
    const validateTimeFormat = (e : string) => {

        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (timeRegex.test(e)) {
            return true;
        } else {
            return false;
        }
    };
    const onAddTrip = async () => {
        const newTrip = {
           departure: fromValue, 
           departureTime: departureTime,
           destination: toValue,
           date: dateHandler.formatDBDate(pickedDate),
           driverId: driverId,
           coachId: coachId,
           tickets: [],
           estimatedTime: estimatedTime,
           tripPrice: tripPrice
        }
        if(fromValue === '' || departureTime ==='' || toValue === '' || driverId === '' || coachId === '' || tripPrice === '' || estimatedTime === '') {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Bạn không được để trống bất cứ trường nào',
                visibilityTime: 4000,
                topOffset: 15
              });
        }
        if(!validateTimeFormat(departureTime)) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Thời gian khởi hành sai format',
                visibilityTime: 4000,
                topOffset: 15
              });
            return
        }
        await tripService.addTrip(newTrip);
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Đã thêm thành công chuyến xe',
            visibilityTime: 4000,
            topOffset: 15
          });
    }
    const onDeleteTrip = async () => {
        const deletingTrip = {
           departure: fromValue, 
           departureTime: departureTime,
           destination: toValue,
           date: dateHandler.formatDBDate(pickedDate),
           driverId: driverId,
           coachId: coachId,
           estimatedTime: Number(estimatedTime),
           tripPrice: Number(tripPrice)
        }
        if(fromValue === '' || departureTime ==='' || toValue === '' || driverId === '' || coachId === '' || tripPrice === '' || estimatedTime === '') {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Bạn không được để trống bất cứ trường nào',
                visibilityTime: 4000,
                topOffset: 15
              });
        }
        const isDeleted = await tripService.deleteTrip(deletingTrip);

        if(!isDeleted) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Xóa chuyến xe thất bại',
                visibilityTime: 4000,
                topOffset: 15
              });
            return
        }
        Toast.show({
            type: 'success',
            text1: 'Thành công',
            text2: 'Đã xóa thành công chuyến xe',
            visibilityTime: 4000,
            topOffset: 15
          });
        
    }
    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    const fetchLocations = async () => {
        try {
          const allLocations = await locationService.getAllLocations();
          setLocations(allLocations);
          //console.log(locations);
        } catch (error) {
          console.error('Error fetching locations:', error);
        }
        //console.log(locations);
      };
      const fetchDrivers = async () => {
          try {
            const allDrivers = await driverService.getAllDrivers();
            setDrivers(allDrivers);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
      };
      const fetchCoaches = async () => {
          try {
            const allCoaches = await coachService.getAllCoaches();
            setCoaches(allCoaches);
          } catch (error) {
            console.error('Error fetching locations:', error);
          }
      };
      
    useEffect(() => {
        
    
        fetchLocations();
        fetchDrivers();
        fetchCoaches();

      }, []);
  const handleOnCancel = () => {
    navigate('AdminMain');
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }} >
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 55, fontSize: 16 }}>Quản lí chuyến xe</Text>
      </View>
      <ScrollView style={[styles.body]} contentContainerStyle={{ height: '130%'}}>
        <View>
        <Dropdown
          style={[styles.dropdown, isFromFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={(!isFromFocus && fromValue=='') ? 'Chọn điểm đi' : fromValue}
          searchPlaceholder="Tìm địa điểm..."
          value={fromValue}
          onFocus={() => setIsFromFocus(true)}
          onBlur={() => setIsFromFocus(false)}
          onChange={item => {
            setFromValue(item.name);
            setIsFromFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={'blue'}
              name="location-pin"
              size={20}
            />
          )}
        />
        </View>
        <View style={{marginTop: 15}}>
        <Dropdown
          style={[styles.dropdown, isToFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={locations}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={(!isToFocus && toValue=='') ? 'Chọn điểm đến' : toValue}
          searchPlaceholder="Tìm địa điểm..."
          value={toValue}
          onFocus={() => setIsToFocus(true)}
          onBlur={() => setIsToFocus(false)}
          onChange={item => {
            setToValue(item.name);
            setIsToFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={'blue'}
              name="location-dot"
              size={20}
            />
          )}
        />
        </View>
        <View>
          <TextInput placeholder='Giờ khởi hành (theo format 23:00)' style={[styles.textInput]} onChangeText={setDepartureTime}></TextInput>
        </View>
        <View style={{flexDirection: 'row', marginTop: 0, marginRight: 10}}>
            <Icon name="calendar-days" color="#5fccf4" style={{fontSize: 30, fontWeight: '900', alignSelf: 'center', marginRight: 5,}}/>
            <TouchableOpacity style={styles.datePickerInput} onPress={() => setIsCalendarModalVisible(true)}>
                <Text style={{fontWeight: '900', color: 'black'}}>Ngày đi: <Text style={{fontWeight: '900', color: 'black', fontSize: 14}}>{dateHandler.formatVNDate(pickedDate)}</Text></Text>
            </TouchableOpacity>
        </View>
        <View style={{marginTop: 15}}>
        <Dropdown
          style={[styles.dropdown, isDriverFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={drivers}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={(!isDriverFocus && driverValue=='') ? 'Chọn tài xế' : driverValue}
          searchPlaceholder="Tìm theo tên..."
          value={driverValue}
          onFocus={() => setIsDriverFocus(true)}
          onBlur={() => setIsDriverFocus(false)}
          onChange={item => {
            setDriverValue(item.name);
            setDriverId(item._id)
            setIsDriverFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={'blue'}
              name="circle-user"
              size={20}
            />
          )}
        />
        </View>
        <View style={{marginTop: 15}}>
        <Dropdown
          style={[styles.dropdown, isCoachFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={coaches}
          search
          maxHeight={300}
          labelField="licensePlate"
          valueField="_id"
          placeholder={(!isCoachFocus && coachValue=='') ? 'Chọn xe' : coachValue}
          searchPlaceholder="Tìm biển số..."
          value={coachValue}
          onFocus={() => setIsCoachFocus(true)}
          onBlur={() => setIsCoachFocus(false)}
          onChange={item => {
            setCoachValue(item.licensePlate);
            setCoachId(item._id)
            setIsCoachFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={'blue'}
              name="taxi"
              size={20}
            />
          )}
        />
        </View>
        <View>
          <TextInput placeholder='Thời gian ước tính tới điểm đến' keyboardType='numeric'  style={[styles.textInput]} onChangeText={setEstimatedTime}></TextInput>
        </View>
        <View>
          <TextInput placeholder='Giá của chuyến đi'  keyboardType='numeric' style={[styles.textInput, {marginTop: 0}]} onChangeText={setTripPrice}></TextInput>
        </View>
        <TouchableOpacity onPress={onAddTrip} style= {[styles.featureButton, {marginTop: 30, backgroundColor: '#56e865'}]}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#FFFFFF"}}>Thêm</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteTrip} style= {[styles.featureButton, {marginTop: 15, backgroundColor: 'red'}]}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#FFFFFF"}}>Xóa</Text>
            </View>
          </TouchableOpacity>
          
      </ScrollView>
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
              minimumDate={startDate}
              onDateChange={handleDateChange}>
              </DatePicker>
              <TouchableOpacity onPress={() => setIsCalendarModalVisible(false)}>
                <Text style={{fontWeight: '900'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
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
        width: '90%',
        fontWeight: 'bold',
        height: 40,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
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
});

export default TripManagement;
