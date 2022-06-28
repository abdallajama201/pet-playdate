const router = require('express').Router();
cosnt { PlayDate, Owner, Pet } = require("../../models");
const withAuth = require('../utils/auth');

// Homepage route
router.get('/', async (req, res) => {
    try {
      const playDateData = await PlayDate.findAll({
        include: [{model: Owner},{model: Pet}],
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
        include: [{model: Pet},{model: Owner}],
      });
      const playDate = playDateData.get({ plain: true });
      res.render('event', {
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
      const userData = await Owner.findByPk(req.session.user_id, {
        attributes: { exclude: ['password'] },
        include: [{ model: Pets},{model: PlayDate}],
      });
      const owner = userData.get({ plain: true });
      res.render('profile', {
        ...owner,
        logged_in: true
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

// route for new event
router.get('/addnew', (req, res) => { 
    res.render("addnew");
});

// route to login
router.get('/login', (req, res) => { 
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }
    res.render("login");
});
