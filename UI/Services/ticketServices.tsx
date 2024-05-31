import axios from 'axios';

const BASE_URL = 'http://10.0.2.2:3000/api/tickets'; // Thay đổi đường dẫn này với URL của backend server của bạn

const ticketDAO = {
  // Tạo mới một ticket
  addTicket: async (ticketData: any) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, ticketData);
      return response.data;
    } catch (error) {
      console.error('Error adding ticket:', error);
      throw error;
    }
  },
};

export default ticketDAO;
