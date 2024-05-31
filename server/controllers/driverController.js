const Driver = require('../models/driver');

const driverController = {
    // ADD DRIVER
    addDriver: async (req, res) => {
        const { name, licenseNumber, phone } = req.body;

        try {
            const driver = new Driver({
                name,
                licenseNumber,
                phone
            });

            await driver.save();
            res.status(201).json(driver);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    // GET ALL DRIVERS
    getAllDrivers: async (req, res) => {
        try {
            const drivers = await Driver.find();
            res.status(200).json(drivers);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deleteDriver: async (req, res) => {
        const { driverId } = req.query;
         try {
            const driver = await Driver.findByIdAndDelete(driverId);
            res.status(200).json({ message: driver});
         } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
         }
      }
};

module.exports = driverController;