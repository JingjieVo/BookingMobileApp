import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_LOCATIONS; // Thay đổi đường dẫn này với URL của backend server của bạn
 // Thay đổi đường dẫn này với URL của backend server của bạn

const locationDAO = {
  // Lấy tất cả các địa điểm
  getAllLocations: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error getting all locations:', error);
      throw error;
    }
  },

  // Tạo một địa điểm mới
  createLocation: async (locationData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, locationData);
      return response.data;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  },

  // Tìm địa điểm theo tên
  getLocationByName: async (keyword: any) => {
    try {
      const response = await axios.get(`${BASE_URL}/search/${keyword}`);
      return response.data;
    } catch (error) {
      console.error('Error finding location by name:', error);
      throw error;
    }
  }
};

export default locationDAO;
