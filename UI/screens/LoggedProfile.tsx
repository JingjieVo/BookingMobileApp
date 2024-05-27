
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { type StackNavigation } from "../App";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from '@rneui/themed';
import userDAO from '../Services/userServices';
import { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

function LoggedProfile({navigation} : any): React.JSX.Element{
  const { navigate } = useNavigation<StackNavigation>();
  const [loggedUser, setLoggedUser] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const hideLoading = () => {
    setShowLoading(false);
  }
  const hideAlert = () => {
    setShowAlert(false);
  }
  const handleOnNavigateToLogin = () => {
      navigate("Login");
  }
  const handleOnNavigateToRegister = () => {
      navigate("Register");
  }
  const handleOnLogout = async () => {
    await userDAO.logout();
    navigation.replace('Main')
  } 
  const getLoggedUser = async () => {
    const user = await userDAO.getUser();
    setLoggedUser(user);
    
  }
  useEffect(() => {
    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    getLoggedUser();
    if(!loggedUser){
      navigation.navigate('Main');
    }
  }, []);
  return (
    //<TouchableOpacity  onPress={handleOnNavigate}>
                            //<Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng nhập</Text>
    //</TouchableOpacity>
    
    <View style={{flex: 1,backgroundColor: "#FFFFFF", paddingBottom: 60}}>
      <View style={[styles.container, {backgroundColor: "#1CA653"}]}>
        <View>
          <Text style={{fontSize: 50, padding: 20, color: 'white', fontWeight: '600'}}>Xin chào,     <Text style= {{color: 'white', fontWeight: '600'}}>{loggedUser ? loggedUser['name'] : null}</Text> </Text>
        </View>
        
              
      </View>
      <ScrollView>
        <TouchableOpacity style= {{paddingHorizontal: 30, paddingVertical: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Thông tin cá nhân</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem thông tin và chỉnh sửa thông tin cá nhân </Text>
          </View>
          
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style= {{paddingHorizontal: 30, paddingVertical: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Một số chứng chỉ</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Một số chứng chỉ mà chúng tôi có đảm bảo an toàn cho quý khách</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 10}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity style= {{paddingHorizontal: 30, paddingVertical: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Hướng dẫn đặt vé</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "red", fontStyle: 'italic'}}>Đọc kỹ hướng dẫn trước khi đặt vé sẽ tránh được nhiều sai xót không đáng có</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 20}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
        </TouchableOpacity>
        <Divider />
        <View>
          <TouchableOpacity onPress={() => setShowAlert(true)} style={[styles.Button]}>
            <Text style={{fontSize: 20, color: '#FFFFFF', fontWeight: '600'}}>Đăng xuất</Text>
          </TouchableOpacity>
        </View> 
        
      </ScrollView>
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
          confirmButtonStyle={styles.confirmButton}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          confirmButtonTextStyle={styles.confirmButtonText}
          show={showAlert}
          showProgress={false}
          title="Thông báo"
          message="Bạn có chắc muốn đăng xuất không?"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onCancelPressed={() => {
            hideAlert();
          }}
          onConfirmPressed={() => {
            hideAlert();
            handleOnLogout();
          }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 0,
    borderBottomRightRadius: 40,
  },
  Button: {
    paddingHorizontal: 100,
    alignSelf: 'center',
    backgroundColor: "#1CA653",
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  Button2: {
    paddingHorizontal: 100,
    alignSelf: 'center',
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  Button3: {
    paddingHorizontal: 20,
    alignSelf: 'center',
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  alertMessage: {
    fontSize:14,
    fontStyle: 'italic',
    textAlign: 'center'
  },
  confirmButton: {
      height: 30,
      width: 60
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

export default LoggedProfile;