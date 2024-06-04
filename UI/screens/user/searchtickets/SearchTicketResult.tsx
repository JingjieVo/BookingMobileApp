
import { NavigationContainer, useFocusEffect, useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Modal  } from 'react-native';
import { type StackNavigation } from "../../../App";
import moneyHandler from "../../../module/moneyHandler";

import Icon from 'react-native-vector-icons/FontAwesome6';
import Trip from '../../../components/trip';
import { Divider } from '@rneui/base';
import dateHandler from '../../../module/dateHandler'
import timeHandler from '../../../module/timeHandler';
import { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import React from 'react';
import tripDataGetter from '../../../Services/tripServices';

const trips1: any[] = [
    {
        "_id": "661d4a1866e0a20b6e5f1199",
        "departure": "Ho Chi Minh",
        "departureTime": "11:00",
        "destination": "Da Nang",
        "date": "2024-05-15T00:00:00.000Z",
        "tickets": [
            "661d4a1866e0a20b6e5f119a",
            "661d4a1866e0a20b6e5f119b",
            "661d4a1866e0a20b6e5f119c",
            "661d4a1866e0a20b6e5f119d",
            "661d4a1866e0a20b6e5f119e",
            "661d4a1866e0a20b6e5f119f",
            "661d4a1866e0a20b6e5f11a0",
            "661d4a1866e0a20b6e5f11a1",
            "661d4a1866e0a20b6e5f11a2",
            "661d4a1866e0a20b6e5f11a3",
            "661d4a1866e0a20b6e5f11a4",
            "661d4a1866e0a20b6e5f11a5",
            "661d4a1866e0a20b6e5f11a6",
            "661d4a1866e0a20b6e5f11a7",
            "661d4a1866e0a20b6e5f11a8",
            "661d4a1866e0a20b6e5f11a9",
            "661d4a1866e0a20b6e5f11aa",
            "661d4a1866e0a20b6e5f11ab",
            "661d4a1866e0a20b6e5f11ac",
            "661d4a1866e0a20b6e5f11ad"
        ],
        "driverId": {
            "_id": "6618e19f0508bf7cea3daa12",
            "name": "Son Hung",
            "licenseNumber": "00023",
            "phone": "0919146976",
            "__v": 0
        },
        "coachId": {
            "_id": "6618e2541044e4e59eb6a42a",
            "licensePlate": "92L6-0847",
            "coachStatus": true,
            "__v": 0
        },
        "estimatedTime": 5,
        "tripPrice": 600000,
        "__v": 0
    }
]

function SearchTicketResult({ route, navigation } :any) {
    const { navigate } = useNavigation<StackNavigation>();
    const { departure, departureDescriptions, destination, destinationDescriptions, date} = route.params;
    const [choosenTrip, setChoosenTrip] = useState(Object);
    const [showAlert, setShowAlert] = useState(false);
    const [isModalTripOpened, setIsModalTripOpened] = useState(false);
    const [ trips, setTrips ] = useState<any[]>([]);
    const OnChooseTrip = (trip : any) => {
        setChoosenTrip({
            id: trip._id,
            departure: trip.departure,
            departureDescriptions: departureDescriptions, 
            departureTime: trip.departureTime,
            destination: trip.destination,
            destinationDescriptions: destinationDescriptions,
            date: date,
            tickets: trip.tickets,
            coachLicensePlate: trip.coachLicensePlate,
            driverName: trip.driverName,
            estimatedTime: trip.estimatedTime,
            tripPrice: trip.tripPrice
        })
        //console.log(trip)
        setIsModalTripOpened(true);
    }
    const OnContinueButton = () => {
        navigation.navigate('BookTicket', {
            id: choosenTrip.id,
            departure: choosenTrip.departure,
            departureDescriptions: departureDescriptions, 
            departureTime: choosenTrip.departureTime,
            destination: choosenTrip.destination,
            destinationDescriptions: destinationDescriptions,
            date: date,
            tickets: choosenTrip.tickets,
            coachLicensePlate: choosenTrip.coachLicensePlate,
            driverName: choosenTrip.driverName,
            estimatedTime: choosenTrip.estimatedTime,
            tripPrice: choosenTrip.tripPrice
        })
        //console.log(date);
        setIsModalTripOpened(false);
    }
    const handleOnCancel = () => {
        setIsModalTripOpened(false);
    }
    const handleOnBack = () => {
        navigation.goBack();
    }
    useFocusEffect(
        React.useCallback(() => {
            const fetchTrips = async () => {
                try {
                    const foundTrips = await tripDataGetter.findTripsByDepartureAndDestination(departure, destination, dateHandler.formatDBDate(date));
                    await setTrips(foundTrips);
                    if(foundTrips.length === 0) {
                        setShowAlert(true);
                    }
                  } catch (error) {
                    console.error('Error fetching trips:', error);
                  }
            };

            fetchTrips();
        }, [])
    );
    return (
        <View style={{backgroundColor: '#1CA653'}}>
            <View style={[styles.header]}>
                <View style= {{flexDirection:'row'}}>
                    <TouchableOpacity onPress={handleOnBack} style={{ paddingTop: 10}}>
                        <Icon style={{fontSize: 20, color: 'white'}} name="reply-all"></Icon>
                    </TouchableOpacity>
                    <Text style={{fontSize: 20, marginLeft: 20, color: 'white', fontWeight: '900'}}>{departure} <Icon style={{fontSize: 20, color: 'white'}} name="right-long"></Icon> {destination}</Text>
                </View>
                <Text style={{fontSize: 12, marginLeft: 40, color: 'white', fontWeight: '400', marginTop: 5, fontStyle: 'italic'}}>{dateHandler.formatVNDate(date)}</Text>
            </View>
            <View style={[styles.body]}>
                <View>
                    <View style={{paddingHorizontal: 80}}>
                        <Divider width={4} style={{marginBottom: 4}}></Divider>
                    </View>
                    <ScrollView style={{marginBottom: 150}} showsVerticalScrollIndicator={true}>
                        {trips.map((trip : any) => 
                            <Trip key={trip._id} _id={trip._id} departure={trip.departure} departureTime={trip.departureTime} destination={trip.destination} date={trip.date} coachLicensePlate={trip.coachId.licensePlate} driverName={trip.driverId.name} tickets={trip.tickets} estimatedTime={trip.estimatedTime} tripPrice={trip.tripPrice} onPressTrip={OnChooseTrip} ></Trip>
                        )}
                    </ScrollView>
                </View>
            </View>
            <Modal visible={isModalTripOpened} transparent={true} animationType='slide' onRequestClose={() => setIsModalTripOpened(false)}>
                <View style={[styles.modal]}>
                        <View style={[styles.modalHeader]}>
                            <TouchableOpacity onPress={handleOnCancel}>
                                <Icon style={{fontSize: 20, marginRight: 55}} name="arrow-left"></Icon>
                            </TouchableOpacity>
                            <Text style={{fontSize: 20}}>Chi tiết chuyến đi</Text>
                        </View>
                    <View style={[styles.modalBody]}>
                        <View style={[styles.bodyContent]}>
                            <Text style={{fontWeight: '900', fontSize: 16}}>{dateHandler.formatVNDate(date)}</Text>
                            <View style={[styles.tripDetails]}>
                                <View style={{justifyContent: 'space-between', paddingRight: 20,}}>
                                    <View>
                                        <Text>{choosenTrip.departureTime}</Text>
                                      <Text style={{fontSize: 10}}>({dateHandler.formatDate(choosenTrip.date)})</Text>

                                    </View>
                                    <Text>{timeHandler.convertHour(choosenTrip.estimatedTime)}</Text>
                                    <View>
                                        <Text>{timeHandler.addHours(choosenTrip.departureTime, choosenTrip.estimatedTime)}</Text>
                                      <Text style={{fontSize: 10}}>({dateHandler.toTimeDate(choosenTrip.departureTime, dateHandler.formatDBDate(choosenTrip.date), choosenTrip.estimatedTime)})</Text>

                                    </View>
                                </View>
                                <Divider orientation='vertical'></Divider>
                                <View style={{justifyContent: 'space-between', marginHorizontal: 10, paddingRight: 35}}>
                                    <View style={{marginBottom: 5,}}>
                                        <Text style={{fontWeight: '900'}}>{departure}</Text>
                                        <Text style={{fontStyle: 'italic'}}>{departureDescriptions}</Text>
                                    </View>
                                    <View>
                                            <View style={{flexDirection: 'row',}}>
                                                <Icon name="bus" style={{ fontSize: 16}}></Icon>
                                                <Text style={{color: '#56e865', fontSize: 16}}>  VietTravel</Text>
                                            </View>
                                            <Text style={{fontStyle: 'italic', fontSize: 12}}>{choosenTrip.coachLicensePlate}</Text>
                                            <View style={{flexDirection: 'row', paddingTop: 10, paddingRight: 30}}>
                                                <Icon style={{fontWeight: '900', paddingRight: 5, fontSize: 14, color: '#FF6666'}} name="suitcase"></Icon>
                                                <Text style={{fontWeight: '200', fontStyle: 'italic', fontSize: 14}} >Hành khách được mang theo tối đa 20kg hành lý</Text>
                                            </View>
                                            <View style={{flexDirection: 'row', paddingTop: 10, paddingRight: 30}}>
                                                <Icon style={{fontWeight: '900', paddingRight: 5, fontSize: 14, color: 'lightblue'}} name="wifi"></Icon>
                                                <Text style={{fontWeight: '200', fontStyle: 'italic', fontSize: 14}} >Có wifi miễn phí tốc độ cao</Text>
                                            </View>
                                    </View>
                                    <View style={{paddingRight: 30}}>
                                        <Text style={{fontWeight: '900'}}>{destination}</Text>
                                        <Text style={{fontStyle: 'italic'}}>{destinationDescriptions}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.modalBox]}>
                            <View style={[styles.modalContent,{flexDirection: 'row'}]}>
                                <View style={{justifyContent: 'space-between', padding: 10}}>
                                    <Text style={{fontSize: 20, fontWeight: '900'}}>Tổng tiền:</Text>
                                    <Text style={{color: 'orange' , fontSize: 20, fontWeight: '500'}}>VND {moneyHandler.convertToVND(choosenTrip.tripPrice)}</Text>
                                    <Text style={{fontStyle: 'italic', fontSize: 12}}>Đã bao gồm giá vé & thuế</Text>
                                </View>
                                <View style={[styles.continueButton]}>
                                    <TouchableOpacity onPress={OnContinueButton} style={{backgroundColor: 'orange', padding: 20, borderRadius: 10}} >
                                        <Text style={{color: 'white', fontSize: 20, fontWeight: '600'}}>Tiếp tục</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                </View>
                
            </Modal>
            <AwesomeAlert
          messageStyle={styles.alertMessage}
          confirmButtonStyle={styles.confirmButton}
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showAlert}
          showProgress={false}
          title="Rất tiếc"
          message="Chuyến mà bạn tìm hiện không có, hãy thử địa điểm hoặc ngày khác"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onConfirmPressed={() => {
            setShowAlert(false);
            navigation.goBack();
          }}
        />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        backgroundColor: '#1CA653',
    },
    body: {
        paddingTop: 10,
        paddingBottom: 40,
        height: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modal: {
        marginTop: 80,
        backgroundColor: 'white'
    },
    modalHeader: {
        padding: 20,
        backgroundColor: 'white',
        flexDirection: 'row',

    },
    modalBody: {
        margin: 20,
        backgroundColor: 'white',
        height: '65%',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
	width: 0,
	height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    bodyContent: {
        paddingVertical: 40,
        paddingRight: 60,
        paddingLeft: 30,
        height: '100%',
    },
    tripDetails: {
        marginTop: 20,
        height: '90%',
        flexDirection: 'row',
    },
    modalBox: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
    },
    modalContent: {
        margin: 5,
        justifyContent: 'space-around'
    },
    continueButton: {
        justifyContent: 'center',
    },
    alertMessage: {
        alignSelf: 'center',
      fontSize:12,
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
});

export default SearchTicketResult;