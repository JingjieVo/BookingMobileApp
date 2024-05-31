import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
function Page1({ navigation } : any) {
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
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 30, fontSize: 16 }}>HY TRAVELBUS TIN TỨC</Text>
      </View>
      <ScrollView style={[styles.body]}>
        <Text style={[styles.title]}>CHƯƠNG TRÌNH KHUYẾN MÃI KHAI TRƯƠNG CHUYẾN XE MỚI</Text>
        <View>
        <Image
                style={styles.coverImage}
                source={require('../../assets/img/a2.png')}
                />
        </View>
        <View>
            <Text style={[styles.paragraph]}>Vào tháng 4 năm 2024, HY travelbus chính thức khai trương tuyến xe mới kết nối thành phố Hồ Chí Minh và thành phố Đà Nẵng. Để chào mừng sự kiện này, công ty đã triển khai một chương trình khuyến mãi hấp dẫn dành cho khách hàng.</Text>
            <Text style={[styles.paragraph]}>Theo đó, trong thời gian từ 20/04/2023 đến 24/04/2023, khách hàng mua vé trên tuyến xe mới sẽ được hưởng các ưu đãi sau:</Text>
            <Text style={[styles.boldText, {paddingLeft: 40}]}>1. Giảm 30% trên giá vé thường</Text>
            <Text style={[styles.boldText, {paddingLeft: 40}]}>2. Tặng 01 bữa ăn nhẹ miễn phí trên chuyến xe: Các món ăn nhẹ như bánh mì, nước uống, snack...</Text>
            <Text style={[styles.boldText, {paddingLeft: 40}]}>3. Tham gia quay số may mắn:</Text>
            <Text style={[styles.boldText, {paddingLeft: 60}]}>- Mỗi vé mua trong thời gian khuyến mãi sẽ được cấp 01 phiếu dự thưởng.</Text>
            <Text style={[styles.boldText, {paddingLeft: 60}]}>- Các giải thưởng bao gồm: 01 xe máy, 03 xe đạp, 10 voucher du lịch 2 ngày 1 đêm.</Text>
            <Text style={[styles.paragraph]}>Chương trình này nhằm thu hút khách hàng sử dụng tuyến xe mới, tạo điều kiện cho người dân di chuyển thuận tiện hơn giữa hai thành phố. Đây cũng là cơ hội tuyệt vời để khách hàng trải nghiệm dịch vụ chất lượng của HY travelbus.</Text>
            <Text style={[styles.paragraph]}>Đừng bỏ lỡ cơ hội nhận được nhiều ưu đãi hấp dẫn này nhé !</Text>


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
        width: '90%',
        height: 170,
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

export default Page1;
