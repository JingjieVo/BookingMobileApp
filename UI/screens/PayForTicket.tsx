import { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet, ScrollView, BackHandler, AppState } from "react-native";
import bookingService from "../Services/bookingServices";
import userService from "../Services/userServices";
import timeHandler from "../module/timeHandler";
import dateHandler from "../module/dateHandler";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React from "react";
import billService from "../Services/billServices";
import AwesomeAlert from "react-native-awesome-alerts";
import { StackNavigation } from "../App";
import Toast from "react-native-toast-message";


function PayForTicket({ navigation, route} : any) {
  const { navigate } = useNavigation<StackNavigation>();

    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserName, setLoggedUserName] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const hideLoading = () => {
        setShowLoading(false);
    }
    let countdownTimeout : any;
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

    const payButtonClick = () => {
        navigation.navigate('PaymentSuccessful', {
            tripId: tripId,
            departure: departure,
            departureDescriptions: departureDescriptions, 
            departureTime: departureTime,
            destination: destination,
            destinationDescriptions: destinationDescriptions,
            date: date,
            tickets: tickets,
            coachLicensePlate: coachLicensePlate,
            driverName: driverName,
            estimatedTime: estimatedTime,
            tripPrice: tripPrice,
            totalPrice: totalPrice,
            guestName: guestName,
            guestIdentifyNumber: guestIdentifyNumber,
            seatCode: seatCode,
            billId: billId,
        });
    }
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
            console.log('Error delete bill:', error);
            return null;
        }
    }
    const navigateToMain = () => {
        navigate('Main');
    }
    const navigateToNext = () => {
        navigation.navigate('PaymentSuccessful', {
            tripId: tripId,
            departure: departure,
            departureDescriptions: departureDescriptions, 
            departureTime: departureTime,
            destination: destination,
            destinationDescriptions: destinationDescriptions,
            date: date,
            tickets: tickets,
            coachLicensePlate: coachLicensePlate,
            driverName: driverName,
            estimatedTime: estimatedTime,
            tripPrice: tripPrice,
            totalPrice: totalPrice,
            guestName: guestName,
            guestIdentifyNumber: guestIdentifyNumber,
            seatCode: seatCode,
            billId: billId,
        });
    }
    const onBack = () => {
        console.log('onclick')
        setShowAlert(true);   
    }
    const onTimeout = () => {
        setShowTimeoutAlert(true);
    }
    const hideAlert = () => {
        setShowAlert(false);
    }
    const hideTimeoutAlert = () => {
        setShowTimeoutAlert(false);
    }
    const hideSuccessAlert = () => {
        setShowSuccessAlert(false);
    }
    const onPayButton = async() => {
        const userId = loggedUser ? loggedUser['_id'] : null;
        const dbDate = dateHandler.formatDBDate(date);
        const identifyNumber = guestIdentifyNumber;
        const arrivalTime = timeHandler.addHours(departureTime, estimatedTime);
        const arrivalDate = dateHandler .toTimeDate(departureTime, dbDate, estimatedTime);
        //console.log({userId, guestName, guestIdentifyNumber, tripId, departureTime, dbDate, departure, departureDescriptions,  destination, arrivalTime, arrivalDate });
        if(seatCode == "Không chọn") {
            await bookingService.bookTicket({userId, guestName, identifyNumber, tripId, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId })
        }
        else {
            await bookingService.bookSpecificTicket({userId, guestName, identifyNumber, tripId, seatCode, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId })
        }
        if (countdownTimeout) {
            clearTimeout(countdownTimeout);
        }
        setShowLoading(true);
        setTimeout( async() => {  
        await billService.updateBill(billId, "FINISHED");
        setShowLoading(false);
        Toast.show({
            type: 'success',
            text1: 'Đặt vé thành công',
            text2: 'Xem vé đã đặt ở mục vé của tôi',
            visibilityTime: 5000,
            topOffset: 15,
        });
        navigateToNext();
      }, 2000)

        
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
            countdownTimeout = setTimeout(() => {
            onTimeout();
            
            //onBack();
        }, 298000);  // 298000 seconds countdown

        return () => {
            backHandler.remove();
            if (countdownTimeout) {
                clearTimeout(countdownTimeout);
            }
        };
          

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
                    <Text style={{color: 'red'}}>*</Text> Quý khách có 5 phút để thực hiện thanh toán trước khi hóa đơn hết hiệu lực
                </Text>
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
            
          }}
          onConfirmPressed={() => {
            navigateToNext();
            hideSuccessAlert();
            
          }}
        />
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold', color: 'red'}}
          show={showTimeoutAlert}
          showProgress={true}
          title="Thông báo"
          message="Đã quá thời gian thực hiện thanh toán vui lòng tạo giao dịch mới"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Tiếp tục"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            
          }}
          onConfirmPressed={() => {
            navigation.goBack();
            hideTimeoutAlert();
            
          }}
        />
        <AwesomeAlert
          progressSize='30'
          progressColor='#56e865'
          show={showLoading}
          showProgress={true}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={false}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideLoading();
          }}
          onConfirmPressed={() => {
            hideLoading();
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