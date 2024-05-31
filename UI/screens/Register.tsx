import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../App";
import Main from './Main';
import Icon from 'react-native-vector-icons/FontAwesome6';
import userService from '../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Toast from 'react-native-toast-message';
function Register({navigation} : any) {
  const [seeAble, setSeeAble] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showLoading, setShowLoading] = useState(false);


  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
  const { navigate } = useNavigation<StackNavigation>();
  const seePassword = () => {
    setSeeAble(!seeAble);
}
  const handleOnCancel = () => {
    navigate('Main');
  };
  const handleOnNavigateToLogin = () => {
    navigate("Login");
  }
  const onRegister = async () => {
    if(password != confirmPassword) {
      setShowErrorAlert(true);
      return;
    }
    setShowLoading(true);
    const newUser = await userService.register(username, email, password, name, phone)
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
    Toast.show({
      type: 'success',
      text1: 'Tạo tài khoản thành công',
      text2: 'Dùng thông tìn vừa tạo để đăng nhập 👋',
      visibilityTime: 4000,
      topOffset: 15
    });
    navigation.navigate('Login')
    
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 55, fontSize: 16 }}>Người dùng mới</Text>
      </View>
      <View style={[styles.body]}>
      <View>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
          <Text style={{fontSize: 50, padding: 0, color: '#F7941D', fontWeight: '600', alignSelf: 'center'}}>Đăng ký</Text>
        </View>
        <View>
          <TextInput placeholder='Tên tài khoản' style={[styles.textInput]} onChangeText={setUsername}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập tên tài khoản ví dụ: username</Text>
        </View>
        <View>
          <TextInput placeholder='Email' style={[styles.textInput]} onChangeText={setEmail}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập tên email ví dụ: vosonhung03@gmail.com</Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 10}}>
              <TextInput placeholder='Mật khẩu' onChangeText={setPassword} secureTextEntry={!seeAble} style={[styles.textInput, {flex: 10,width: 140, marginRight: 10, paddingLeft: 10}]}></TextInput>
              <TouchableOpacity onPress={seePassword} style={{flex: 2}}>
                  <Icon name={seeAble ? "eye" : "eye-slash"} color="#1CA653" style={{fontSize: 15, color: '#1CA653', fontWeight: '900', alignSelf: 'center'}}/>
              </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 10}}>
              <TextInput placeholder='Nhập lại mật khẩu' onChangeText={setConfirmPassword} secureTextEntry={!seeAble} style={[styles.textInput, {flex: 10,width: 140, marginRight: 10, paddingLeft: 10}]}></TextInput>
            
          </View>
          <Text style={[styles.descriptionText]}>Mật khẩu và xác nhận mật khẩu phải giống nhau</Text>
        </View>
        <View>
          <TextInput placeholder='Họ và tên' style={[styles.textInput]} onChangeText={setName}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập đầy đủ họ tên ví dụ: Võ Sơn Hùng</Text>
        </View>
        <View>
          <TextInput placeholder='Số điện thoại' keyboardType='numeric' style={[styles.textInput]} onChangeText={setPhone} ></TextInput>
          <Text style={[styles.descriptionText]}>Nhập số điện thoại, vd: 0919146976</Text>
        </View>
        <TouchableOpacity onPress={onRegister} style={{alignSelf: 'center', margin: 20, backgroundColor: '#1CA653', paddingVertical: 15, paddingHorizontal: 80, borderRadius: 20}}>
          <Text style={{color: 'white', fontWeight: '900'}}>Tạo tài khoản</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: 'gray', fontStyle: 'italic'}}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={handleOnNavigateToLogin} style={{}}><Text style={{color: "#1CA653", fontWeight: '900'}}>Đăng nhập</Text></TouchableOpacity>
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
          title="Lỗi"
          message="Mật khẩu và xác nhận mật khẩu phải giống nhau"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onConfirmPressed={() => {
            setShowErrorAlert(false);
          }}
        />
        <AwesomeAlert
          messageStyle={styles.alertMessage}
          confirmButtonStyle={styles.confirmButton}
          confirmButtonTextStyle={styles.confirmButtonText}
          contentContainerStyle={{padding: 30}}
          titleStyle={{fontSize: 30, fontWeight: 'bold'}}
          show={showSuccessAlert}
          showProgress={false}
          title="Thông báo"
          message="Đăng kí thành công"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#56e865"
          onConfirmPressed={() => {
            setShowSuccessAlert(false);
            navigate('Main')
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
            //hideLoading();
          }}
          onConfirmPressed={() => {
            //hideLoading();
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

export default Register;
