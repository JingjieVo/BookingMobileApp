import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
import Main from '../Main';
import userDAO from '../../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
function Login({ navigation } : any) {
  const { navigate } = useNavigation<StackNavigation>();
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [seeAble, setSeeAble] = useState(false);
  const seePassword = () => {
    setSeeAble(!seeAble);
}
  const hideLoading = () => {
    setShowLoading(false);
  }
  const hideAlert = () => {
    setShowAlert(false);
  }

  const handleOnCancel = () => {
    navigate('Main');
  };
  const handleOnNavigateToRegister = () => {
    navigate("Register");
  }
  const handleOnNavigateToResetPassword = () => {
    navigate("ResetPassword");
  }
  const onLoginButtonClick = async () => {
    const user = await userDAO.login(phone, password);
    setShowLoading(true);
      setTimeout(() => {
        setShowAlert(true);
        if(!user) {
          setShowLoading(false);
          return;
        }
        console.log(user);
        Toast.show({
          type: 'success',
          text1: 'Đăng nhập thành công',
          text2: `Chào mừng ${user.name} đến với HY BUS TRAVEL 👋`,
          visibilityTime: 4000,
          topOffset: 15
        });
        navigation.replace('Main')
      }, 1000)
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 76, fontSize: 16 }}>Đăng nhập</Text>
      </View>
        <View>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
          <Text style={{fontSize: 50, padding: 0, color: '#F7941D', fontWeight: '600', alignSelf: 'center'}}>Đăng nhập</Text>
        </View>
      <View style={[styles.body]}>
        <View>
          <TextInput placeholder='Số điện thoại' style={[styles.textInput]} onChangeText={setPhone}></TextInput>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 10}}>
              <TextInput placeholder='Mật khẩu' onChangeText={setPassword} secureTextEntry={!seeAble} style={[styles.textInput, {flex: 10,width: 140, marginRight: 10, paddingLeft: 10}]}></TextInput>
              <TouchableOpacity onPress={seePassword} style={{flex: 2}}>
                  <Icon name={seeAble ? "eye" : "eye-slash"} color="#1CA653" style={{fontSize: 15, color: '#1CA653', fontWeight: '900', alignSelf: 'center'}}/>
              </TouchableOpacity>
          </View>
          
        </View>
        
        <TouchableOpacity onPress={onLoginButtonClick} style={{alignSelf: 'center', margin: 20, backgroundColor: '#1CA653', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 20}}>
          <Text style={{color: 'white', fontWeight: '900'}}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: 'gray', fontStyle: 'italic'}}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={handleOnNavigateToRegister} style={{}}><Text style={{color: "#1CA653", fontWeight: '900'}}>Đăng kí ngay</Text></TouchableOpacity>
        </View>
        <View style={{alignSelf: 'center', flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity onPress={handleOnNavigateToResetPassword} style={{}}><Text style={{color: "#1CA653", fontWeight: '900', fontStyle: 'italic'}}>Quên mật khẩu?</Text></TouchableOpacity>
        </View>
      </View>
      <AwesomeAlert
          messageStyle={styles.alertMessage}
          confirmButtonStyle={styles.confirmButton}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          confirmButtonTextStyle={styles.confirmButtonText}
          show={showAlert}
          showProgress={false}
          title="Thông báo"
          message="Số điện thoại hoặc mật khẩu bị sai"
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
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    position:'relative',
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#1CA653',
      padding: 20,
    },
    body: {
      padding: 20,
    },
    titleText: {
      color: '#F7941D',
      fontWeight: '700',
    },
    descriptionText: {
      fontStyle: 'italic'
    },
    textInput: {
      fontWeight: 'bold',
      height: 50,
      marginVertical: 5,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: '#DCDEE8',
      padding: 10,
      borderRadius: 10,
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
});

export default Login;
