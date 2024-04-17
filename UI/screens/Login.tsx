import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../App";
import Main from './Main';
const Login = () => {
    const { navigate } = useNavigation<StackNavigation>();

    const handleOnNavigate = () => {
        navigate("Main");
        setModalLoginVisible(false);
        setModalRegisterVisible(false);
    }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
    const [modalLoginVisible, setModalLoginVisible] = useState(false);
    const [modalRegisterVisible, setModalRegisterVisible] = useState(false);
  const handleLogin = () => {
    // Xử lý đăng nhập
    console.log('Đăng nhập với email:', email, 'và mật khẩu:', password);
  };
  const handleCloseModal = () => {
    setModalLoginVisible(false);
    setModalRegisterVisible(false);

  };
  return (
    <View>
        <ImageBackground style={[styles.backgroundImage]} source={require("../assets/img/loginbackground.jpg")}>
        <View style={{flexDirection: 'column', justifyContent: 'space-around'}}>
            <View style={{paddingVertical: 100, marginVertical: 50}}>
                <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 32, color: 'white'}}>XIN CHÀO QUÝ KHÁCH</Text>
            </View>
            <View style={{paddingVertical: 50, marginTop: 50}}>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>Bạn đã có tài khoản?</Text>
                <TouchableOpacity style={styles.button} onPress={() => setModalLoginVisible(true)} >
                    <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
            
            <View style={{paddingVertical: 50}}>
                <Text style={{alignSelf: 'center', color: 'white', fontSize: 20}}>Bạn chưa có tài khoản?</Text>
                <TouchableOpacity style={styles.button} onPress={() => setModalRegisterVisible(true)} >
                    <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </View>
        <Modal
            style={styles.modalView}
            transparent={true}
            visible={modalLoginVisible}
            onRequestClose={() => {
                setModalLoginVisible(!modalLoginVisible);
        }}>
            <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPressOut={handleCloseModal} // Khi chạm vào bên ngoài modal
            >
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Đăng Nhập</Text>
                    <View style={{width: "80%"}}>
                        <Text>Tên đăng nhập</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            value={password}
                        onChangeText={setPassword}
                        />
                        <TouchableOpacity style={styles.modalButton} onPress={handleOnNavigate}>
                            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
        <Modal
            style={styles.modalView}
            transparent={true}
            visible={modalRegisterVisible}
            onRequestClose={() => {
                setModalLoginVisible(!modalRegisterVisible);
        }}>
            <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPressOut={handleCloseModal} // Khi chạm vào bên ngoài modal
            >
            <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Đăng Ký</Text>
                    <View style={{width: "80%"}}>
                        <Text>Tên đăng nhập</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <Text>Mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            value={password}
                        onChangeText={setPassword}
                        />
                        <Text>Nhập lại mật khẩu</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Mật khẩu"
                            secureTextEntry
                            value={confirmpassword}
                        onChangeText={setConfirmPassword}
                        />
                    <TouchableOpacity style={styles.modalButton} >
                        <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng Ký</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
            </TouchableOpacity>
        </Modal>
        </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        backgroundColor: 'transparent', // Không có màu nền
    },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 30,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 12,
        },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderBottomColor: 'transparent'
  },
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#4cc5f5',
    padding: 15,
    marginTop: 10,
    paddingHorizontal: 100,
    borderRadius: 10,
  },
  modalButton: {
    marginTop: 15,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#04e013',
    paddingHorizontal: 50,
    padding: 10,
    borderRadius: 10,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
});

export default Login;
