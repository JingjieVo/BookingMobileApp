
import { NavigationContainer } from '@react-navigation/native';
import { Divider } from '@rneui/themed';
import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native';
import {  List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { create } from 'react-test-renderer';
import Location from '../components/location'

const locations = [{_id: '001', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '002', name : 'Da Nang', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '003', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '004', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '005', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '006', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '007', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},
{_id: '008', name : 'Ho Chi Minh', detail: 'Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh'},

]


function Search() {
  const [isDepartureModalVisible, setIsDepartureModalVisible] = useState(false);
  const [isDestinationModalVisible, setIsDestinationModalVisible] = useState(false);
  const [choosenDestination, setChoosenDestination] = useState("");
  const [choosenDeparture, setChoosenDeparture] = useState("");

  const OpenModal = () => {
    setIsDepartureModalVisible(true);
  }
  const CloseModal= () => {
    setIsDepartureModalVisible(false);
  }
  const ChooseDeparture = (name : string) => {
    console.log(name);
    setChoosenDeparture(name);
    setIsDepartureModalVisible(false);
  }
  const ChooseDestination = (name : string) => {
    console.log(name);
    setChoosenDestination(name);
    setIsDestinationModalVisible(false);
  }
  const ExChangeLocation = () => {
    let tmp = choosenDeparture;
    setChoosenDeparture(choosenDestination);
    setChoosenDestination(tmp);
  }

  return (
    <View style={{backgroundColor: 'white', flex: 1, marginBottom: 87}}>
      <View style={[{backgroundColor: "#56e865", paddingTop: 20, paddingBottom: 40}]}><Text style={{alignSelf: 'center', fontSize: 20, fontWeight: '900', color: 'white'}}>TÌM VÀ ĐẶT VÉ</Text></View>
      <View style={[styles.header]}>
       <View style= {{flexDirection: 'row'}}>
       <View style={{flex: 8, alignSelf: 'center'}}>
          <TouchableOpacity style={styles.textInput} onPress={() => setIsDepartureModalVisible(true)}>
            <Text>Từ:           <Text style={{fontWeight: '900'}}>{choosenDeparture}</Text></Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.textInput} onPress={() => setIsDestinationModalVisible(true)}>
            <Text>Đến:         <Text style={{fontWeight: '900'}}>{choosenDestination}</Text></Text>
          </TouchableOpacity>
          </View> 
          <View style={{flex: 2, alignSelf: 'center', marginLeft: 30}}>
            <TouchableOpacity onPress={ExChangeLocation} style={{borderRadius: 50, backgroundColor: 'white', padding: 15}}>
              <Icon name="exchange" color="white" style={{fontSize: 30, color: 'gray', fontWeight: '600', alignSelf: 'center'}}/>
            </TouchableOpacity>
          </View>
       </View>
       <View>
       <TouchableOpacity style={styles.textInput} onPress={() => setIsDestinationModalVisible(true)}>
            <Text>Ngày đi:        <Text style={{fontWeight: '900'}}>{}</Text></Text>
          </TouchableOpacity>
       </View>
      </View>
      
      <View style={[styles.body]}></View>
      <View>
        <Modal
        visible={isDepartureModalVisible}
        onRequestClose={() => setIsDepartureModalVisible(false)}
        animationType='slide'
        transparent={true}
        style={[]}
        >
          <View style={[styles.modalBox]}>
            <View style={[styles.modalContent]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 3}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDepartureModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 40, fontWeight: '900', color: "#000000" }}>Chọn tỉnh thành</Text>
              </View>
              <ScrollView>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDeparture} _id={location._id} name={location.name} detail={location.detail} ></Location>)}
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
          <View style={[styles.modalBox]}>
            <View style={[styles.modalContent]}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TextInput placeholder='Tìm tỉnh thành phố' style={[styles.textInput,{flex: 3}]}></TextInput>
                <TouchableOpacity onPress={()=> setIsDestinationModalVisible(false)} style={[{flex: 1, paddingTop: 6, marginLeft: 20}]}><Text style={{fontSize: 20, fontWeight: 'bold'}}>Cancel</Text></TouchableOpacity>
              </View>
              <View>
                <Text style={{fontSize: 40, fontWeight: '900', color: "#000000" }}>Chọn tỉnh thành</Text>
              </View>
              <ScrollView>
              {locations.map((location, index) => <Location key={location._id} onPressLocation={ChooseDestination} _id={location._id} name={location.name} detail={location.detail} ></Location>)}
              </ScrollView>
            </View>   
          </View>
        </Modal>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  modalBox: {
    flex: 1,
    marginTop: 80,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  modalContent: {
    padding: 10,
    paddingTop: 40,
    marginLeft: 20
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
    flex: 3,
    backgroundColor: '#56e865',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  body: {
    flex: 7,
  }
})

export default Search;

