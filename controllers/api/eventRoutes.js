const router = require("express").Router();
const {PlayDate} = require("../../models");
const withAuth = require("../../utils/auth");

router.post('/', async (req, res) => {
    try {
      const newPlayDate = await PlayDate.create({
        ...req.body,
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

router.get('/', async (req, res) => {
    try {
      const playDateData = await PlayDate.findAll({
        include: [{model: User},{model: Pet}],
      });
      const playDates = playDateData.map((playDate) => playDate.get({ plain: true }));
      console.log(playDates);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;