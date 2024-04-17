const Coach = require('../models/coach');

const coachController = {
  // ADD COACH
  addCoach: async (req, res) => {
    const {licensePlate} = req.body;

    try {
      const coach = new Coach({
        licensePlate
      });

      await coach.save();
      res.status(201).json(coach);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
  // GET ALL COACHES
  getAllCoaches: async (req, res) => {
    try {
      const coaches = await Coach.find();
      res.status(200).json(coaches);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = coachController;
