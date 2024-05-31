
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Dimensions, Image, Modal, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, useColorScheme, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateHandler from '../module/dateHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import locationDataGetter from '../Services/locationServices';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { StackNavigation } from '../App';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-modern-datepicker'
import { Divider } from '@rneui/base';
import Location from '../components/location';
import { SliderBox } from 'react-native-image-slider-box';
import userService from '../Services/userServices';



const saleSliderImages = [
  require('../assets/img/a1.png'),
  require('../assets/img/a2.png'),
  require('../assets/img/a3.png'),
  require('../assets/img/a4.png'),
  
]
export default function Home({navigation} : any) {
  const [name, setName] = useState('Quý Khách')
  const { navigate } = useNavigation<StackNavigation>();
  const [loggedUser, setLoggedUser] = useState(null);
  const getLoggedUser = async () => {
    const user = await userService.getUser();
    setLoggedUser(user);
    if(user) {
      setName(user.name);
    }

  }
  const onCickPage1 = () => {
    navigate('Page1');
  }
  const onCickPage2 = () => {
    navigate('Page2');
  }
  const onCickPage3 = () => {
    navigate('Page3');
  }
  const onCickPage4 = () => {
    navigate('Page4');
  }
  const onClickProfile = async () => {
    const user = await userService.getUser();
    if(user){
      navigation.navigate('EditProfile', {
        userId: user.userId,
        username: user.username,
        email: user.email,
        password: user.password,
        name: user.name,
        phone: user.phone
      })
    }
    else {
      navigate('Login')
    }
  }
  useEffect(() => {
    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    getLoggedUser();
  }, []);

  return (
    <View>
      <View style={[styles.header]}>
        <View style={[styles.headerContent]}>
          <TouchableOpacity onPress={onClickProfile} style={{flexDirection: 'row', alignItems: 'center'}}>
            <View>
            <Image
                style={styles.avatar}
                source={require('../assets/img/avt.png')}
                />
            </View>
            <View>
              <Text style={{color: 'white',fontSize: 16, fontWeight: '500'}}>xin chào,</Text>
              <Text style={{color: 'white',fontSize: 20, fontWeight: '900'}}>{name}</Text>
            </View>
          </TouchableOpacity>
          <View>
          <Image
                style={styles.tinyLogo}
                source={require('../assets/img/logo.png')}
                />
          </View>
        </View>
      </View>
      <View >
        <View style={[styles.bodyContent]}>
          <View>
            <Text style={[styles.titleText]}>Chương trình khuyến mãi đặc biệt</Text>
          </View>
          <View style={{ alignSelf: 'center', height: 200, marginHorizontal: 0}}>
            <SliderBox images={saleSliderImages} 
                      dotColor="#1CA653"
                      inactiveDotColor="white"
                      paginationBoxVerticalPadding={20}
                      autoplay
                      circleLoop
                      resizeMethod={'resize'}
                      resizeMode={'cover'}
                      paginationBoxStyle={{
                        position: "absolute",
                        bottom: 0,
                        padding: 80,
                        alignItems: "center",
                        alignSelf: "center",
                        justifyContent: "center",
                        paddingVertical: 20
                      }}
                      dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 10,
                        paddingTop: 0,
                        marginTop: 0,
                        top: 40,
                        backgroundColor: "rgba(128, 128, 128, 0.92)"
                      }}
                      ImageComponentStyle={{borderRadius: 15, width: '90%', alignSelf: 'center', justifyContent: 'center'}}
                      imageLoadingColor="#2196F3"
            />
          </View>

          <View >
            <Text style={[styles.titleText, {marginTop: 25}]}>
              Tin mới về hãng xe
            </Text>
          </View>
          <View>
            <ScrollView contentContainerStyle={{ height: '112%'}}>
              <TouchableOpacity onPress={onCickPage1} style={[styles.newsItem]}>
                <Image
                style={styles.newsImage}
                source={require('../assets/img/a2.png')}
                />
                <View style={[styles.newsContent]}>
                  <Text style={[styles.newsTitleText]}>TƯNG BỪNG KHAI TRƯƠNG GIẢM GIÁ BẤT NGỜ</Text>
                  <Text style={[styles.newsDescriptionText]}>Để chào mừng sự kiện khai trương tuyến xe mới, HY travelbus đã triển khai chương trình khuyến mãi hấp dẫn dành cho khách hàng.</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCickPage4} style={[styles.newsItem]}>
                <Image
                style={styles.newsImage}
                source={require('../assets/img/a3.png')}
                />
                <View style={[styles.newsContent]}>
                  <Text style={[styles.newsTitleText]}>KHAI TRƯƠNG TUYẾN MỚI TP.HCM - ĐÀ NẴNG</Text>
                  <Text style={[styles.newsDescriptionText]}>20/04/2024, HY Travelbus chính thức khai trương tuyến xe mới từ Thành phố Hồ Chí Minh đến Đà Nẵng, mở rộng mạng lưới vận tải hành khách của công ty trên khắp miền Trung.</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCickPage3}  style={[styles.newsItem]}>
                <Image
                style={styles.newsImage}
                source={require('../assets/img/a4.png')}
                />
                <View style={[styles.newsContent]}>
                  <Text style={[styles.newsTitleText]}>AN TOÀN - THOẢI MÁI - CHẤT LƯỢNG</Text>
                  <Text style={[styles.newsDescriptionText]}>Khi lựa chọn HY Travelbus, bạn đang tin tưởng vào một thương hiệu vận tải khách hàng đầu Việt Nam, với triết lý kinh doanh "An toàn - Thoải mái - Chất lượng".</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={onCickPage2}  style={[styles.newsItem]}>
                <Image
                style={styles.newsImage}
                source={require('../assets/img/a1.png')}
                />
                <View style={[styles.newsContent]}>
                  <Text style={[styles.newsTitleText]}>HY TRAVELBUS VỮNG TIN VÀ PHÁT TRIỂN</Text>
                  <Text style={[styles.newsDescriptionText]}>HY Travelbus vẫn duy trì và mở rộng mạng lưới các tuyến đường, giữ vững vị thế dẫn đầu. Điều này cho thấy sự vững tin, bản lĩnh và chiến lược kinh doanh hiệu quả của công ty.</Text>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 150,
    backgroundColor: '#56e865',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 25,

  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    marginRight: 5,
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  body: {
    
  },
  bodyContent: {
    paddingHorizontal: 20,
  },
  titleText: {
    color: '#1CA653',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
  },
  newsItem: {
    flexDirection: 'row',
    marginTop: 10,
  },
  newsImage: {
    height: 70,
    width: 100,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 10,
  },
  newsContent: {
    flexDirection: 'column',
  },
  newsTitleText: {
    color: '#1CA653',
    fontWeight: '500',
    paddingRight: 100,
    fontSize: 10,
  },
  newsDescriptionText: {
    fontWeight: '200',
    paddingRight: 115,
    fontSize: 10,
  }
});


