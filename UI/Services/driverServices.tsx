import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_DRIVER; // Thay đổi đường dẫn này với URL của backend server của bạn
 // Thay đổi đường dẫn này với URL của backend server của bạn

const driverService = {
  // Lấy tất cả các địa điểm
  getAllDrivers: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error getting all locations:', error);
      throw error;
    }
  },

  // Tạo một địa điểm mới
  createDriver: async (driverData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, driverData);
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },
  deleteDriver: async (driverId : any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete?driverId=${driverId}`)
      if (response.status === 200) {
        return true;
      }
      return false;
    }catch (error) {
      console.log('Error deleting driver:', error);
      return false;
    }
  }
};

export default driverService;
