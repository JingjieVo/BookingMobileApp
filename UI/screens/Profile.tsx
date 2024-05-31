
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { type StackNavigation } from "../App";
import { Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import { Divider } from '@rneui/themed';

function Profile({navigation} : any): React.JSX.Element{
  const { navigate } = useNavigation<StackNavigation>();

    const handleOnNavigateToLogin = () => {
        navigate("Login");
    }
    const handleOnNavigateToRegister = () => {
        navigate("Register");
    }
    const onNavigateToTutorial = () => {
      navigation.navigate('Tutorial');
    }
  return (
    //<TouchableOpacity  onPress={handleOnNavigate}>
                            //<Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng nhập</Text>
    //</TouchableOpacity>
    
    <View style={{flex: 1,backgroundColor: "#FFFFFF", paddingBottom: 60}}>
      <View style={[styles.container, {backgroundColor: "#1CA653"}]}>
        <View>
          <Text style={{fontSize: 50, padding: 20, color: '#FFFFFF', fontWeight: '600'}}>Đăng nhập vào<Text style= {{color: '#F7941D', fontWeight: '600'}}>Tài khoản</Text> </Text>
        </View>
        <View>
          <Text style={{paddingHorizontal: 20, fontStyle: 'italic', color: '#FFFFFF'}}>Hãy chọn một số phương thức đăng nhập dưới đây</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleOnNavigateToLogin} style={[styles.Button]}>
            <Text style={{fontSize: 20, color: '#000000', fontWeight: '600'}}>Số điện thoại</Text>
          </TouchableOpacity>
        </View>       
        <View>
            <View style={{flexDirection: "row", justifyContent: 'space-around'}}>
              <TouchableOpacity style={[styles.Button3]}>
                <View style={{flexDirection: "row"}}>
                  <Icon name="google" color="lightgray" style={{fontSize: 30, color: '#EB4335', fontWeight: '600', marginRight: 10}}/>
                  <Text style={{fontSize: 20, color: '#000000', fontWeight: '600'}}>Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.Button3]}>
                <View style={{flexDirection: "row"}}>
                  <Icon name="facebook" color="white" style={{fontSize: 30, color: '#1877F2', fontWeight: '600', marginRight: 10}}/>
                  <Text style={{fontSize: 20, color: '#000000', fontWeight: '600'}}>Facebook</Text>
                </View>
              </TouchableOpacity>
            </View>
        </View>
        <View style={{ paddingTop: 15,alignSelf: 'center', flexDirection: 'row'}}>
          <Text style={{color: '#FFFFFF', fontStyle: 'italic'}}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={handleOnNavigateToRegister} style={{}}><Text style={{color: "#F7941D"}}>Đăng kí ngay</Text></TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity style= {{paddingHorizontal: 30, paddingVertical: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Một số chứng chỉ</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "gray", fontStyle: 'italic'}}>Một số chứng chỉ mà chúng tôi có đảm bảo an toàn cho quý khách</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 10}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity onPress={onNavigateToTutorial} style= {{paddingHorizontal: 30, paddingVertical: 25, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: "#000000"}}>Hướng dẫn đặt vé</Text>
            <Text style={{fontSize: 15, fontWeight: '400', color: "red", fontStyle: 'italic'}}>Đọc kỹ hướng dẫn trước khi đặt vé sẽ tránh được nhiều sai xót không đáng có</Text>
          </View>
          <View style={{paddingTop: 20, paddingLeft: 30}}>
            <Icon name="chevron-right" color="black" style={{fontSize: 20}} />
          </View>
        </TouchableOpacity>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingBottom: 25,
    borderBottomRightRadius: 40,
  },
  Button: {
    paddingHorizontal: 100,
    alignSelf: 'center',
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  Button2: {
    paddingHorizontal: 120,
    alignSelf: 'center',
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginTop: 20,
    borderRadius: 8,
  },
  Button3: {
    paddingHorizontal: 25,
    alignSelf: 'center',
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginTop: 20,
    borderRadius: 8,
  }
})

export default Profile;