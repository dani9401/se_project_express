const router = require('express').Router();

const {createUser, getUsers, getUser} = require('../controllers/user')

// CREATE
router.post('/', createUser);

// READ
router.get('/', getUsers);

router.get('/:userId', getUser)

// UPDATE


// DELETE


module.exports = router;