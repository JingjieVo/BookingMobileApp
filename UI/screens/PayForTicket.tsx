import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, BackHandler } from "react-native";
import bookingService from "../Services/bookingService";
import userService from "../Services/userServices";
import timeHandler from "../module/timeHandler";
import dateHandler from "../module/dateHandler";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import billService from "../Services/billServices";
import AwesomeAlert from "react-native-awesome-alerts";


function PayForTicket({ navigation, route} : any) {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserName, setLoggedUserName] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
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

    
    const getLoggedUser = async () => {
        const user = await userService.getUser();
            setLoggedUser(user);
            if (user) {
                setLoggedUserId(user._id);
            }
    }
    const deleteTransaction = async () => {
        try {
            const newBillId = await billService.deleteBill(billId);
            if (newBillId) {
                console.log('delete bill: ' + newBillId);
                return newBillId;  
            }
        } catch (error) {
            console.log('Error adding bill:', error);
            return null;
        }
    }
    const navigateToMain = () => {
        navigation.navigate('Main');
    }
    const onBack = () => {
        console.log('onclick')
        setShowAlert(true);
        
    }
    const hideAlert = () => {
        setShowAlert(false);
    }
    const hideSuccessAlert = () => {
        setShowSuccessAlert(false);
    }
    const onPayButton = () => {
        const userId = loggedUser ? loggedUser['_id'] : null;
        const dbDate = dateHandler.formatDBDate(date);
        const identifyNumber = guestIdentifyNumber;
        const arrivalTime = timeHandler.addHours(departureTime, estimatedTime);
        const arrivalDate = dateHandler .toTimeDate(departureTime, dbDate, estimatedTime);
        //console.log({userId, guestName, guestIdentifyNumber, tripId, departureTime, dbDate, departure, departureDescriptions,  destination, arrivalTime, arrivalDate });
        if(seatCode == "Không chọn") {
            bookingService.bookTicket({userId, guestName, identifyNumber, tripId, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId })
        }
        else {
            bookingService.bookSpecificTicket({userId, guestName, identifyNumber, tripId, seatCode, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId })
        }
        setShowSuccessAlert(true);
    }
    useEffect(() => {
        getLoggedUser();
        setLoggedUserId(loggedUser ? loggedUser['_id'] : null)
        setLoggedUserName(loggedUser ? loggedUser['username'] : null)
        console.log(seatCode, totalPrice);
        const backAction = () => {
            setShowAlert(true);
            // Nếu bạn muốn ngăn chặn hành động quay lại mặc định, hãy trả về true
            return true;
          };
      
          const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
          );
      
          // Cleanup listener khi component unmounts
          return () => backHandler.remove();
    }, []);  
    return(
        <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={{ height: '100%'}}>
            <View style={[styles.header, {flexDirection: 'row'}]}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={{fontSize: 16, marginRight: 36, fontWeight: '200'}}>Hủy</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 20}}>Tiến hành thanh toán</Text>
            </View>
            <View style={{margin: 10, marginHorizontal: 15}}>
                <Text style={{alignSelf: 'center', fontWeight: '900'}}>
                    <Text style={{color: 'red'}}>*</Text> Quý khách chuyển khoản theo hướng dẫn bên dưới
                </Text>
                <Text style={{ fontWeight: '900', marginLeft: 14}}>
                    B1: <Text style={{fontWeight : '400', fontStyle: 'italic'}}>Quét QR bên dưới hoặc sử dụng số tài khoản</Text>
                </Text>
                <Text style={{ fontWeight: '900', marginLeft: 14}}>
                    B2: <Text style={{fontWeight : '400', fontStyle: 'italic'}}>Chuyển khoản theo nội dung sau:</Text>
                </Text>
                <Text style={{ fontWeight: '900', marginLeft: 14, alignSelf: 'center'}}>
                    {billId}
                </Text>
                <Text style={{ fontWeight: '900', marginLeft: 14}}>
                    B3: <Text style={{fontWeight : '400', fontStyle: 'italic' }}>Sau khi thanh toán ấn vào kiểm tra thanh toán và xem vé ở mục Tickets</Text>
                </Text>
                <Text style={{fontWeight : '400', fontStyle: 'italic', marginLeft: 14, color: 'red'}}>* Nếu chuyển sai hướng dẫn chúng tôi sẽ không chịu trách nhiệm về bất kỳ sai xót nào</Text>
            </View>
            <View style={[styles.body]}>
                <Image style={[styles.QRcode]} 
                source={require('../assets/img/QRPayment.jpg')}></Image>
                <TouchableOpacity onPress={onPayButton} style={[styles.payButton]}>
                    <Text style={{alignSelf: 'center', fontSize: 15, fontWeight: '800', color: 'white'}}>Kiểm tra thanh toán</Text>
                </TouchableOpacity>
            </View>
            <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showAlert}
          showProgress={false}
          title="Nhắc nhở!"
          message="Bạn muốn hủy giao dịch đặt vé?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Có"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            deleteTransaction();
            navigation.goBack();
            hideAlert();
          }}
        />
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showSuccessAlert}
          showProgress={false}
          title="Thông báo"
          message="Thanh toán thành công, hãy kiểm tra vé trong mục Vé"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Tiếp tục"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            navigateToMain();
            hideSuccessAlert();
            
          }}
        />
        </ScrollView>
        
    )
}


const styles = StyleSheet.create({
    QRcode: {
        alignSelf: 'center',
        width: 200,
        height: 300,
        borderRadius: 15,
        marginBottom: 30,
    },
    header: {
        padding: 20,
        backgroundColor: 'white'
    },
    body: {
        marginTop: 30,
    },
    payButton: {
        justifyContent: 'center',
        backgroundColor: 'orange', width: '80%', height: '10%',
        alignSelf: 'center',
        borderRadius: 15,

    },
    alertMessage: {
      fontSize:14,
      fontStyle: 'italic',
      textAlign: 'center'
    },
    confirmButton: {
        height: 30,
        width: 65
    },
    confirmButtonText: {
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textAlert: {
      textAlign: 'center',
      fontWeight: '900',
    }
});

export default PayForTicket;