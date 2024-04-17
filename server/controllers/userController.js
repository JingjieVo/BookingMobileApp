const User = require('../models/user'); // Import mô hình người dùng
const BookingHistory = require('../models/bookingHistory');
const userController = {
    // ADD USER
    addUser: async (req, res) => {
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          phone: req.body.phone
        });
        const bookingHistory = new BookingHistory({
          userId: user._id,
          bookingList: []
      });
        try {
          await user.save();
          await bookingHistory.save();
          //const token  = jwt.sign({ id: user._id }, secretKey);
          res.status(201).json(user);
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
        
    },
    // CHECK USER
    checkUser: async (req, res) => {
        const { email, password } = req.body;
      
        try {
          const user = await User.findOne({ email });
          if (!user) {
            return res.status(404 ).json({ message: 'User not found' });
          }
          const isValidPassword = user.password === password;
          if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid password' });
          } else {
          res.status(200).json({accessToken,
          UserInfo: user
          });
          }
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      },
    // GET ALL USERS
    getAllUsers: async (req, res) => {
        try {
          const users = await User.find();
          res.status(200).json(users);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    },
    getAnUser: async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
  },
    
}

module.exports = userController;