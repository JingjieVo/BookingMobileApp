import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_COACH; // Thay đổi đường dẫn này với URL của backend server của bạn
 // Thay đổi đường dẫn này với URL của backend server của bạn

const coachService = {
  // Lấy tất cả các địa điểm
  getAllCoaches: async () => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error('Error getting all coaches:', error);
      throw error;
    }
  },

  // Tạo một địa điểm mới
  createCoach: async (coachData: any) => {
    try {
      console.log(coachData)
      const response = await axios.post(`${BASE_URL}/`, coachData);
      if(response.status === 201) {
        return true
      }
      return false;
    } catch (error) {
      console.error('Error creating coaches:', error);
      return false;
    }
  },
  deleteCoach: async (coachId : any) => {
    try {
      const response = await axios.delete(`${BASE_URL}/delete?coachId=${coachId}`)
      if (response.status === 200) {
        return true;
      }
      return false;
    }catch (error) {
      console.log('Error deleting coach:', error);
      return false;
    }
  }
};

export default coachService;
