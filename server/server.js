const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;
dotenv.config();
// Kết nối tới MongoDB
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());
app.use(morgan("common"));
const ticketRoutes = require('./routes/ticketRoutes');
const userRoutes = require('./routes/userRoutes');
const driverRoutes = require('./routes/driverRoutes');
const bookingHistoryRoutes = require('./routes/bookingHistoryRoutes');
const coachRoutes = require('./routes/coachRoutes');
const tripRoutes = require('./routes/tripRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
// ...
  
app.use('/api/tickets', ticketRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/bookingHistories', bookingHistoryRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/booking', bookingRoutes);

  // ...
// Sử dụng body-parser middleware
app.use(bodyParser.json());


// Lắng nghe các yêu cầu từ client
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));