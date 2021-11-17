const router = require("express").Router();
const usersRoutes = require("./users");
const healthcheckRoutes = require("./healthcheck");
const authRoutes = require("./authorization");
const domainRoutes = require("./domain");
const otpRoutes = require("./otp");

//health checker
router.use("/healthcheck", healthcheckRoutes);
router.use("/users", usersRoutes);
router.use("/login", authRoutes);
router.use("/domain", domainRoutes);
router.use("/send-sms", otpRoutes);

module.exports = router;
