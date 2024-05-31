import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_REVENUE; 
// Thay đổi đường dẫn này với URL của backend server của bạn

const revenueServices = {
    // Get total revenue
    getTotalRevenue: async () => {
      try {
        const response = await axios.get(`${BASE_URL}/total`);
        return response.data;
      } catch (error) {
        console.error('Error fetching total revenue:', error);
        throw error;
      }
    },
  
    // Get daily revenue
    getDailyRevenue: async (date : any) => {
      try {
        const response = await axios.get(`${BASE_URL}/daily`, {
          params: { date }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching daily revenue:', error);
        throw error;
      }
    },
  
    // Get monthly revenue
    getMonthlyRevenue: async (monthYear : any) => {
        const year = monthYear.split(' ')[0];
        const month = monthYear.split(' ')[1];
      try {
        const response = await axios.get(`${BASE_URL}/monthly?year=${year}&month=${month}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching monthly revenue:', error);
        throw error;
      }
    },
  
    // Get yearly revenue
    getYearlyRevenue: async (year : any) => {
      try {
        const response = await axios.get(`${BASE_URL}/yearly`, {
          params: { year }
        });
        return response.data;
      } catch (error) {
        console.error('Error fetching yearly revenue:', error);
        throw error;
      }
    }
  };
  
  export default revenueServices;