const router = require("express").Router();
const appsController = require("../../controllers/appsController");

// Matches with "/api/"
router.route("/")
  .get(appsController.findAll)
  .post(appsController.create);

// Matches with "/api/apps/:id"
router
  .route("/:id")
  .get(appsController.findById)
  .put(appsController.update)
  .delete(appsController.remove);

module.exports = router;
