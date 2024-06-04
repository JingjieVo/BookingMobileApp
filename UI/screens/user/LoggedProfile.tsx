
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { type StackNavigation } from "../../App";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from '@rneui/themed';
import userDAO from '../../Services/userServices';
import { useEffect, useState } from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

function LoggedProfile({navigation} : any): React.JSX.Element{
  const { navigate } = useNavigation<StackNavigation>();
  const [loggedUser, setLoggedUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [role, setRole] = useState(null);
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
  const navigateToAdminMain = () => {
    navigate('AdminMain')
  } 
  const getLoggedUser = async () => {
    const user = await userDAO.getUser();
    setLoggedUser(user);
    if(user) {
      setUserId(user._id);
      setUsername(user.username);
      setName(user.name);
      setEmail(user.email);
      setPassword(user.password);
      setPhone(user.phone);
      setRole(user.role);
    }
    
  }
  const onNavigateToTutorial = () => {
    navigation.navigate('Tutorial');
  }
  const testShowToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋',
      visibilityTime: 4000,
      topOffset: 15
    });
  }
  const onClickEditButton = () => {
    navigation.navigate('EditProfile', {
      userId: userId,
      username: username,
      email: email,
      password: password,
      name: name,
      phone: phone,
      role: role
    })
    //console.log(userId);
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
          <Text style={{fontSize: 50, padding: 20, color: 'white', fontWeight: '600'}}>Xin chào,     <Text style= {{color: '#F7941D', fontWeight: '600'}}>{loggedUser ? loggedUser['name'] : null}</Text> </Text>
        </View>
        
              
      </View>
      <ScrollView>
        <View style={[]}>
          <TouchableOpacity onPress={onClickEditButton} style= {[styles.editProfileButton]}>
            <View>
              <Icon1 name="account-edit" color="#F7941D" style={{fontSize: 40}} />
            </View>
            <View>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Thông tin cá nhân</Text>
              <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem và chỉnh sửa thông tin</Text>
            </View>
          </TouchableOpacity>
        </View>
        {role === 'admin' ? <View style={[]}>
        <TouchableOpacity onPress={navigateToAdminMain} style= {[styles.editProfileButton, {marginTop: 5}]}>
          <View>
            <Icon2 name="user-gear" color="#56e865" style={{fontSize: 40}} />
          </View>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Admin</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Xem và chỉnh sửa thông tin</Text>
          </View>
        </TouchableOpacity>
        </View> : <View></View>}
        <Divider />
        <TouchableOpacity onPress={testShowToast} style= {{paddingHorizontal: 30, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Một số chứng chỉ</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "green", fontStyle: 'italic'}}>Một số chứng chỉ mà chúng tôi có đảm bảo an toàn cho quý khách</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 10}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={onNavigateToTutorial} style= {{paddingHorizontal: 30, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
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
    marginTop: 10,
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
  },
  editProfileButton: {
    paddingHorizontal: 30, 
    paddingVertical: 15, 
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  }
})

export default LoggedProfile;