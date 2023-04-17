const router = require("express").Router();

const pageRoutes = require("./pageroutes");

const userRoutes = require("./api/userroutes");

router.use("/", pageRoutes);

router.use("/api", userRoutes);

module.exports = router;

