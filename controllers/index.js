const router = require("express").Router();

const pageRoutes = require("./pageroutes");

router.use("/", pageRoutes);

module.exports = router;