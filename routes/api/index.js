const router = require("express").Router();
const appRoutes = require("./apps");
const userRoutes = require("./user")

// App routes
router.use("/apps", appRoutes);
router.use("/user", userRoutes);

module.exports = router;
