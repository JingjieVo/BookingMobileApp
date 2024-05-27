import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import config from '../config'

const BASE_URL = config.BASE_URL_BILL; 
// Thay đổi đường dẫn này với URL của backend server của bạn

const billService = {
    // Tạo mới một hóa đơn
    addBill: async (billData : any) => {
        try {
            const response = await axios.post(`${BASE_URL}`, billData);
            if (response.status === 201) {
                const _id = response.data._id; // Lấy ID của bill từ response
                return _id; // Trả về ID
            }
            return null;
        } catch (error) {
            console.error('Error adding bill:', error);
            throw error;
        }
    },

    // Lấy danh sách tất cả các hóa đơn
    getAllBills: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/`);
            return response.data;
        } catch (error) {
            console.error('Error getting all bills:', error);
            throw error;
        }
    },

    // Lấy hóa đơn theo ID
    getBillById: async (id : any) => {
        try {
            const response = await axios.get(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting bill by ID:', error);
            throw error;
        }
    },

    // Cập nhật hóa đơn
    updateBill: async (id : any , billData : any) => {
        try {
            const response = await axios.put(`${BASE_URL}/${id}`, billData);
            return response.data;
        } catch (error) {
            console.error('Error updating bill:', error);
            throw error;
        }
    },

    // Xóa hóa đơn
    deleteBill: async (id : any) => {
        try {
            const response = await axios.delete(`${BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting bill:', error);
            throw error;
        }
    }
};

export default billService;
