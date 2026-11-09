const router = require('express').Router();
const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const {
  validateProfile,
  validateAvatar,
  validateUserId,
} = require('../middlewares/validation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.patch('/me', validateProfile, updateProfile);
router.patch('/me/avatar', validateAvatar, updateAvatar);
router.get('/:userId', validateUserId, getUserById);

module.exports = router;
