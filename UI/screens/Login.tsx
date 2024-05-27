import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../App";
import Main from './Main';
import userDAO from '../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
function Login({ navigation } : any) {
  const { navigate } = useNavigation<StackNavigation>();
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
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
        navigation.replace('Main')
      }, 1000)
  }
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'gray', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 75, fontSize: 16 }}>Đăng nhập</Text>
      </View>
        <View>
          <Text style={{fontSize: 50, padding: 20, color: '#000000', fontWeight: '600'}}>Đăng nhập vào<Text style= {{color: '#56e865', fontWeight: '600'}}> Tài khoản</Text> </Text>
        </View>
      <View style={[styles.body]}>
        <View>
          <Text style={[styles.titleText]}>Số điện thoại</Text>
          <TextInput value={phone} keyboardType='numeric' style={[styles.textInput]} onChangeText={setPhone}></TextInput>
        </View>
        <View>
          <Text style={[styles.titleText]}>Mật khẩu</Text>
          <TextInput value={password} secureTextEntry={true} style={[styles.textInput]} onChangeText={setPassword}></TextInput>
        </View>
        
        <TouchableOpacity onPress={onLoginButtonClick} style={{alignSelf: 'center', margin: 20, backgroundColor: '#56e865', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20}}>
          <Text>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: 'gray', fontStyle: 'italic'}}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={handleOnNavigateToRegister} style={{}}><Text style={{color: "#76A1F5"}}>Đăng kí ngay</Text></TouchableOpacity>
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
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#56e865',
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
      height: 40,
      marginVertical: 5,
      backgroundColor: "#F2F4F3",
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
