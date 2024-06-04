
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

const props: any[] = [
  {
    "guestName": "qwe",
    "identifyNumber": "369",
    "ticket": {
        "_id": "6654bde1fe0292d76cce708a",
        "tripId": "6654bde1fe0292d76cce7080",
        "available": true,
        "isBought": true,
        "seatCode": "10A",
        "__v": 0
    },
    "dateBooking": "2024-05-27T20:25:53.983Z",
    "tripId": "6654bde1fe0292d76cce7080",
    "departureTime": "11:00",
    "date": "2024/05/28",
    "departure": "Ho Chi Minh",
    "departureDescriptions": "Đường Lê Hồng Phong, Phường 1, Quận 10, TP.HCM",
    "destination": "Da Nang",
    "destinationDescriptions": "201- Đường Tôn Đức Thắng, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng",
    "estimatedTime": "18",
    "arrivalTime": "05:00",
    "arrivalDate": "29/05/2024",
    "driverName": "Son Hung",
    "coachLicensePlate": "92L6-0847",
    "billId": "6654ec48a4f82aee38dc971c",
    "_id": "6654ec51a4f82aee38dc972c"
  }
]

function MyTickets() {
  const { navigate } = useNavigation<StackNavigation>();
  const [choosenTicket, setChoosenTicket] = useState(Object);
  const [isModalTripOpened, setIsModalTripOpened] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [ userTicketList, setUserTicketList ] = useState<any[]>([]);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);

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
  const handleOnNavigateToLogin = () => {
    navigate("Login");
  }
  const handleOnNavigateToRegister = () => {
    navigate("Register");
}
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
    setShowDownloadAlert(true);
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
          <Text style={{fontWeight: '900', fontSize: 24, color: '#F7941D'}}>
            VÉ CỦA TÔI
          </Text>
        </View>
        <View style={{bottom: 100}}>
          <View style={{alignSelf: 'center'}}>
            <Text style={{fontStyle: 'italic'}}>Bạn phải đăng nhập để có thể xem vé của mình</Text>
          </View>
          <TouchableOpacity onPress={handleOnNavigateToLogin} style={[styles.Button]}>
            <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '600'}}>Số điện thoại</Text>
          </TouchableOpacity>
          <View style={{ paddingTop: 15,alignSelf: 'center', flexDirection: 'row'}}>
            <Text style={{color: 'gray', fontStyle: 'italic'}}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity onPress={handleOnNavigateToRegister} style={{}}><Text style={{color: "#76A1F5"}}>Đăng kí ngay</Text></TouchableOpacity>
          </View>
        </View>
        
        
      </View>
      
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
    shadowColor: "#fff",
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
  },
  Button: {
    paddingHorizontal: 100,
    alignSelf: 'center',
    backgroundColor: "#1CA653",
    paddingVertical: 20,
    marginTop: 20,
    borderRadius: 8,
  },
})

export default MyTickets;