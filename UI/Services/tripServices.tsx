import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_TRIP; // Thay đổi đường dẫn này với URL của backend server của bạn

const tripDAO = {
  // Tạo mới một chuyến xe
  addTrip: async (tripData : any) => {
    try {
      const response = await axios.post(`${BASE_URL}/`, tripData);
      return response.data;
    } catch (error) {
      console.error('Error adding trip:', error);
      throw error;
    }
  },

  // Lấy danh sách tất cả các chuyến xe
  getAllTrips: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/`);
      return response.data;
    } catch (error) {
      console.error('Error getting all trips:', error);
      throw error;
    }
  },

  // Tìm chuyến xe dựa trên điểm xuất phát và điểm đến
  findTripsByDepartureAndDestination: async (departure : any, destination : any, date : any) => {
    try {
      const response = await axios.get(`${BASE_URL}/search?departure=${departure}&destination=${destination}&date=${date}`);
      return response.data;
    } catch (error) {
      console.error('Error finding trips by departure and destination:', error);
      throw error;
    }
  },

  // Lấy danh sách vé của một chuyến xe
  getTicketListOfTrip: async (tripId : any) => {
    try {
      const response = await axios.get(`${BASE_URL}/tickets`, {
        params: {
          tripId
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting ticket list of trip:', error);
      throw error;
    }
  },
  deleteTrip: async (trip : any) => {
    const {
      departure, 
      departureTime,
      destination,
      date,
      driverId,
      coachId,
      estimatedTime,
      tripPrice
    } = trip
    try {
      console.log(trip)
      const response = await axios.delete(`${BASE_URL}/`, {
        params: {
          departure : departure,
          departureTime : departureTime,
          destination : destination,
          date : date,
          driverId : driverId,
          coachId : coachId,
          estimatedTime : estimatedTime,
          tripPrice : tripPrice 
        }})
      if (response.status === 200) {
        console.log(response.data);
        return true;
      }
      return false;
    }catch (error) {
      console.log('Error deleting trip:', error);
      return false;
    }
  }
};

export default tripDAO;
