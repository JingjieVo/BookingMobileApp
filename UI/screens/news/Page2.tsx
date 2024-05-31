import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
function Page2({ navigation } : any) {
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
        <Text style={[styles.title]}>HY TRAVELBUS - VỮNG TIN VÀ PHÁT TRIỂN</Text>
        <View>
        <Image
                style={styles.coverImage}
                source={require('../../assets/img/a1.png')}
                />
        </View>
        <View>
            <Text style={[styles.paragraph]}>Được thành lập vào năm 2024, HY Travelbus đã nhanh chóng khẳng định vị thế là một trong những công ty vận tải khách hàng đầu tại Việt Nam. Trong bối cảnh nhiều doanh nghiệp trong ngành du lịch và vận tải khách phải đối mặt với thách thức HY Travelbus vẫn kiên định và vững bước trên con đường phát triển.</Text>
            <Text style={[styles.paragraph]}>Với mạng lưới các tuyến đường liên tỉnh phủ rộng khắp các vùng miền, HY Travelbus mang lại sự thuận tiện, an toàn và chất lượng dịch vụ vượt trội cho hàng triệu lượt khách mỗi năm. Bí quyết thành công của công ty nằm ở việc không ngừng đầu tư và nâng cấp hạ tầng, đội xe.</Text>
            <Text style={[styles.paragraph]}>Hiện tại, đội xe của HY Travelbus sở hữu hơn 500 chiếc xe khách cao cấp, được trang bị những tính năng hiện đại như wifi, máy lạnh, TV, hệ thống an toàn tiên tiến. Điều này không chỉ mang lại sự thoải mái cho hành khách mà còn đảm bảo được yếu tố an toàn.</Text>
            <Text style={[styles.paragraph]}>Bên cạnh đó, HY Travelbus cũng không ngừng nâng cao chất lượng dịch vụ thông qua việc đào tạo, tuyển dụng đội ngũ lái xe và nhân viên có trình độ chuyên môn cao. Đây chính là nhân tố then chốt giúp công ty gây dựng được niềm tin và uy tín trong mắt khách hàng.</Text>
            <Text style={[styles.paragraph]}>Trong khi nhiều doanh nghiệp phải tạm ngừng hoạt động hoặc co lại quy mô, HY Travelbus vẫn duy trì và mở rộng mạng lưới các tuyến đường, giữ vững vị thế dẫn đầu. Điều này cho thấy sự vững tin, bản lĩnh và chiến lược kinh doanh hiệu quả của công ty.</Text>


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

export default Page2;
