
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler, Image, Modal, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
import Toast from 'react-native-toast-message';

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


function EditProfile({ navigation, route } : any) {
    const [isChange, setIsChange] = useState(false);
    const [choosenTicket, setChoosenTicket] = useState(Object);
    const [isModalTripOpened, setIsModalTripOpened] = useState(false);
    const [loggedUser, setLoggedUser] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [userTicketList, setUserTicketList ] = useState<any[]>([]);
    const [showCancelAlert, setShowCancelAlert] = useState(false);
    const [showUpdateAlert, setShowUpdateAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [seeAble, setSeeAble] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const {
        userId, username, email, password, name, phone, role
    } = route.params
    const seePassword = () => {
        setSeeAble(!seeAble);
    }
    const hideLoading = () => {
        setShowLoading(false);
      }
    const handleUsernameChange = (text : any) => {
        setNewUsername(text);
        setIsChange(true);
    };
    const handleEmailChange = (text : any) => {
        setNewEmail(text);
        setIsChange(true);
    };
    const handlePasswordChange = (text : any) => {
        setNewPassword(text);
        setIsChange(true);
    };
    const handleNameChange = (text : any) => {
        setNewName(text);
        setIsChange(true);
    };
    const handlePhoneChange = (text : any) => {
        setNewPhone(text);
        setIsChange(true);
    };
    const onPressUpdate = () => {
        setShowUpdateAlert(true);
    }
    const getLoggedUser = async () => {
        const user = await userService.getUser();
        if(user) {
          setLoggedUser(user);
        }
      }
    const displaySuccessAlert = () => {
        setShowSuccessAlert(true);
    }
    const handleUpdate = async () => {  
      
        const user = {
          username: newUsername !== '' ? newUsername : username,
          email: newEmail !== '' ? newEmail : email,
          password: newPassword !== '' ? newPassword : password,
          name: newName !== '' ? newName : name,
          phone: newPhone !== '' ? newPhone : phone,
          role : role,
        };
        await userService.update(userId, user);
        console.log('Updating user with the following data:', user);
        setShowLoading(true);

        setTimeout(() => {
            setShowLoading(false);
            Toast.show({
              type: 'success',
              text1: 'Cập nhật thành công',
              text2: 'Cập thông tin của người dùng thành công',
              visibilityTime: 4000,
              topOffset: 15
            });
            navigation.replace('Main');  
        }, 2000);
        
        //console.log(newUsername)
    }
    const handleOnCancel = () => {
        setShowCancelAlert(true);
    }
  useEffect(() => {      
    const backAction = () => {
      if(isChange) {
          setShowCancelAlert(true);
          return true;
      }
      else {
          return false;
      }       
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );
    return () => {
        backHandler.remove();
    };
}, [isUpdating]); 
  return (
    <View style={{backgroundColor: "#1CA653", flex: 1}}>
        <View style={[styles.body]}>
            <View style={{flexDirection: 'row'}}>
                <Image
                style={styles.tinyLogo}
                source={require('../assets/img/avt.png')}
                />
                <View style={{position: 'relative', bottom: 30, left: 30,}}>
                    <Text style={{fontSize: 18, fontWeight: '900', color: 'white'}}>{name}</Text>
                </View>
                
            </View>
            <View style={{position: 'relative', bottom: 70, left: 25,}}>
                <Text style={{fontSize: 18, fontWeight: '900', color: 'black'}}>Thông tin tài khoản</Text>
                <Text style={{fontSize: 12, fontWeight: '400', color: 'black', fontStyle: 'italic', paddingRight: 30}}>Bạn có thể sửa thông tin sau đó bấm cập nhật thông tin để áp dụng thay đổi</Text>
            </View>
            <TouchableOpacity onPress={handleOnCancel}  style={[styles.activeCancel,{position: 'absolute', alignSelf: 'center', margin: 0, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, top: 20, right: 30}]}>
                    <Text style={{color: 'white'}}>Hủy chỉnh sửa</Text>
                </TouchableOpacity>
            <ScrollView style={[{padding: 20, bottom: 80}]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 10, flex: 4}}>
                        <Text style={[styles.titleText]}>Tên tài khoản</Text>
                    </View>
                    <TextInput style={[styles.textInput]} onChangeText={handleUsernameChange}>{username}</TextInput>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 10, flex: 4}}>
                        <Text style={[styles.titleText]}> Email</Text>
                    </View>
                    <TextInput style={[styles.textInput]} onChangeText={handleEmailChange}>{email}</TextInput>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{paddingLeft: 5, flex: 6}}>
                        <Text style={[styles.titleText]}>   Mật khẩu</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 10}}>
                        <TextInput onChangeText={handlePasswordChange} secureTextEntry={!seeAble} style={[styles.textInput, {flex: 6,width: 140, marginRight: 10, paddingLeft: 10}]}>
                        {password}
                        </TextInput>
                        <TouchableOpacity onPress={seePassword} style={{flex: 2}}>
                            <Icon name={seeAble ? "eye" : "eye-slash"} color="#1CA653" style={{fontSize: 15, color: '#1CA653', fontWeight: '900', alignSelf: 'center'}}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 10, flex: 4}}>
                        <Text style={[styles.titleText]}> Họ và tên</Text>
                    </View>
                    <TextInput style={[styles.textInput]} onChangeText={handleNameChange}>{name}</TextInput>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <View style={{paddingHorizontal: 10, flex: 4}}>
                        <Text style={[styles.titleText]}> Số điện thoại</Text>
                    </View>
                    <TextInput keyboardType='numeric' style={[styles.textInput]} onChangeText={handlePhoneChange}>{phone}</TextInput>
                </View>
                <TouchableOpacity onPress={handleUpdate} disabled={!isChange} style={[isChange ? styles.isChangedColor : styles.isNotChangedColor,{alignSelf: 'center', margin: 20, paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20}]}>
                    <Text style={{color: 'white'}}>Cập nhật tài khoản</Text>
                </TouchableOpacity>
                <View style={{alignSelf: 'center', flexDirection: 'row'}}>
                </View>
            </ScrollView>
        </View>
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showCancelAlert}
          showProgress={false}
          title="Thông báo"
          message="Bạn có muốn hủy thay đổi không?"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Có"
          cancelText='không'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            setShowCancelAlert(false);
          }}
          onConfirmPressed={() => {
            setShowCancelAlert(false);
            navigation.navigate('Main');  
          }}
        />
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showUpdateAlert}
          showProgress={false}
          title="Thông báo"
          message="Bạn có chắc muốn cập nhật thông tin?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={true}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="Có"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            setShowUpdateAlert(false);
          }}
          onConfirmPressed={ () => {
            //setShowUpdateAlert(false); 
            handleUpdate();
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
          message="Cập nhật thông tin thành công"
          closeOnTouchOutside={false}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="Về màn hình chính"
          cancelText='Hủy'
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
          }}
          onConfirmPressed={() => {
            setShowSuccessAlert(false);
            navigation.replace('Main');  
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
    </View>
  );
}

const styles = StyleSheet.create({
    isChangedColor: {
        backgroundColor: '#56e865',
    },
    isNotChangedColor: {
        backgroundColor: '#1CA653',
    },
    inactiveCancel: {
        backgroundColor: 'gray',

    },
    activeCancel: {
        backgroundColor: 'red',

    },
  coverImage: {
    position: 'absolute',
    width: 400,
    height: 180,
    alignSelf: 'center',
  },
  body: {
    marginTop: 140,
    backgroundColor: 'white',
  },
  tinyLogo: {
    borderWidth: 3,
    borderColor: '#F7941D',
    position:'relative',
    bottom: 90,
    left: 10,
    width: 140,
    height: 140,
    borderRadius: 100,
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
      paddingHorizontal: 12,
  },
  textAlert: {
    textAlign: 'center',
    fontWeight: '900',
  },
  titleText: {
    marginRight: 10,
    fontWeight: '700',
  },
  descriptionText: {
    fontStyle: 'italic'
  },
  textInput: {
    flex: 7,
    fontWeight: 'bold',
    height: 40,
    width: 170,
    marginVertical: 5,
    backgroundColor: "#F2F4F3",
    padding: 10,
    borderRadius: 10,
  },
})

export default EditProfile;