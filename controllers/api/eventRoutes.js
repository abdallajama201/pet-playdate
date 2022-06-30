const router = require("express").Router();
const {PlayDate, User} = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', async (req, res) => {
    try {
      const newPlayDate = await PlayDate.create({
        date: req.body.date,
        location: req.body.location,
        user_id: req.session.user_id,
      });
      res.status(200).json(newPlayDate);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const PlayDateData = await PlayDate.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (!PlayDateData) {
        res.status(404).json({ message: 'No PlayDate found with this id!' });
        return;
      }
      res.status(200).json(PlayDateData);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.params.id, {
        include: [{ model: User}]
      });
      const play = playDateData.get({ plain: true });
      console.log(play);
      // console.log(playDates);
      res.status(200).json(play);
    } catch (err) {
      res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.params.id);

      const user = await User.findByPk(req.session.user_id);
      await playDateData.addPet(pet);

      // console.log(playDates);
      res.status(200).json("ll");
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;