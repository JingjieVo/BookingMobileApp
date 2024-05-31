import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
function ResetPassword({ navigation } : any) {
  const { navigate } = useNavigation<StackNavigation>();
  const [showLoading, setShowLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [Email, setEmail] = useState("");
  const [loggedUser, setLoggedUser] = useState("");
  const [seeAble, setSeeAble] = useState(false);


  const handleOnCancel = () => {
    navigate('Main');
  };
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 50, fontSize: 16 }}>Hướng dẫn sử dụng</Text>
      </View>
      <ScrollView style={[styles.body]}>
        <Text style={[styles.title]}>Hướng dẫn đặt vé</Text>
        <View>
            <Text style={[styles.boldText]}>Bước 1: <Text style={styles.paragraph}>Ở giao diện đặt vé, chọn điểm đến và điểm đi</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step1.1.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 2: <Text style={styles.paragraph}>Ở đây, ta chọn chuyến đi phù hợp</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step2.jpg')}
                    />
                    <Text style={[styles.boldText]}>Bước 3: <Text style={styles.paragraph}>Ở giao diện đặt vé, chọn điểm đến và điểm đi</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step1.1.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 4: <Text style={styles.paragraph}>Ở đây, ta chọn tiếp tục</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step3.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 5: <Text style={styles.paragraph}>Ở đây, ta điền thông tin</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step3.1.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 6: <Text style={styles.paragraph}>Ta chọn ghế (tùy chọn) nếu không muốn chọn nữa thì bấm xóa chỗ:</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step3.2.jpg')}
                    /> 
            <Text style={[styles.boldText]}>Bước 7: <Text style={styles.paragraph}>Ta xác nhận thông tin đã điền, hãy chắc chắn rằng thông tin giống với CCCD để tránh sai xót:</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step4.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 8: <Text style={styles.paragraph}>Sau khi thanh toán, ta chọn kiểm tra thanh toán</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step5.jpg')}
                    />
            <Text style={[styles.boldText]}>Bước 9: <Text style={styles.paragraph}>Ta có thể xem hóa đơn ở đây</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step6.jpg')}
                    /> 
            <Text style={[styles.boldText]}><Text style={styles.paragraph}>Ta có thể xem vé ở mục vé của tôi</Text></Text>
            <Image
                    style={styles.coverImage}
                    source={require('../../assets/img/step7.jpg')}
                    />    
            <Text style={[styles.boldText]}><Text style={styles.paragraph}>Ở đây, ta có thẻ xem thông tin vé và xuất vé thành file pdf</Text></Text>
            <Image
                    style={[styles.coverImage, {paddingBottom: 20}]}
                    source={require('../../assets/img/step8.jpg')}
                    />        
        </View>

        <View>


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#1CA653',
        padding: 20,
    },
    body: {
        margin: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginHorizontal: 15,
        marginVertical: 10,
    },
    coverImage: {
        width: '80%',
        height: 550,
        alignSelf: 'center',
        borderRadius: 10,
    },
    paragraph: {
        marginVertical: 10,
        marginHorizontal: 15,
        fontSize: 16,
        color: 'black',
        fontWeight: '300',
        fontStyle: 'italic',
    },
    boldText: {
        marginHorizontal: 15,
        fontWeight: 'bold',
        color: 'black'
    }
    
});

export default ResetPassword;
