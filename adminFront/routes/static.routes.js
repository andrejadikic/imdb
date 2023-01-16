const express= require ('express');

const root = { root: 'static'}
const router = express.Router();
//auth

router.get('/users', (req, res) => {
    res.sendFile('user.html', root)
})
router.get('/index', (req, res) => {
    res.sendFile('index.html', root)
})

router.get('/awards', (req, res) => {
    res.sendFile('award.html', root)
})
router.get('/winners', (req, res) => {
    res.sendFile('winner.html', root)
})
router.get('/celebrities', (req, res) => {
    res.sendFile('celebrity.html', root)
})
router.get('/events', (req, res) => {
    res.sendFile('event.html', root)
})
router.get('/genres', (req, res) => {
    res.sendFile('genre.html', root)
})
router.get('/movies', (req, res) => {
    res.sendFile('movie.html', root)
})
router.get('/roles', (req, res) => {
    res.sendFile('role.html', root)
})
router.get('/news', (req, res) => {
    res.sendFile('news.html', root)
})
router.get('/professions', (req, res) => {
    res.sendFile('profession.html', root)
})
router.get('/reviews', (req, res) => {
    res.sendFile('review.html', root)
})
router.get('/login', (req, res) => {
    res.sendFile('login.html', root)
})
router.get('/register', (req, res) => {
    res.sendFile('register.html', root)
})

router.get('/', (req, res) => {
    res.sendFile('home.html', root);
})

module.exports = router;