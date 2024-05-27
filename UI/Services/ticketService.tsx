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

  // Lấy danh sách tất cả các tickets
  getAllTickets: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting all tickets:', error);
      throw error;
    }
  },

  // Tìm các vé có sẵn
  findAvailableTickets: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/available-tickets`);
      return response.data;
    } catch (error) {
      console.error('Error finding available tickets:', error);
      throw error;
    }
  },

  // Tìm chuyến đi dựa trên ticketId
  findTripByTicketId: async (ticketId : string) => {
    try {
      const response = await axios.get(`${BASE_URL}/findtrip/${ticketId}`);
      return response.data;
    } catch (error) {
      console.error('Error finding trip by ticketId:', error);
      throw error;
    }
  },
  // Cập nhật trạng thái available của vé
  updateTicketAvailability: async (tripId: string, ticketId: string, available: boolean) => {
    try {
      const response = await axios.put(`${BASE_URL}/update-tripavailability`, {
        tripId,
        ticketId,
        available
      });
      return response.data;
    } catch (error) {
      console.error('Error updating ticket availability:', error);
      throw error;
    }
  }
};

export default ticketDAO;
