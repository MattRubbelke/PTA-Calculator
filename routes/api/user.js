const router = require("express").Router();
const userController = require("../../controllers/userController");

// Matches with "/api/"
router.route("/")
  .post(userController.create);

// Matches with "/api/user/:id"
router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;