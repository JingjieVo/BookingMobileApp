import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Modal, KeyboardAvoidingView, ImageBackground, ScrollView, Image } from 'react-native';
import { Divider } from 'react-native-paper';
import { NavigationContainer, NavigationProp, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type StackNavigation } from "../../App";
import Main from '../Main';
import userDAO from '../../Services/userServices';
import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome6';
import coachService from '../../Services/coachServices';
import { Dropdown } from 'react-native-element-dropdown';
import Toast from 'react-native-toast-message';
function CoachManagement({ navigation } : any) {
    const [coaches, setCoaches] = useState<any[]>([]);
    const { navigate } = useNavigation<StackNavigation>();
    const [coachValue, setCoachValue] = useState('');
    const [isCoachFocus, setIsCoachFocus] = useState(false);
    const [coachId, setCoachId] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
  const isLicensePlateExist = (licensePlate : string) => {
      return coaches.some(coach => coach.licensePlate === licensePlate);
  };
  const onAddCoach = async() => {
      const newCoach = {
        licensePlate: licensePlate.toUpperCase(),
      }
      if(licensePlate === '') {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Không được để trống',
          visibilityTime: 4000,
          topOffset: 15
        });
        return
      }
      if(isLicensePlateExist(licensePlate.toUpperCase())) {
        Toast.show({
          type: 'error',
          text1: 'Lỗi',
          text2: 'Biển số đã tồn tại trong nhà xe',
          visibilityTime: 4000,
          topOffset: 15
        });
        return
      }
      const coach = await coachService.createCoach(newCoach);
      if(coach) {
        Toast.show({
          type: 'success',
          text1: 'Thành công',
          text2: 'Thêm xe thành công',
          visibilityTime: 4000,
          topOffset: 15
        });
        navigation.replace('CoachManagement');
      }
  }
  const onDeleteCoach = async() => {
    if(coachValue === '') {
      Toast.show({
        type: 'error',
        text1: 'Lỗi',
        text2: 'Vui lòng chọn xe muốn xóa',
        visibilityTime: 4000,
        topOffset: 15
      });
      return
    }
    const coach = await coachService.deleteCoach(coachId);
    if(coach) {
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Xóa xe thành công',
        visibilityTime: 4000,
        topOffset: 15
      });
      navigation.replace('CoachManagement');
    }
}
  const fetchCoaches = async () => {
    try {
      const allCoaches = await coachService.getAllCoaches();
      setCoaches(allCoaches);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
};
useEffect(() => {
  fetchCoaches();

}, []);
const handleOnCancel = () => {
navigate('AdminMain');
};

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={[styles.header]}>
        <TouchableOpacity onPress={handleOnCancel}>
          <Text style={{ color: 'white', fontSize: 12 }}>Cancel</Text>
        </TouchableOpacity>
        <Text style={{ alignSelf: 'center', fontWeight: '900', color: 'white', paddingLeft: 65, fontSize: 16 }}>Quản Lý Xe</Text>
      </View>
      <View style={[styles.body]}>
      <View>
          <TextInput placeholder='Nhập biển số xe'  style={[styles.textInput, {marginTop: 0}]} onChangeText={setLicensePlate}></TextInput>
        </View>
        <TouchableOpacity onPress={onAddCoach} style= {[styles.featureButton, {marginTop: 5, backgroundColor: '#56e865'}]}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#FFFFFF"}}>Thêm</Text>
            </View>
          </TouchableOpacity>
      <View style={{marginTop: 15}}>
        <Dropdown
          style={[styles.dropdown, isCoachFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={coaches}
          search
          maxHeight={300}
          labelField="licensePlate"
          valueField="_id"
          placeholder={(!isCoachFocus && coachValue=='') ? 'Chọn xe' : coachValue}
          searchPlaceholder="Tìm biển số..."
          value={coachValue}
          onFocus={() => setIsCoachFocus(true)}
          onBlur={() => setIsCoachFocus(false)}
          onChange={item => {
            setCoachValue(item.licensePlate);
            setCoachId(item._id)
            setIsCoachFocus(false);
          }}
          renderLeftIcon={() => (
            <Icon
              style={styles.icon}
              color={'blue'}
              name="taxi"
              size={20}
            />
          )}
        />
        </View>
        
          <TouchableOpacity onPress={onDeleteCoach} style= {[styles.featureButton, {marginTop: 15, backgroundColor: 'red'}]}>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: "#FFFFFF"}}>Xóa</Text>
            </View>
          </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    position:'relative',
    width: 180,
    height: 180,
    alignSelf: 'center',
  },
    header: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      backgroundColor: '#1CA653',
      padding: 20,
    },
    body: {
      padding: 20,
      
    },
    titleText: {
      color: '#F7941D',
      fontWeight: '700',
    },
    descriptionText: {
      fontStyle: 'italic'
    },
    textInput: {
      fontWeight: 'bold',
      height: 50,
      marginVertical: 15,
      backgroundColor: "white",
      borderWidth: 0.5,
      borderColor: 'black',
      padding: 10,
      borderRadius: 10,
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
    featureButton: {
        paddingHorizontal: 15, 
        paddingVertical: 15, 
        backgroundColor: 'white',
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: 'space-around',
        alignItems: 'center',
        shadowColor: "#000000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      container: {
        backgroundColor: 'white',
        padding: 16,
      },
      dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
      },
      icon: {
        marginRight: 15,
      },
      label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
      },
      placeholderStyle: {
        color: 'black',
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
        height: 40,
        fontSize: 16,
      },
      datePickerInput: {
        width: '90%',
        fontWeight: 'bold',
        height: 40,
        backgroundColor: "transparent",
        padding: 10,
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 0.5,
      },
      centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 10,
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
});

export default CoachManagement;
