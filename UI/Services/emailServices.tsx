import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_EMAIL; // Thay đổi đường dẫn này với URL của backend server của bạn
 // Thay đổi đường dẫn này với URL của backend server của bạn

const emailService = {
  // Lấy tất cả các địa điểm
    sendEmail: async (email : any) => {
    try {
      const response = await axios.post(`${BASE_URL}/sendemail`, {email : email});
      if(response.status === 200) {
        return true
      }
      return false
    } catch (error) {
      return false;
    }
  },
};

export default emailService;
