
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import timeHandler from '../../../module/timeHandler';
import dateHandler from '../../../module/dateHandler';
import {type StackNavigation } from '../../../App';
import { useEffect, useState } from 'react';
import Seat from '../../../components/seat';
import Trip from '../../../components/trip';
import AwesomeAlert from 'react-native-awesome-alerts';
import React from 'react';
import trip from '../../../Services/tripServices';
import billService from '../../../Services/billServices';
import userService from '../../../Services/userServices';
import moneyHandler from "../../../module/moneyHandler";

const seats = [
    {
        "_id": "661d4a1866e0a20b6e5f119a",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "1A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f119b",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "2A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f119c",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "3A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f119d",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "4A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f119e",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "5A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f119f",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "6A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a0",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "7A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a1",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "8A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a2",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "9A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a3",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": true,
        "seatCode": "10A",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a4",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "1B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a5",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "2B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a6",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "3B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a7",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "4B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a8",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "5B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11a9",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "6B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11aa",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "7B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11ab",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "8B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11ac",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "9B",
        "__v": 0
    },
    {
        "_id": "661d4a1866e0a20b6e5f11ad",
        "tripId": "661d4a1866e0a20b6e5f1199",
        "available": true,
        "isBought": false,
        "seatCode": "10B",
        "__v": 0
    }
]

function BookTicket({ route, navigation } :any) {

    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [billId, setBillId] = useState(null);
    const [showLoading, setShowLoading] = useState(false);
    const [chooseSeatModal, setChooseSeatModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showNotLoggedAlert, setShowNotLoggedAlert] = useState(false);

    const { navigate } = useNavigation<StackNavigation>();
    const { height } = Dimensions.get('window');
    const {id,
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
        seatCode } = route.params;
    const hideLoading = () => {
        setShowLoading(false);
    }
    const onBack = () => {
        //console.log('onclick')
        navigation.goBack();
    }
    const onBookPress = () => {
        setShowAlert(true);
    }
    const hideAlert = () => {
        setShowAlert(false);
    }
    const getLoggedUser = async () => {
        const user = await userService.getUser();
            setLoggedUser(user);
            if (user) {
                setLoggedUserId(user._id);
            }
    }
    const createTransaction = async () => {
        const newBill = {
            userId : loggedUserId, 
            tripId: id, 
            price: totalPrice
        }
        try {
            const newBillId = await billService.addBill(newBill);
            if (newBillId) {
                return newBillId;
                
            }
        } catch (error) {
            console.log('Error adding bill:', error);
            return null;
        }
    }
    const hideNotLoggedAlert = () => {
        setShowNotLoggedAlert(false)
    }
    const handleOnNavigateToLogin = () => {
        navigate("Login");
      }
    const confirmButton = async () => {
        if (!loggedUserId) {
            console.log('User ID is not set');
            setShowNotLoggedAlert(true);
            return;
        }
        const newBillId = await createTransaction();
        setBillId(newBillId);
        console.log(billId)
        console.log(newBillId)
        setShowLoading(true);
        setTimeout(() => {   
            setShowLoading(false);
            navigation.navigate('PayForTicket', {
                tripId: id,
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
                billId: newBillId,
            }); 
        }, 2000); 
            
            // Xử lý trường hợp lỗi khi tạo bill
    };
    useEffect(() => {      
        getLoggedUser();
        setLoggedUserId(loggedUser ? loggedUser['_id'] : null)
    }, []); 
  return (
    <ScrollView style={{}} disableIntervalMomentum={true} contentContainerStyle={{ height: '100%'}}>
        <View style={[styles.header, {flexDirection: 'row'}]}>
            <TouchableOpacity onPress={onBack}>
                <Text style={{fontSize: 16, marginRight: 55, fontWeight: '200'}}>Hủy</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Xác nhận đặt vé</Text>
        </View>
        <ScrollView disableIntervalMomentum={true}>
        
        <View style={[styles.body]}>
        <Trip key={id} _id={id} departure={departure} departureTime={departureTime} destination={destination} date={dateHandler.formatDBDate(date)} coachLicensePlate={coachLicensePlate} driverName={driverName} tickets={tickets} estimatedTime={estimatedTime} tripPrice={tripPrice} onPressTrip={() => {}} ></Trip>
            <View style={[styles.infoContainer, {marginBottom: 0}]}>
                
                <View style={{alignSelf: 'center', marginVertical: 5}}>
                    <Text style={{fontWeight: '900', fontSize: 16}}>Thông tin tài xế & Địa điểm checkin</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={[styles.titleText]}>Họ tên tài xế: <Text style={{color: 'red'}}>{driverName}</Text></Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={[styles.titleText]}>Giờ có khởi hành: <Text style={{color: 'red'}}>{departureTime}</Text></Text>
                    <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text> Đến trước giờ khởi hành 1 giờ</Text>
                </View>
                <View style={{marginTop: 2}}>
                    <Text style={[styles.titleText]}>Địa điểm: </Text>
                    <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text><Text style={[styles.titleText]}> Điểm đi: </Text> {departureDescriptions}</Text>
                    <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text> <Text style={[styles.titleText]}>Điểm đến: </Text> {destinationDescriptions}</Text>
                </View>   
            </View>
            <View style={[styles.infoContainer]}>
                
                <View style={{alignSelf: 'center', marginVertical: 5}}>
                    <Text style={{fontWeight: '900', fontSize: 16}}>Thông tin hành khách & chỗ ngồi</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={[styles.titleText]}>Họ tên hành khách: <Text style={{color: 'red'}}>{guestName}</Text></Text>
                    <Text style={[styles.descriptionText]}>Xác nhận tên giống với tên trên CCCD</Text>
                </View>
                <View style={{marginTop: 5}}>
                    <Text style={[styles.titleText]}>Số căn cước công dân: <Text style={{color: 'red'}}>{guestIdentifyNumber}</Text></Text>
                    <Text style={[styles.descriptionText]}>Xác nhận số CCCD</Text>
                </View>
                <View style={{marginTop: 5, marginBottom: 5}}>
                    <Text style={[styles.titleText]}>Ghế ngồi: <Text style={{color: 'red'}}>{seatCode==="Không chọn" ? "Không chọn" : seatCode}</Text></Text>
                    <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text> Trong trường hợp quý khách không chọn ghế ngồi, hệ thống sẽ lựa chọn ngẫu nhiên</Text>
                </View>
                <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text> Hãy xác nhận kỹ các thông tin trước khi đặt vé</Text>
            </View>
            
        </View>
        </ScrollView>
        <View style={[styles.modalBox, {top: height-100}]}>
                            <View style={[styles.modalContent,{flexDirection: 'row'}]}>
                                <View style={{justifyContent: 'space-between', padding: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: '900'}}>Tổng tiền:</Text>
                                    <Text style={{color: 'orange' , fontSize: 20, fontWeight: '500'}}>VND {moneyHandler.convertToVND(totalPrice)}</Text>
                                    <Text style={{fontStyle: 'italic', fontSize: 12}}>Đã bao gồm giá vé & thuế</Text>
                                </View>
                                <View style={[styles.continueButton]}>
                                    <TouchableOpacity onPress={onBookPress} style={{backgroundColor: 'orange', padding: 20, borderRadius: 10}} >
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Thanh toán</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showAlert}
          showProgress={false}
          title="Nhắc nhở!"
          message="Bạn đã kiểm tra kỹ các thông tin đã điền?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Thanh toán"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            confirmButton();
            hideAlert();
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
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showNotLoggedAlert}
          showProgress={false}
          title="Thông báo"
          message="Bạn chưa đăng nhập"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Đăng nhập"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            
          }}
          onConfirmPressed={() => {
            hideNotLoggedAlert();
            handleOnNavigateToLogin();
            
          }}
        />  
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: 'white'
    },
    body: {
        margin: 10,
        marginTop: 20,
        marginBottom: 120,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 15,
        
    },
    textInput: {
        fontWeight: 'bold',
        height: 40,
        marginVertical: 5,
        backgroundColor: "#F2F4F3",
        padding: 10,
        borderRadius: 10,
    },
    titleText: {
        fontWeight: '700',
    },
    descriptionText: {
        fontStyle: 'italic'
    },
    infoContainer: {
        margin: 15
    },
    modalContainer: {
        alignContent: 'center',
        textAlign: 'center',
        elevation: 10,
        flex: 1,
        marginTop: 60,
        marginBottom: 95,
        marginHorizontal: 15,
        backgroundColor: 'white',
        borderRadius: 20,
    },
    modalBody: {
        alignContent: 'center',
        marginHorizontal: 10,
        marginVertical: 10,
    },
    seatContainer: {
        alignContent:'center',
        flexWrap: 'wrap',
        maxHeight: 300,
        columnGap: 10,
        rowGap: 10,
    },
    modalBox: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5,
    },
    modalContent: {
        margin: 5,
        justifyContent: 'space-around'
    },
    continueButton: {
        justifyContent: 'center',
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

})

export default BookTicket;