const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/"
router.route("/")
  .post(userController.create)
  .get(userController.findAll)

// Matches with "/api/users/:id"
router
  .route("/:id")
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;