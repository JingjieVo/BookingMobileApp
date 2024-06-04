
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, Modal, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ticket from '../../components/ticket';
import { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import dateHandler from '../../module/dateHandler';
import timeHandler from '../../module/timeHandler';
import pdfGenerator from '../../module/pdfGenerator';
import { Divider } from '@rneui/base';
import bookingService from '../../Services/bookingServices';
import userService from '../../Services/userServices';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import AwesomeAlert from 'react-native-awesome-alerts';
import { StackNavigation } from '../../App';
import moneyHandler from '../../module/moneyHandler';
import Toast from 'react-native-toast-message';

const props: any[] = [
  {
      "guestName": "Võ Sơn Hùng",
      "identifyNumber": "206345943",
      "ticket": {
          "_id": "665610c6923dccdac12b7fdc",
          "tripId": "665610c6923dccdac12b7fd7",
          "available": true,
          "isBought": true,
          "seatCode": "5A",
          "__v": 0
      },
      "dateBooking": "2024-05-29T14:53:20.376Z",
      "tripId": "665610c6923dccdac12b7fd7",
      "departureTime": "11:00",
      "date": "2024/05/29",
      "departure": "Ho Chi Minh",
      "departureDescriptions": "Đường Lê Hồng Phong, Phường 1, Quận 10, TP.HCM",
      "destination": "Da Nang",
      "destinationDescriptions": "201- Đường Tôn Đức Thắng, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng",
      "estimatedTime": "18",
      "arrivalTime": "05:00",
      "arrivalDate": "30/05/2024",
      "driverName": "Son Hung",
      "coachLicensePlate": "92L6-0847",
      "billId": {
          "_id": "6657415b2587fc7d8a0927ed",
          "userId": "65e6156917f02694769d490f",
          "tripId": "665610c6923dccdac12b7fd7",
          "price": 620000,
          "billStatus": "FINISHED",
          "createdAt": "2024-05-29T14:53:15.983Z",
          "__v": 0
      },
      "_id": "665741602587fc7d8a0927f4"
  }
]

function LoggedMyTickets() {
  const [choosenTicket, setChoosenTicket] = useState(Object);
  const [isModalTripOpened, setIsModalTripOpened] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [ userTicketList, setUserTicketList ] = useState<any[]>([]);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);
  const { navigate } = useNavigation<StackNavigation>();

  const handleOnCancel = () => {
    setIsModalTripOpened(false);
  }
  const hideDownloadAlert = () => {
    setShowDownloadAlert(false);
  }
  const onChooseTicket = (ticket : any) => {
    setChoosenTicket(ticket);
    setIsModalTripOpened(true);
    //console.log(choosenTicket);
    //console.log(userTicketList);
  }
  
  const getLoggedUser = async () => {
    const user = await userService.getUser();
        setLoggedUser(user);
        if (user) {
            setLoggedUserId(user._id);
        }
  }
  const isUserTicketListEmpty = userTicketList.length === 0;
  const getLoggedUserTickets = async (userId : any) => {
    
    const user = await userService.getUser();
    //setUserTicketList(tickets);
    if (user) {
      const tickets = await bookingService.getUserBookingList(user._id);
      setUserTicketList(tickets);
    }
  }
  const handleOnExportTicket = async() => {
    await pdfGenerator.createPDF(choosenTicket);
    Toast.show({
      type: 'success',
      text1: 'Xuất vé thành công',
      text2: 'Xem vé ở thư mục Downloads của thiết bị của bạn',
      visibilityTime: 4000,
      topOffset: 15
    });
  }
  useEffect(() => {      
    getLoggedUser();
    setLoggedUserId(loggedUser ? loggedUser['_id'] : null)
    getLoggedUserTickets(loggedUserId);
}, []); 
  return (
    <View style={{backgroundColor: "#1CA653", flex: 1}}>
      <Image
          style={[styles.coverImage]}
          source={require('../assets/img/a1.png')}
        />
      <View style={{marginTop: 130, backgroundColor: 'white', flex: 1, borderTopLeftRadius: 15, borderTopRightRadius: 15}}>
        <View style={{marginHorizontal: 40, top: 10}}>
            <Divider width={4} style={{marginBottom: 2}} color='#078511'></Divider>
        </View>
        
      <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
        <View style={{alignSelf: 'center', marginBottom: 30, bottom: 90}}>
          <Text style={{fontWeight: '900', fontSize: 24, color: '#F7941D', alignSelf: 'center'}}>
            VÉ CỦA TÔI
          </Text>
          {isUserTicketListEmpty ? <Text style={{fontWeight: '400', fontSize: 12, color: 'gray', alignSelf: 'center', fontStyle: 'italic'}}>
            Không có vé nào được hiển thị
          </Text> : <Text></Text>}
        </View>
        <View style={[styles.ticketList]}>
          <ScrollView>
            {userTicketList.reverse().map((ticket : any)=> <Ticket key={ticket._id} _id={ticket._id} guestName={ticket.guestName} identifyNumber={ticket.identifyNumber} ticket={ticket.ticket} departureTime={ticket.departureTime} date={ticket.date} departure={ticket.departure}
                  departureDescriptions={ticket.departureDescriptions} destinationDescriptions={ticket.destinationDescriptions} estimatedTime={ticket.estimatedTime} driverName={ticket.driverName} coachLicensePlate={ticket.coachLicensePlate} 
                  destination={ticket.destination} arrivalTime={ticket.arrivalTime} arrivalDate={ticket.arrivalDate}  billId={ticket.billId} dateBooking={ticket.dateBooking} tripId={ticket.tripId}
            onPressTicket={onChooseTicket}></Ticket>)}
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
                    <ScrollView contentContainerStyle={{ height: '135%'}}>
                    <TouchableOpacity onPress={handleOnExportTicket} style={styles.downloadButton}>
                                <View style={{flexDirection: 'row'}}>
                                  <Icon color='red' style={{fontSize: 20, marginLeft: 10, marginRight: 10}} name="download"></Icon>
                                  <Text style={{fontSize: 18}}>In vé</Text>
                                </View>
                            </TouchableOpacity>
                    <View style={{marginLeft: 25, marginTop: 15}}>
                      <Text style={{fontSize: 16}}><Text style={{fontSize: 16, fontWeight: '900'}}>Ngày đặt vé:</Text> {dateHandler.formatVNDateForTrip(choosenTicket.dateBooking)}</Text>
                    </View>
                    <View style={{marginLeft: 25, marginTop: 15}}>
                      <Text style={{fontSize: 16}}><Text style={{fontSize: 16, fontWeight: '900'}}>Giá vé:</Text> {moneyHandler.convertToVND(choosenTicket.billId ? choosenTicket.billId.price : "60000")}VND</Text>
                    </View>
                    <View style={[styles.modalBody]}>
                        <View style={[styles.bodyContent]}>
                            <Text style={{fontWeight: '900', fontSize: 16}}>{dateHandler.formatVNDate(choosenTicket.date)}</Text>
                            <View style={[styles.tripDetails]}>
                                <View style={{justifyContent: 'space-between', paddingRight: 10,}}>
                                    <View>
                                      <Text>{choosenTicket.departureTime}</Text>
                                      <Text style={{fontSize: 10}}>({dateHandler.formatDate(choosenTicket.date)})</Text>
                                    </View>
                                    <Text>{timeHandler.convertHour(choosenTicket.estimatedTime)}</Text>
                                    <View>
                                      <Text>{timeHandler.addHours(choosenTicket.departureTime, choosenTicket.estimatedTime)}</Text>
                                      <Text style={{fontSize: 10}}>({choosenTicket.arrivalDate})</Text>
                                    </View>
                                </View>
                                <Divider orientation='vertical'></Divider>
                                <View style={{justifyContent: 'space-between', marginHorizontal: 10, paddingRight: 35}}>
                                    <View style={{marginBottom: 5,}}>
                                        <Text style={{fontWeight: '900'}}>{choosenTicket.departure}</Text>
                                        <Text style={{fontStyle: 'italic'}}>{choosenTicket.departureDescriptions}</Text>
                                    </View>
                                    <View>
                                            <View style={{flexDirection: 'row',}}>
                                                <Icon name="bus" style={{ fontSize: 16}}></Icon>
                                                <Text style={{color: '#56e865', fontSize: 16}}>  VietTravel</Text>
                                            </View>
                                            <Text style={{fontStyle: 'italic', fontSize: 12}}>{choosenTicket.coachLicensePlate}</Text>
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
                                        <Text style={{fontWeight: '900'}}>{choosenTicket.destination}</Text>
                                        <Text style={{fontStyle: 'italic'}}>{choosenTicket.destinationDescriptions}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.BillBody]}>
                        <View style={[styles.billContent]}>
                            <Text style={{alignSelf: 'center', fontWeight: '800'}}>Thông tin hành khách</Text>
                            <View style={{marginTop: 20}}>
      
                              <Text style={{fontWeight: '700',color: 'red'}}><Icon color='#078511' name="user" style={{ fontSize: 16}}></Icon> <Text style={{fontWeight: '900', color: 'gray'}}>Tên hành khách:        </Text>{choosenTicket.guestName}</Text>
                              <Text style={{fontWeight: '700',marginTop: 20, color: 'red'}}><Icon color='red' name="id-card" style={{ fontSize: 16}}></Icon> <Text style={{fontWeight: '900', color: 'gray'}}>Số CCCD:                    </Text>{choosenTicket.identifyNumber}</Text>
                              <Text style={{fontWeight: '700',marginTop: 20, color: 'red'}}><Icon color='lightblue' name="tag" style={{ fontSize: 16}}></Icon> <Text style={{fontWeight: '900', color: 'gray'}}>Số ghế:                        </Text>{choosenTicket.ticket ? choosenTicket.ticket.seatCode : "Null"}</Text>
                            </View>
                        </View>
                    </View>
                    </ScrollView>
                </View>
                <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showDownloadAlert}
          showProgress={true}
          title="Thông báo"
          message="Vé của bạn đã được lưu trong thư mục download của máy"
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
            hideDownloadAlert();
            
          }}
        />
            </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  coverImage: {
    position: 'absolute',
    width: 400,
    height: 180,
    alignSelf: 'center',
  },
  tinyLogo: {
    position:'relative',
    bottom: 90,
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
  ticketList: {
    //position:'relative',
    bottom: 100,
    width: 300,
    height: 320,
    alignSelf: 'center',
    shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
  },
  modal: {
      marginTop: 90,
      backgroundColor: 'white',
      height: '100%'
  },
  modalHeader: {
      padding: 20,
      backgroundColor: 'white',
      flexDirection: 'row',

  },
  modalBody: {
      margin: 20,
      backgroundColor: 'white',
      height: 400,
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
  BillBody: {
    margin: 20,
    marginTop: 5,
    backgroundColor: 'white',
    height: 170,
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
    paddingBottom: 70,
    height: '100%',
  },
  billContent: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    height: '100%',
  },
  tripDetails: {
    marginTop: 20,
    height: '90%',
    flexDirection: 'row',
  },
  downloadButton: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 190,
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

export default LoggedMyTickets;