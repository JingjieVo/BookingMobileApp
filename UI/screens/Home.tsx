
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import dateHandler from '../module/dateHandler';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import locationDataGetter from '../Services/locationService';
import { getFormatedDate } from 'react-native-modern-datepicker';
import { StackNavigation } from '../App';
import AwesomeAlert from 'react-native-awesome-alerts';
import DatePicker from 'react-native-modern-datepicker'
import { Divider } from '@rneui/base';
import Location from '../components/location';


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
    <View style={[styles.body]}>
      <LinearGradient
        colors={['#F79525', 'rgba(239, 175, 169, 0)']}
        start={{ x: 0.64, y: -0.4091 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      />
      <LinearGradient
        colors={['rgba(255, 200, 102, 0.2)', 'rgba(255, 206, 31, 0)']}
        start={{ x: 0.9253, y: 0.2305 }}
        end={{ x: 1, y: 1 }}
        style={[styles.gradient, styles.overlay]}
      />
      <View style={styles.overlayView}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/img/logo.png')}
        />
        <Text style={{fontSize: 20, marginBottom: 20, fontWeight: '900', color: '#F7941D'}}>TÌM VÀ ĐẶT VÉ</Text>
        <View style= {{flexDirection: 'row', marginHorizontal: 10}}>
          <View  style={{flex: 6, alignSelf: 'center'}}>
            <View style={{flexDirection: 'row', marginBottom: 15, marginRight: 10}}>
              <Icon name="location-outline" color="#F7941D" style={{fontSize: 30, color: '#F7941D', fontWeight: '900', alignSelf: 'center'}}/>
              <TouchableOpacity style={styles.textInput} onPress={() => setIsDepartureModalVisible(true)}>
                <Text style={{fontWeight: '900', color: '#F7941D'}}>Điểm đi:         <Text style={{fontWeight: '900', color: '#7fd7f4', fontSize: 15}}>{choosenDeparture}</Text></Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', marginBottom: 15, marginRight: 10}}>
              <Icon name="location-sharp" color="#F7941D" style={{fontSize: 30, color: '#F7941D', fontWeight: '900', alignSelf: 'center'}}/>
              <TouchableOpacity style={styles.textInput} onPress={() => setIsDestinationModalVisible(true)}>
                <Text style={{fontWeight: '900', color: '#F7941D'}}>Điểm đến:       <Text style={{fontWeight: '900', color: '#7fd7f4', fontSize: 15}}>{choosenDestination}</Text></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 2, alignSelf: 'center', marginLeft: 10}}>
            <TouchableOpacity onPress={ExChangeLocation} style={{borderRadius: 50, backgroundColor: 'transparent', padding: 15}}>
              <Icon1 name="change-circle" color="#5c7cd6" style={{fontSize: 30, color: '#F7941D', fontWeight: '600', alignSelf: 'center'}}/>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flexDirection: 'row', marginBottom: 15, marginRight: 10}}>
        <Icon name="calendar-sharp" color="#F7941D" style={{fontSize: 30, color: '#F7941D', fontWeight: '900', alignSelf: 'center', marginRight: 5,}}/>
        <TouchableOpacity style={styles.datePickerInput} onPress={() => setIsCalendarModalVisible(true)}>
            <Text style={{fontWeight: '900', color: '#F7941D'}}>Ngày đi:       <Text style={{fontWeight: '900', color: '#F7941D', fontSize: 15}}>{dateHandler.formatDate(pickedDate)}</Text></Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={handleButtonSearchClick}>
          <Text style={{fontWeight: '900', color: 'white'}}>TÌM CHUYẾN XE</Text>
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
  body: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  gradient: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  overlayView: {
    marginTop: 100,
    //marginHorizontal: 40,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '94%',
    height: '47%',
    paddingBottom: 30,
    alignSelf: 'center',
    borderRadius: 15,
  },
  tinyLogo: {
    //backgroundColor: 'red',
    position:'relative',
    bottom: 30,
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
    borderColor: '#F7941D',
    borderWidth: 2,
  },
  datePickerInput: {
    width: '80%',
    fontWeight: 'bold',
    height: 40,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 15,
    borderColor: '#F7941D',
    borderWidth: 2,
  },
  searchButton: {
    backgroundColor: '#F7941D',
    width: '100%',
    height: '13%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
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
});

export default Home;