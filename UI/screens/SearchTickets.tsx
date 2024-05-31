
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateHandler from '../module/dateHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import React, { useEffect, useState } from 'react';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { StackNavigation } from '../App';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-modern-datepicker'
import { Divider } from '@rneui/base';
import Location from '../components/location';
import { SliderBox } from 'react-native-image-slider-box'
import locationService from '../Services/locationServices';
import { Dropdown } from 'react-native-element-dropdown';



function Home({ navigation } : any) {
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
  const [isToFocus, setIsToFocus] = useState(false);
  const [isFromFocus, setIsFromFocus] = useState(false);



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
    //console.log(name);
    //console.log(description);

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
        console.log(pickedDate)
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
  const onNavigateToSaleNews = () => {
    navigation.navigate('Page1')
  }
  useEffect(() => {
    // Gọi hàm để lấy tất cả các địa điểm khi component được render
    const fetchLocations = async () => {
      try {
        const allLocations = await locationService.getAllLocations();
        setLocations(allLocations);
        //console.log(locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
      //console.log(locations);
    };

    fetchLocations();
  }, []);
  return (
    <ScrollView style={[styles.body]} contentContainerStyle={{ height: '110%'}}>
      
      <View style={styles.overlayView}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
        <View style={styles.contentOverlayView}>
        <Text style={{fontSize: 20, marginBottom: 20, fontWeight: '900', color: '#F7941D'}}>TÌM VÀ ĐẶT VÉ</Text>
        <View style= {{flexDirection: 'row', marginHorizontal: 10}}>
          <View style={{flex: 6, marginBottom: 15}}>
          <View  style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 15,}}>
            <Icon2 style={{flex: 1, fontSize: 30}} color="#F7941D" name="location-dot"></Icon2>
          <Dropdown
          style={[styles.dropdown, isFromFocus && { borderColor: '#F7941D' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          itemTextStyle={[styles.placeholderStyle, { color: "#F7941D"}]}
          containerStyle={[{borderRadius: 15, width: 200, borderWidth: 2, borderColor: '#F7941D'}]}
          iconColor="#1CA653"
          data={locations}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={(!isFromFocus && choosenDeparture=='') ? 'Chọn điểm đi' : choosenDeparture}
          searchPlaceholder="Tìm địa điểm..."
          value={choosenDeparture}
          onFocus={() => setIsFromFocus(true)}
          onBlur={() => setIsFromFocus(false)}
          onChange={item => {
            setChoosenDeparture(item.name);
            setDepartureDescriptions(item.description)
            setIsFromFocus(false);
          }}
          
        />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <Icon2 style={{flex: 1, fontSize: 30}} color="#F7941D" name="location-pin"></Icon2>
        <Dropdown
          style={[styles.dropdown, isToFocus && { borderColor: '#F7941D' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          iconColor="#1CA653"
          itemTextStyle={[styles.placeholderStyle, { color: "#F7941D"}]}
          containerStyle={[{borderRadius: 15, width: 200, borderWidth: 2, borderColor: '#F7941D'}]}
          data={locations}
          search
          maxHeight={300}
          labelField="name"
          valueField="_id"
          placeholder={(!isToFocus && choosenDestination=='') ? 'Chọn điểm đến' : choosenDestination}
          searchPlaceholder="Tìm địa điểm..."
          value={choosenDestination}
          onFocus={() => setIsToFocus(true)}
          onBlur={() => setIsToFocus(false)}
          onChange={item => {
            setChoosenDestination(item.name);
            setDestinationDescriptions(item.description)
            setIsToFocus(false);
          }}
        />
          </View>
          </View>
          <View style={{flex: 2, alignSelf: 'center', marginLeft: 10}}>
            <TouchableOpacity onPress={ExChangeLocation} style={{borderRadius: 50, backgroundColor: 'transparent', padding: 10}}>
              <Icon1 name="change-circle" color="#5c7cd6" style={{fontSize: 40, color: '#1CA653', fontWeight: '600', alignSelf: 'center', marginBottom: 15, right: 10}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15, marginRight: 10}}>
          <Icon name="calendar-sharp" color="#1CA653" style={{fontSize: 30, color: '#1CA653', fontWeight: '900', alignSelf: 'center', marginRight: 5,}}/>
          <TouchableOpacity style={styles.datePickerInput} onPress={() => setIsCalendarModalVisible(true)}>
              <Text style={{fontWeight: '900', color: '#1CA653'}}>Ngày đi:       <Text style={{fontWeight: '900', color: '#7fd7f4', fontSize: 14}}>{dateHandler.formatDate(pickedDate)}</Text></Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleButtonSearchClick}>
          <Text style={{fontWeight: '900', color: 'white'}}>TÌM CHUYẾN XE</Text>
        </TouchableOpacity>
        </View>

      </View>
      <View style={[styles.subContent]}>
          <Text style={{fontSize: 20,fontWeight: '800', color: "#F7941D", marginLeft: 20}}>Khuyến mãi gần đây</Text>
          <TouchableOpacity onPress={onNavigateToSaleNews}>
              <Image
              style={styles.newsImage}
              source={require('../assets/img/a2.png')}
              />
              <Text style={{fontStyle: 'italic', paddingLeft: 15, paddingRight: 10 , color: '#F7941D'}}>Nhấn vào đây để xem những khuyến mãi mới nhất </Text>
          </TouchableOpacity>
        </View>
      <View></View>
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
                <Divider width={4} style={{marginBottom: 20}} color='white'></Divider>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 5, backgroundColor: 'white'}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDestinationModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Hủy</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 28, fontWeight: '900', color: "white" }}>Chọn nơi bạn muốn đến</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDestination} _id={location._id} name={location.name} description={location.description} imgLink={location.imgLink} ></Location>)}
              </ScrollView>
            </View>   
          </View>
        </Modal>
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
                <Divider width={4} style={{marginBottom: 10}} color='white'></Divider>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 5, backgroundColor: 'white'}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDepartureModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Hủy</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 28, fontWeight: '900', color: "white" }}>Chọn nơi bạn muốn đi</Text>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDeparture} _id={location._id} name={location.name} description={location.description} imgLink={location.imgLink} ></Location>)}
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
                <Text style={{fontWeight: '900', fontSize: 18, marginBottom: 10}}>Close</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#1CA653',
  },
  gradient: {
    flex: 1,
  },
  overlayView: {
    marginTop: 80,
    //marginHorizontal: 40,
    backgroundColor: 'white',
    //justifyContent: 'flex-start',
    alignItems: 'center',
    //position: 'absolute',
    width: '89%',
    height: 310,
    paddingBottom: 0,
    alignSelf: 'center',
    borderRadius: 15,
    shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 10,
  },
  contentOverlayView: {
    backgroundColor: 'white',
    flex: 1,
    //justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    height: '10%',
    paddingBottom: 0,
    alignSelf: 'center',
    borderRadius: 15,
    bottom: 80,
  },
  tinyLogo: {
    //backgroundColor: 'red',
    position:'relative',
    bottom: 80,
    width: 150,
    height: 150,
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 15,
    borderColor: '#1CA653',
    borderWidth: 2,
  },
  datePickerInput: {
    width: '80%',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 15,
    borderColor: '#1CA653',
    borderWidth: 2,
  },
  searchButton: {
    backgroundColor: '#1CA653',
    width: '100%',
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  modalBox: {
    flex: 1,
    marginTop: 300,
    backgroundColor: '#1CA653',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 20,
  },
  modalContent: {
    padding: 2,
    paddingTop: 10,
    marginHorizontal: 20
  },
  button: {
    paddingHorizontal: 30,
    alignSelf: 'center',
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
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
    padding: 15,
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
  subContent: {
    alignSelf: 'center',
    width: '95%',
    marginVertical: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  newsImage: {
    height: 140,
    width: '98%',
    alignSelf: 'center',
    borderRadius: 10,
  },
  dropdown: {
    flex: 4,
    height: 45,
    borderColor: '#1CA653',
    borderWidth:2,
    borderRadius: 15,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 15,
  },
  label: {
    color: '#1CA653',
    position: 'absolute',
    backgroundColor: 'white',
    width: 200,
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: '#1CA653',
    fontWeight: '600',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    borderRadius: 10,
    height: 40,
    fontSize: 16,
  },
});

export default Home;