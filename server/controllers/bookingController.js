const BookingHistory = require('../models/bookingHistory');
const Ticket = require('../models/ticket');
const Trip = require('../models/trip');


const bookingController = {
    // Đặt vé
    bookTicket: async (req, res) => {
        const { userId, guestName, identifyNumber, tripId } = req.body;
    
        try {
            // Tìm chuyến xe dựa trên tripId
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(404).json({ message: 'Trip not found' });
            }
    
            // Tìm vé chưa được mua trong chuyến xe
            const availableTicket = await Ticket.findOne({ tripId: tripId, isBought: false});
            if (!availableTicket) {
                return res.status(400).json({ message: 'No available ticket for this trip' });
            }
    
            // Tạo hoặc tìm đối tượng BookingHistory dựa trên userId
            let bookingHistory = await BookingHistory.findOne({ userId: userId });
    
            // Nếu không tìm thấy, tạo một bookingHistory mới
            if (!bookingHistory) {
                bookingHistory = new BookingHistory({
                    userId: userId,
                    bookingList: []
                });
            }
    
            // Thêm ticket được đặt vào danh sách bookingList của bookingHistory
            bookingHistory.bookingList.push({
                ticket: availableTicket._id,
                guestName: guestName,
                identifyNumber: identifyNumber,
                dateBooking: new Date()
            });
    
            // Lưu bookingHistory vào cơ sở dữ liệu
            await bookingHistory.save();
    
            // Cập nhật trạng thái của vé (đánh dấu là đã mua)
            availableTicket.isBought = true;
    
            // Lưu thông tin vé đã được cập nhật
            await availableTicket.save();
    
            res.status(201).json({ message: 'Ticket booked successfully', bookingHistory: bookingHistory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    bookSpecificTicket: async (req, res) => {
        const { userId, guestName, identifyNumber, tripId, seatCode } = req.body;

        try {
            // Kiểm tra xem chuyến xe tồn tại không
            const trip = await Trip.findById(tripId);
            if (!trip) {
                return res.status(404).json({ message: 'Trip not found' });
            }

            // Tìm vé dựa trên mã ghế và tripId
            const ticket = await Ticket.findOne({ tripId: tripId, seatCode: seatCode});
            if (!ticket) {
                return res.status(404).json({ message: 'Ticket not found' });
            }

            if (ticket.isBought) {
                return res.status(400).json({ message: 'This ticket has already been bought' });
            }

            // Tạo hoặc tìm đối tượng BookingHistory dựa trên userId
            let bookingHistory = await BookingHistory.findOne({ userId: userId });
    
            // Nếu không tìm thấy, tạo một bookingHistory mới
            if (!bookingHistory) {
                bookingHistory = new BookingHistory({
                    userId: userId,
                    bookingList: []
                });
            }
    
            // Thêm ticket được đặt vào danh sách bookingList của bookingHistory
            bookingHistory.bookingList.push({
                ticket: ticket._id,
                guestName: guestName,
                identifyNumber: identifyNumber,
                dateBooking: new Date()
            });

            // Lưu bookingHistory vào cơ sở dữ liệu
            await bookingHistory.save();

            // Cập nhật trạng thái của ticket (ví dụ: đánh dấu là đã được mua)
            ticket.isBought = true;

            // Lưu lại thông tin ticket đã cập nhật
            await ticket.save();

            res.status(201).json({ message: 'Ticket booked successfully', bookingHistory: bookingHistory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    getUserBookingList: async (req, res) => {
        const { userId } = req.params;

        try {
            // Tìm kiếm booking history của người dùng
            const bookingHistory = await BookingHistory.findOne({ userId: userId }).populate('bookingList.ticket');

            if (!bookingHistory) {
                return res.status(404).json({ message: 'Booking history not found' });
            }

            // Trả về danh sách các vé đã đặt của người dùng
            res.status(200).json(bookingHistory.bookingList);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = bookingController;