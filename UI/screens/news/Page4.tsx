import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
function Page4({ navigation } : any) {
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
        <Text style={[styles.title, {fontSize: 16}]}>CHƯƠNG TRÌNH KHUYẾN MÃI KHAI TRƯƠNG CHUYẾN XE MỚI</Text>
        <View>
        <Image
                style={styles.coverImage}
                source={require('../../assets/img/a3.png')}
                />
        </View>
        <View>
            <Text style={[styles.paragraph]}>Ngày 20/04/2024, HY Travelbus chính thức khai trương tuyến xe mới từ Thành phố Hồ Chí Minh đến Đà Nẵng, mở rộng mạng lưới vận tải hành khách của công ty trên khắp miền Trung.</Text>
            <Text style={[styles.paragraph]}>Với tuyến đường dài khoảng 950 km, hành trình từ TP.HCM đến Đà Nẵng sẽ mất khoảng 12-13 tiếng di chuyển. Tuy nhiên, hành khách sẽ được trải nghiệm một chuyến đi thoải mái, an toàn và chất lượng nhờ vào những nỗ lực không ngừng của HY Travelbus.</Text>
            <Text style={[styles.paragraph]}>Các chuyến xe sẽ khởi hành từ bến xe Miền Đông ở TP.HCM và kết thúc tại bến xe Trung Tâm ở Đà Nẵng. Ngoài các điểm dừng chính, các xe còn có thể dừng tại một số điểm trung chuyển trên tuyến như Bình Thuận, Nha Trang, Quy Nhơn để đáp ứng nhu cầu di chuyển của hành khách.</Text>
            <Text style={[styles.paragraph]}>Đội xe hiện đại, an toàn và tiện nghi Để đảm bảo chất lượng dịch vụ tối ưu, HY Travelbus đầu tư vào đội xe mới với các trang thiết bị hiện đại như hệ thống phanh ABS, camera giám sát, hệ thống điều hòa tự động. Các ghế ngồi rộng rãi, thoải mái, cung cấp wifi, ổ cắm USB và màn hình giải trí sẽ mang đến cho hành khách những phút giây thư giãn tuyệt vời suốt hành trình.</Text>
            <Text style={[styles.paragraph]}>Đội ngũ lái xe chuyên nghiệp, an toàn Bên cạnh đầu tư về cơ sở vật chất, HY Travelbus cũng đặc biệt chú trọng đến việc tuyển dụng và đào tạo đội ngũ lái xe chuyên nghiệp. Các tài xế được huấn luyện kỹ càng về kỹ năng lái xe an toàn, xử lý tình huống ứng phó khẩn cấp, cũng như thái độ phục vụ chu đáo, tận tình với hành khách.</Text>
            <Text style={[styles.paragraph]}>Với những nỗ lực không ngừng nhằm mang đến trải nghiệm di chuyển tuyệt vời, HY Travelbus tin rằng tuyến xe mới HCM - Đà Nẵng sẽ là lựa chọn lý tưởng cho hành khách trên hành trình khám phá miền Trung xinh đẹp.</Text>


            


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

export default Page4;
