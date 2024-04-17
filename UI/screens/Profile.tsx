
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
import { type StackNavigation } from "../App";


function Profile() {
  const { navigate } = useNavigation<StackNavigation>();

    const handleOnNavigate = () => {
        navigate("Login");
    }
  return (
    <TouchableOpacity  onPress={handleOnNavigate}>
                            <Text style={{alignSelf: 'center', fontWeight: 'bold'}}>Đăng nhập</Text>
    </TouchableOpacity>
  );
}

export default Profile;