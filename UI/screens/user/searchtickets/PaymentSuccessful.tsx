import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image, BackHandler } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../../App";
import Icon from 'react-native-vector-icons/FontAwesome6';
import moneyHandler from '../../../module/moneyHandler';
import timeHandler from '../../../module/timeHandler';
function PaymentSuccessful({ navigation, route } : any) {
  const { navigate } = useNavigation<StackNavigation>();
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [Email, setEmail] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [seeAble, setSeeAble] = useState(false);

  const {tripId,
    departure, 
    departureDescriptions, 
    departureTime,
    destination, 
    destinationDescriptions, 
    date, 
    tickets, 
    coachLicensePlate, 
    driverName, 
    estimatedTime, 
    tripPrice,
    totalPrice, 
    guestName,
    guestIdentifyNumber,
    seatCode,
    billId } = route.params;
  const handleOnCancel = () => {
    navigate('Main');
    navigation.replace('Main')
  };
  useEffect(() => {

    console.log(seatCode, totalPrice);
    const backAction = () => {
        handleOnCancel();
        // Nếu bạn muốn ngăn chặn hành động quay lại mặc định, hãy trả về true
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      );
  


    return () => {
        backHandler.remove();
    };
      

}, []);
  return (
    <View style={{backgroundColor: 'white', flex: 1 }}>
        <View style={[styles.body]}>
            <View style={[styles.bodyContent]}>
                <Image
                style={styles.tinyLogo}
                source={require('../assets/img/success.png')}
                />
                <Text style={{bottom: 10, alignSelf: 'center', fontSize: 30, fontWeight: '900', color: "#64D90B"}}>Thành công</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text  style={{fontSize: 16, fontWeight: '700'}}>Mã hóa đơn:</Text>
                    <Text>{billId}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>Mã xe: </Text>
                    <Text>{coachLicensePlate}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>Số vé: </Text>
                    <Text>{seatCode}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}}>Thời gian:</Text>
                    <Text>{timeHandler.formatDateTime(timeHandler.getCurrentISODateTime())}</Text>
                </View>
                <View style={{justifyContent: 'space-between', marginTop: 10, alignSelf: 'center'}}>
                    <Text style={{fontSize: 20, fontWeight: '700'}}>Tổng thanh toán</Text>
                    <Text style={{fontSize: 20, fontWeight: '700', alignSelf: 'center', color: '#F7941D'}}>{moneyHandler.convertToVND(totalPrice)}</Text>
                </View>
                <Text style={{fontSize: 11, fontWeight: '700', alignSelf: 'center', color: '#64d90b'}}>Chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</Text>
            </View>
        </View>
        <View>
            <TouchableOpacity onPress={handleOnCancel} style={[styles.backButton]}>
                <Icon name="house-circle-check" style={{alignSelf: 'center', fontSize: 24  }} color='white'></Icon>
                <Text style={{alignSelf: 'center', fontSize: 14, color: 'white' }}>Trở về trang chủ</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        justifyContent: 'flex-start',
        backgroundColor: '#1CA653',
        padding: 20,
    },
    tinyLogo: {
        //backgroundColor: 'red',
        position:'absolute',
        bottom: 130,
        width: 300,
        height: 300,
        alignSelf: 'center',
      },
    body: {
        height: '45%',
        width: '90%',
        margin: 5,
        marginTop: 160,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 10,
    },
    bodyContent: {
        padding: 0,
        paddingHorizontal: 15,
        backgroundColor: 'white'
    },
    backButton: {
        position: 'absolute', 
        backgroundColor: '#64d90b',
        width: '50%', 
        height: 50, 
        alignSelf: 'center',
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 10,
      top: 30,
      borderRadius: 10,
      justifyContent: 'center',
    }
    
    
});

export default PaymentSuccessful;
