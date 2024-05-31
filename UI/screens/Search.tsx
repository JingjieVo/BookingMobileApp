
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { useEffect, useRef, useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native';
import {  List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { create } from 'react-test-renderer';
import Location from '../components/location'
import DatePicker from 'react-native-modern-datepicker'
import { getToday, getFormatedDate } from 'react-native-modern-datepicker';
import SearchTicketResult from './SearchTicketResult';
import { useRoute } from "@react-navigation/native"
import { type StackNavigation } from "../App";
import AwesomeAlert from 'react-native-awesome-alerts';
import { Modalize } from 'react-native-modalize';
import locationDataGetter  from '../Services/locationServices'
import tripDataGetter from '../Services/tripServices';
import dateHandler from '../module/dateHandler';
import SearchHistoryBadge from '../components/searchHistoryBadge';


const locations1 = [
  {
      "_id": "6631258bc1cca90cf940033d",
      "name": "Can Tho",
      "description": "Đường dẫn cầu Cần Thơ, QL1A, Hưng Thành, Cái Răng",
      "imgLink": "cantho.jpg",
      "__v": 0
  },
  {
      "_id": "663125cdc1cca90cf9400340",
      "name": "Ha Noi",
      "description": "Số 20 đường Phạm Hùng, P. Mỹ Đình, Q. Nam Từ Liêm",
      "imgLink": "hanoi.jpg",
      "__v": 0
  },
  {
      "_id": "663125edc1cca90cf9400343",
      "name": "Hai Phong",
      "description": "Đường Trần Nguyên Hãn, Niệm Nghĩa, TP. Hải Phòng",
      "imgLink": "haiphong.jpg",
      "__v": 0
  },
  {
      "_id": "6631261cc1cca90cf9400345",
      "name": "Ho Chi Minh",
      "description": "Đường Lê Hồng Phong, Phường 1, Quận 10, TP.HCM",
      "imgLink": "hochiminh.jpg",
      "__v": 0
  },
  {
      "_id": "66312653c1cca90cf9400348",
      "name": "Da Nang",
      "description": "201- Đường Tôn Đức Thắng, Phường Hòa Minh, Quận Liên Chiểu, Đà Nẵng",
      "imgLink": "danang.jpg",
      "__v": 0
  },
  {
      "_id": "66312741c1cca90cf940034b",
      "name": "Quang Nam",
      "description": "QL1A, P.Tân Thạnh, Tp Tam Kỳ, Quảng Nam",
      "imgLink": "quangnam.jpg",
      "__v": 0
  },
  {
      "_id": "66312773c1cca90cf940034d",
      "name": "An Giang",
      "description": "Trung tâm tỉnh An Giang, đường Hùng Vương, Mỹ Long",
      "imgLink": "angiang.jpg",
      "__v": 0
  },
  {
      "_id": "663127ccc1cca90cf940034f",
      "name": "Bac Giang",
      "description": "197, đường Xương Giang, phường Thọ Xương, tỉnh Bắc Giang",
      "imgLink": "bacgiang.jpg",
      "__v": 0
  },
  {
      "_id": "663127e9c1cca90cf9400351",
      "name": "Bac Ninh",
      "description": "Nguyễn Du, p. Ninh Xá, Bắc Ninh",
      "imgLink": "bacninh.jpg",
      "__v": 0
  },
  {
      "_id": "6631283ac1cca90cf9400353",
      "name": "Binh Dinh",
      "description": "71 Tây Sơn, Thành phố Qui Nhơn, tỉnh Bình Định",
      "imgLink": "binhdinh.jpg",
      "__v": 0
  },
  {
      "_id": "663134f4c1cca90cf9400356",
      "name": "Binh Phuoc",
      "description": "Số 741, đường Phú Riềng Đỏ, P. Tân Xuân, Tx. Đồng Xoài, Bình Phước",
      "imgLink": "binhphuoc.jpg",
      "__v": 0
  },
  {
      "_id": "6631351ac1cca90cf9400358",
      "name": "Binh Thuan",
      "description": "Từ Văn Tư, Phú Trinh, TX. Phan Thiết, tỉnh Bình Thuận",
      "imgLink": "binhthuan.jpg",
      "__v": 0
  },
  {
      "_id": "66313672112876e734a7aaee",
      "name": "Cao Bang",
      "description": "M6H2+PQM, Khau Sả, tỉnh Cao Bằng",
      "imgLink": "caobang.jpg",
      "__v": 0
  },
  {
      "_id": "6631368f112876e734a7aaf0",
      "name": "Dong Nai",
      "description": "Phường Bình Đa – TP. Biên Hòa – Đồng Nai",
      "imgLink": "dongnai.jpg",
      "__v": 0
  },
  {
      "_id": "663136a9112876e734a7aaf2",
      "name": "Ha Giang",
      "description": "Phương Thiện, Thành phố Hà Giang, Hà Giang",
      "imgLink": "hagiang.jpg",
      "__v": 0
  },
  {
      "_id": "663136d6112876e734a7aaf5",
      "name": "Ben Tre",
      "description": "303, Đoàn Hoàng Minh, Phú Khương, Tp. Bến Tre, Bến Tre",
      "imgLink": "bentre.jpg",
      "__v": 0
  }
]

function Search({ navigation } : any) {
  const today = new Date();
  const startDate = getFormatedDate(today, 'YYYY/MM/DD')


  const [locations, setLocations] = useState<any[]>([]);
  const [isDepartureModalVisible, setIsDepartureModalVisible] = useState(false);
  const [isDestinationModalVisible, setIsDestinationModalVisible] = useState(false);
  const [isCalendarModalVisible, setIsCalendarModalVisible] = useState(false);
  const [choosenDestination, setChoosenDestination] = useState("");
  const [destinationDescriptions, setDestinationDescriptions] = useState("");
  const [choosenDeparture, setChoosenDeparture] = useState("");
  const [departureDescriptions, setDepartureDescriptions] = useState("");
  const [pickedDate, setPickedDate] =  useState(startDate);
  const [showAlert, setShowAlert] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const { navigate } = useNavigation<StackNavigation>();
  const [ searchHistories, setSearchHistories ] = useState<any[]>([]);



  const hideAlert = () => {
    setShowAlert(false);
  }
  const hideLoading = () => {
    setShowLoading(false);
  }
  const OpenModal = () => {
    setIsDepartureModalVisible(true);
  }
  const CloseModal= () => {
    setIsDepartureModalVisible(false);
  }
  const ChooseDeparture = (name : string, description: string) => {
    console.log(name);
    console.log(description);

    setDepartureDescriptions(description);
    setChoosenDeparture(name);
    setIsDepartureModalVisible(false);
  }
  const ChooseDestination = (name : string, description: string) => {
    console.log(name);
    console.log(description);
    setDestinationDescriptions(description)
    setChoosenDestination(name);
    setIsDestinationModalVisible(false);
  }
  const ExChangeLocation = () => {
    let tmp = choosenDeparture;
    setChoosenDeparture(choosenDestination);
    setChoosenDestination(tmp);
  }
  const handleDateChange = (propDate : any) => {
    setPickedDate(propDate);
    setIsCalendarModalVisible(false);
  }
  const handleButtonSearchClick = ( ) => {
      if(choosenDeparture === "" || choosenDestination === "") {
        setShowAlert(true);
        return
      }
      setShowLoading(true);
      setTimeout(() => {
        searchHistories.push({
          departure: choosenDeparture,
          destination: choosenDestination,
          date: pickedDate,
        })
        console.log(searchHistories)
        setShowLoading(false);
        navigation.navigate('SearchTicketResult',
        { 
          departure: choosenDeparture,
          departureDescriptions: departureDescriptions,
          destination: choosenDestination,
          destinationDescriptions: destinationDescriptions,
          date: pickedDate,
        })
      }, 1000)
      
  }
  const onClickHistory = (departure : string, departureDescriptions: string, destination : string, destinationDescriptions: string,  date : string) => {
    setShowLoading(true);
      setTimeout(() => {
        setShowLoading(false);
        navigation.navigate('SearchTicketResult',
        { 
          departure: departure,
          departureDescriptions: departureDescriptions,
          destination: destination,
          destinationDescriptions: destinationDescriptions,
          date: date,
        })
      }, 1000)
  }
  
  useEffect(() => {
    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    const fetchLocations = async () => {
      try {
        const allLocations = await locationDataGetter.getAllLocations();
        setLocations(allLocations);
        //console.log(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <View style={{backgroundColor: 'white', flex: 1, marginBottom: 0}}>
      <View style={[{backgroundColor: "#56e865", paddingTop: 20, paddingBottom: 30}]}><Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '900', color: 'white'}}>TÌM VÀ ĐẶT VÉ</Text></View>
      <View style={[styles.header]}>
       <View style= {{flexDirection: 'row'}}>
       <View style={{flex: 8, alignSelf: 'center'}}>
          <TouchableOpacity style={styles.textInput} onPress={() => setIsDepartureModalVisible(true)}>
            <Text>Từ:       <Text style={{fontWeight: '900', color: '#7fd7f4', fontSize: 17}}>{choosenDeparture}</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textInput} onPress={() => setIsDestinationModalVisible(true)}>
            <Text>Đến:     <Text style={{fontWeight: '900', color: '#7fd7f4', fontSize: 17}}>{choosenDestination}</Text></Text>
          </TouchableOpacity>
          </View> 
          <View style={{flex: 2, alignSelf: 'center', marginLeft: 30}}>
            <TouchableOpacity onPress={ExChangeLocation} style={{borderRadius: 50, backgroundColor: 'white', padding: 15}}>
              <Icon name="exchange" color="#5c7cd6" style={{fontSize: 20, color: '#7fd7f4', fontWeight: '600', alignSelf: 'center'}}/>
            </TouchableOpacity>
          </View>
       </View>
       <View>
       <TouchableOpacity style={styles.textInput} onPress={() => setIsCalendarModalVisible(true)}>
            <Text>Ngày đi:   <Text style={{fontWeight: '900', color: '#f7ac6f', fontSize: 17}}>{dateHandler.formatDate(pickedDate)}</Text></Text>
          </TouchableOpacity>
       </View>
       <View>
          <TouchableOpacity onPress={handleButtonSearchClick} style={[styles.button,{}]} >      
              <Text><Icon name="search" color="lightgray" style={{fontWeight: '900', fontSize: 20}}/>   TÌM KIẾM</Text>
          </TouchableOpacity>
       </View>
      </View>
        
      <TouchableOpacity style= {{paddingHorizontal: 30, paddingVertical: 20, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Hướng dẫn đặt vé</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "red", fontStyle: 'italic'}}>Đọc kỹ hướng dẫn trước khi đặt vé sẽ tránh được nhiều sai xót không đáng có</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 10}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
      </TouchableOpacity>  
        <Divider />  
      <View style={{marginHorizontal: 6, marginVertical: 5}}>
        <Text style={{fontSize: 20, fontWeight: '900', color: 'black', marginHorizontal: 30, marginVertical: 5}}>Lịch sử tìm kiếm</Text>
        <View style={[{backgroundColor: '#D9DADF', borderRadius: 10}]}>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{flexDirection: 'row'}}>
            {searchHistories.reverse().map((history, index) => <SearchHistoryBadge key={index} departure={history.departure} departureDescriptions={departureDescriptions} destination={history.destination} destinationDescriptions={departureDescriptions} date={history.date} onPressBadge={onClickHistory}></SearchHistoryBadge>)}
          </ScrollView>
        </View>
      </View>
      
      <View>
        <Modal
        visible={isDepartureModalVisible}
        onRequestClose={() => setIsDepartureModalVisible(false)}
        animationType='slide'
        transparent={true}
        style={[]}
        >
          <View  style={[styles.modalBox]}>
            <View style={[styles.modalContent]}>
              <View style={{paddingHorizontal: 80}}>
                <Divider width={4} style={{marginBottom: 20}}></Divider>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 5}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDepartureModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 18, fontWeight: 'bold'}}>Hủy</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 40, fontWeight: '900', color: "#000000" }}>Chọn tỉnh thành</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDeparture} _id={location._id} name={location.name} description={location.description} imgLink={location.imageLinks} ></Location>)}
              </ScrollView>
            </View>   
          </View>
        </Modal>
      </View>
      <View>
        <Modal
        visible={isDestinationModalVisible}
        onRequestClose={() => setIsDestinationModalVisible(false)}
        animationType='slide'
        transparent={true}
        style={[]}
        >
          
          <View  style={[styles.modalBox]}>
            <View style={[styles.modalContent]}>
              <View style={{paddingHorizontal: 80}}>
                <Divider width={4} style={{marginBottom: 20}}></Divider>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 5}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDestinationModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 18, fontWeight: 'bold'}}>Hủy</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 40, fontWeight: '900', color: "#000000" }}>Chọn tỉnh thành</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDestination} _id={location._id} name={location.name} description={location.description} imgLink={location.imageLinks}></Location>)}
              </ScrollView>
            </View>   
          </View>
        </Modal>
      </View>
      <View>
        <Modal
        animationType='slide'
        transparent={true}
        visible={isCalendarModalVisible}
        onRequestClose={() => setIsCalendarModalVisible(false)}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <DatePicker 
              mode='calendar'
              selected={pickedDate}
              minimumDate={startDate}
              onDateChange={handleDateChange}>
              </DatePicker>
              <TouchableOpacity onPress={() => setIsCalendarModalVisible(false)}>
                <Text style={{fontWeight: '900'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
          message="Hãy chọn điểm đi và điểm đến"
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
        
    </View>
  );
}
const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    marginTop: 60,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalContent: {
    padding: 2,
    paddingTop: 20,
    marginHorizontal: 20
  },
  button: {
    paddingHorizontal: 40,
    alignSelf: 'center',
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
  },
  textInput: {
    fontWeight: 'bold',
    height: 40,
    backgroundColor: "#F2F4F3",
    marginBottom: 15,
    padding: 10,
    borderRadius: 10,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    backgroundColor: '#56e865',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  body: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
})

export default Search;

