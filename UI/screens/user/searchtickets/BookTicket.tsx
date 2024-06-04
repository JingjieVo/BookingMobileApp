
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/base';
import { Dimensions, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import timeHandler from '../../../module/timeHandler';
import dateHandler from '../../../module/dateHandler';
import {type StackNavigation } from '../../../App';
import { useState } from 'react';
import Seat from '../../../components/seat';
import Trip from '../../../components/trip';
import AwesomeAlert from 'react-native-awesome-alerts';
import React from 'react';
import tripDataGetter from '../../../Services/tripServices';
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

function BookTicket({ route, navigation } : any) {
    const [guestName, setGuestName] = useState("");
    const [identifyNumber, setIdentifyNumber] = useState("");
    const [seatCode, setSeatCode] = useState("Không chọn");
    const [chooseSeatModal, setChooseSeatModal] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [feeBookSeat, setFeeBookSeat] = useState(0);
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
        tripPrice } = route.params;

    const onBack = () => {
        console.log('onclick')
        navigation.goBack();
    }
    const onDeleteSeat = () => {
        setSeatCode("Không chọn");
        setFeeBookSeat(0);
        setChooseSeatModal(false);
    }
    const onPressSeat = (seat: any) => {
        console.log(seat.seatCode);
        setFeeBookSeat(20000);
        setSeatCode(seat.seatCode);
        setChooseSeatModal(false);
    }
    const onBookPress = () => {
        //console.log(date); 
        if(guestName==='' || identifyNumber==='') {
            setShowErrorAlert(true);
            return;
        }
        navigation.navigate('BookingConfirm', {
            id: id,
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
            totalPrice: tripPrice + feeBookSeat,
            guestName: guestName,
            guestIdentifyNumber: identifyNumber,
            seatCode: seatCode,
        })
        
    }
    const hideAlert = () => {
        setShowErrorAlert(false);
    }
  return (
    <ScrollView style={{}} disableIntervalMomentum={true} contentContainerStyle={{ height: '100%'}}>
        <View style={[styles.header, {flexDirection: 'row'}]}>
            <TouchableOpacity onPress={onBack}>
                <Text style={{fontSize: 16, marginRight: 55, fontWeight: '200'}}>Hủy</Text>
            </TouchableOpacity>
            <Text style={{fontSize: 20}}>Tiến hành đặt vé</Text>
        </View>
        <ScrollView disableIntervalMomentum={true} contentContainerStyle={{ height: '120%'}}>
        <Trip key={id} _id={id} departure={departure} departureTime={departureTime} destination={destination} date={dateHandler.formatDBDate(date)} coachLicensePlate={coachLicensePlate} driverName={driverName} tickets={tickets} estimatedTime={estimatedTime} tripPrice={tripPrice} onPressTrip={() => {}} ></Trip>
        <View style={[styles.body]}>
            <View style={[styles.infoContainer]}>
                <View style={{paddingHorizontal: 80}}>
                    <Divider width={4} style={{marginBottom: 4}}></Divider>
                </View>
                <View style={{alignSelf: 'center', marginVertical: 10}}>
                    <Text style={{fontWeight: '900', fontSize: 16}}>Thông tin hành khách & chỗ ngồi</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={[styles.titleText]}>Họ tên hành khách <Text style={[styles.titleText, {color: 'red'}]}>*</Text></Text>
                    <TextInput placeholder='Họ tên' onChangeText={setGuestName} style={[styles.textInput]}></TextInput>
                    <Text style={[styles.descriptionText]}>Điền tên giống với tên trên CCCD(VD: Võ Sơn Hùng)</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={[styles.titleText]}>Số căn cước công dân <Text style={[styles.titleText, {color: 'red'}]}>*</Text></Text>
                    <TextInput placeholder='CCCD' onChangeText={setIdentifyNumber} keyboardType='numeric' style={[styles.textInput]}></TextInput>
                    <Text style={[styles.descriptionText]}>Số CCCD nếu là người lớn (trên 18 tuổi)</Text>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={[styles.titleText]}>Ghế ngồi</Text>
                    <TouchableOpacity onPress={() => setChooseSeatModal(true)} style={styles.textInput}>
                        <Text><Text style={{fontWeight: '900'}}></Text>{seatCode}</Text>
                    </TouchableOpacity>
                    <Text style={[styles.descriptionText]}><Text style={[styles.titleText, {color: 'red'}]}>*</Text> Có thể chọn hoặc không, nếu không chọn hệ thống sẽ tự sắp xếp cho quý khách (phí đặt chỗ là 20.000VND)</Text>
                </View>
            </View>
            <Modal
            visible={chooseSeatModal}
            onRequestClose={() => setChooseSeatModal(false)}
            transparent={true}
            animationType='slide'
            >
                <View style={[styles.modalContainer]}>
                    <View style={{alignSelf: 'center', marginVertical: 10, flexDirection: 'row'}}>
                        <Text style={{fontWeight: '900', fontSize: 20}}>Chọn chỗ ngồi</Text>
                    </View>
                    <View style={[styles.modalBody]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15,marginHorizontal: 60,}}>
                            <Text style={{fontSize: 16, fontWeight: '900'}}>Tầng dưới</Text>
                            <Text style={{fontSize: 16, fontWeight: '900'}}>Tầng trên</Text>
                        </View>
                        <View style={[styles.seatContainer]}>
                            {tickets.map((seat : any) => <Seat  key={seat._id} _id={seat._id} isBought={seat.isBought} seatCode={seat.seatCode} onPressSeat={onPressSeat}></Seat>)}
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', marginBottom: 15, marginHorizontal: 40,}}>
                            <View>
                                <Icon style={{fontSize: 40}} color="#0866FF" name= "door-open"></Icon>
                                <Text style={{fontSize: 16, fontWeight: '900'}}>Cửa ra</Text>
                            </View>
                            <View>
                                <Icon style={{fontSize: 40}} color="#0866FF" name= "chair"></Icon>
                                <Text style={{fontSize: 16, fontWeight: '900'}}>Tài xế</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', marginBottom: 15, marginHorizontal: 40,}}>
                                <TouchableOpacity onPress={onDeleteSeat} style={{backgroundColor: '#ff4444', padding: 10, borderRadius: 10}}>
                                    <Text style={{fontWeight: '900', fontSize: 20, color: 'white'}}>Xóa chỗ</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setChooseSeatModal(false)} style={{backgroundColor: '#D9DADF', padding: 10, paddingHorizontal: 32, borderRadius: 10}}>
                                    <Text style={{fontWeight: '900', fontSize: 20, color: 'white'}}>Hủy</Text>
                                </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </Modal>
        </View>
        </ScrollView>
        <View style={[styles.modalBox, {top: height-100}]}>
                            <View style={[styles.modalContent,{flexDirection: 'row'}]}>
                                <View style={{justifyContent: 'space-between', padding: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: '900'}}>Tổng tiền:</Text>
                                    <Text style={{color: 'orange' , fontSize: 20, fontWeight: '500'}}>VND {moneyHandler.convertToVND(tripPrice)}</Text>
                                    <Text style={{fontStyle: 'italic', fontSize: 12}}>Đã bao gồm giá vé & thuế</Text>
                                </View>
                                <View style={[styles.continueButton]}>
                                    <TouchableOpacity onPress={onBookPress} style={{backgroundColor: 'orange', padding: 20, borderRadius: 10}} >
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Đặt vé</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          confirmButtonStyle={styles.confirmButton}
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showErrorAlert}
          showProgress={false}
          title="Thông báo"
          message="Điền Họ tên và CCCD"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
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
        marginTop: 10,
        marginBottom: 0,
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
        width: 100
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