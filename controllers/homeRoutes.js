const router = require('express').Router();

const { PlayDate, User, Pet } = require("../models");

const withAuth = require('../utils/auth');
const fileUpload = require('express-fileupload');

// Homepage route
router.get('/', async (req, res) => {
    try {
      const playDateData = await PlayDate.findAll({
        include: [{model: User},{model: Pet}],
      });
      const playDates = playDateData.map((playDate) => playDate.get({ plain: true }));
      res.render('homepage', { 
        playDates,
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// Invdividual playdate route
router.get('/event/:id', withAuth, async (req, res) => {
    try {
      const playDateData = await PlayDate.findByPk(req.params.id, {
        include: [{model: Pet},{model: User}],
      });
      const playDate = playDateData.get({ plain: true });
      res.render('event-details', {
        ...playDate,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// route to profile
router.get('/profile', withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Pet},{model: PlayDate}],
      });
      const user = userData.get({ plain: true });
      console.log(user);
      res.render('profile', {
        ...user,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// route for new event
router.get('/addevent', (req, res) => { 
    res.render("add-event");
});

// route for new pet
router.get('/addpet', (req, res) => { 
    res.render("add-pet");
});

// route to login
router.get('/login', (req, res) => { 
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render("login");
});

module.exports = router;
