import axios from 'axios';
import config from '../config';

const BASE_URL = config.BASE_URL_BOOKING   

const bookingService = {
  // Đặt vé
  bookTicket: async ({ userId, guestName, identifyNumber, tripId, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId } : any) => {
    try {
      const response = await axios.post(`${BASE_URL}/book-ticket`, {
        userId, guestName, identifyNumber, tripId, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId
      });

      if (response.status === 201) {
        return response.data;
      } else {
        console.error('Error booking ticket:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error booking ticket:', error);
      throw error;
    }
  },

  // Đặt vé cụ thể
  bookSpecificTicket: async ({ userId, guestName, identifyNumber, tripId, seatCode, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId } : any) => {
    try {
      const response = await axios.post(`${BASE_URL}/book-ticket-w-seat`, {
        userId, guestName, identifyNumber, tripId, seatCode, departureTime, date, departure, departureDescriptions, destination, destinationDescriptions, estimatedTime, arrivalTime, arrivalDate, driverName, coachLicensePlate, billId
      });

      if (response.status === 201) {
        return response.data;
      } else {
        console.error('Error booking specific ticket:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error booking specific ticket:', error);
      throw error;
    }
  },

  // Lấy danh sách vé đã đặt của người dùng
  getUserBookingList: async (userId : any) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}/booking-list`);

      if (response.status === 200) {
        return response.data;
      } else {
        console.error('Error getting user booking list:', response.status);
        return null;
      }
    } catch (error) {
      console.error('Error getting user booking list:', error);
      throw error;
    }
  }
};

export default bookingService;
