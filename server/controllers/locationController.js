const Location = require('../models/location');

const locationController = {
  // Lấy tất cả các địa điểm
  getAllLocations: async (req, res) => {
    try {
      const locations = await Location.find();
      res.json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Tạo một địa điểm mới
  createLocation: async (req, res) => {
    const { name, description, imgLink } = req.body;
    try {
      const newLocation = new Location({
        name: name,
        description: description,
        imgLink: imgLink
      });
      await newLocation.save();
      res.status(201).json({ message: 'Location created successfully', location: newLocation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
  // Tìm địa điểm theo tên
  getLocationByName: async (req, res) => {
    const keyword = req.params.keyword;
        try {
            const locations = await Location.find({ name: { $regex: keyword, $options: 'i' } });
            res.status(200).json(locations);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
  }
};

module.exports = locationController;
