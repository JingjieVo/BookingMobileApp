import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
function Page3({ navigation } : any) {
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
        <Text style={[styles.title, {fontSize: 16}]}>     AN TOÀN - THOẢI MÁI  - CHẤT LƯỢNG</Text>
        <View>
        <Image
                style={styles.coverImage}
                source={require('../../assets/img/a4.png')}
                />
        </View>
        <View>
            <Text style={[styles.paragraph]}>Khi lựa chọn HY Travelbus, bạn đang tin tưởng vào một thương hiệu vận tải khách hàng đầu Việt Nam, với triết lý kinh doanh "An toàn - Thoải mái - Chất lượng".</Text>
            <Text style={[styles.paragraph]}><Text style={[styles.boldText, {paddingLeft: 40}]}>An Toàn Tuyệt Đối:</Text> Tại HY Travelbus, an toàn luôn là ưu tiên hàng đầu. Với đội xe hiện đại, được trang bị các tính năng an toàn tiên tiến, HY Travelbus mang đến cảm giác an tâm tuyệt đối cho khách hàng. Ngoài ra, HY Travelbus còn đặc biệt chú trọng đến việc đào tạo và tuyển dụng đội ngũ lái xe có trình độ chuyên môn cao, luôn lái xe an toàn và chu đáo, góp phần mang đến sự yên tâm tuyệt đối cho hành khách.</Text>
            <Text style={[styles.paragraph]}><Text style={[styles.boldText, {paddingLeft: 40}]}>Thoải Mái Tuyệt Vời</Text> Không chỉ đảm bảo an toàn, HY Travelbus còn mang đến cho hành khách những chuyến đi thoải mái tuyệt vời. Những chiếc xe cao cấp của HY Travelbus được thiết kế với không gian rộng rãi, vệ sinh sạch sẽ, trang bị máy lạnh, wifi, TV giải trí... Tất cả nhằm mang đến cho hành khách một chuyến đi thư giãn, tận hưởng trọn vẹn những phút giây thư thái trên mỗi hành trình.</Text>
            <Text style={[styles.paragraph]}><Text style={[styles.boldText, {paddingLeft: 40}]}>Chất Lượng Vượt Trội:</Text> Bên cạnh việc đảm bảo an toàn và thoải mái, HY Travelbus luôn chú trọng nâng cao chất lượng dịch vụ thông qua việc đào tạo và tuyển dụng đội ngũ nhân viên có trình độ chuyên môn cao. Từ việc lái xe an toàn, chu đáo, đến thái độ phục vụ tận tình, chu đáo - tất cả đều được HY Travelbus tuân thủ nghiêm ngặt để mang đến trải nghiệm tuyệt vời cho khách hàng.</Text>
            
            <Text style={[styles.paragraph]}>Hãy để HY Travelbus đồng hành cùng bạn trên mọi nẻo đường, mang đến cho bạn những chuyến đi an toàn, thoải mái và chất lượng nhất.</Text>


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

export default Page3;
