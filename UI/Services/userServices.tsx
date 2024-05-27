import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_USER; 
 // Thay đổi đường dẫn này với URL của backend server của bạn

const userService = {
    login: async (phone: string, password: string) => {
        try {
          const response = await axios.post(`${BASE_URL}/login`, { phone: phone, password: password });
      
          if (response.status === 200) {
            const { _id, username, email, phone, name } = response.data;
            console.log('thanh cong')
            await AsyncStorage.setItem('user', JSON.stringify({_id, username, email, phone, name }));
            return response.data;
          }
          return null;
        } catch (error) {
          console.log('Error during login:', error);
        }
    },
    getUser: async () => {
        try {
          const user = await AsyncStorage.getItem('user');
          return user ? JSON.parse(user) : null;
        } catch (error) {
          console.error('Error getting user from AsyncStorage:', error);
          throw error;
        }
    },
    logout : async () => {
        try {
          await AsyncStorage.removeItem('user');
        } catch (error) {
          console.error('Error during logout:', error);
          throw error;
        }
    }
};

export default userService;
