import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../App";
import Main from './Main';
function Register() {
  const { navigate } = useNavigation<StackNavigation>();
  const handleOnCancel = () => {
    navigate('Main');
  };
  const handleOnNavigateToLogin = () => {
    navigate("Login");
}
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'gray', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 60, fontSize: 16 }}>Người dùng mới</Text>
      </View>
      <View style={[styles.body]}>
        <View>
          <Text style={[styles.titleText]}>Tên tài khoản</Text>
          <TextInput style={[styles.textInput]}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập tên tài khoản ví dụ: username</Text>
        </View>
        <View>
          <Text style={[styles.titleText]}>Email</Text>
          <TextInput  style={[styles.textInput]}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập tên email ví dụ: vosonhung03@gmail.com</Text>
        </View>
        <View>
          <Text style={[styles.titleText]}>Mật khẩu</Text>
          <TextInput secureTextEntry={true} style={[styles.textInput]}></TextInput>
          <Text style={[styles.descriptionText]}>Mật khẩu chứa ít nhất 6 kí tự</Text>
        </View>
        <View>
          <Text style={[styles.titleText]}>Họ và tên</Text>
          <TextInput style={[styles.textInput]}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập đầy đủ họ tên ví dụ: Võ Sơn Hùng</Text>
        </View>
        <View>
          <Text style={[styles.titleText]}>Số điện thoại</Text>
          <TextInput keyboardType='numeric' style={[styles.textInput]}></TextInput>
          <Text style={[styles.descriptionText]}>Nhập số điện thoại, vd: 0919146976</Text>
        </View>
        <TouchableOpacity style={{alignSelf: 'center', margin: 20, backgroundColor: '#56e865', paddingVertical: 20, paddingHorizontal: 40, borderRadius: 20}}>
          <Text>Tạo tài khoản</Text>
        </TouchableOpacity>
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: 'gray', fontStyle: 'italic'}}>Bạn đã có tài khoản? </Text>
          <TouchableOpacity onPress={handleOnNavigateToLogin} style={{}}><Text style={{color: "#76A1F5"}}>Đăng nhập</Text></TouchableOpacity>
        </View>
      </View>
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
});

export default Register;
