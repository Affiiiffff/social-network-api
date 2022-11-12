const router = require("express").Router();
const {
  getUsers,
  getUser,
  deleteUser,
  addFriend,
  removeFriend,
  createUser,
  updateUser,
} = require("../../controllers/user-controller");
// get put delete users
router.route("/").get(getUsers).post(createUser);

router.route("/:userId").get(getUser).delete(deleteUser).put(updateUser);

router
  .route("/:userId/friends/:friendsId")
  .post(addFriend)
  .delete(removeFriend);

module.exports = router;
