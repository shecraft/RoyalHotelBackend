const express = require("express");
const { submitManualPayment } = require("../controllers/paymentContoller");
const { upload } = require("../middlewares/upload");

const router = express.Router();
router.post("/manual", upload.single("screenshot"), submitManualPayment);

module.exports = router;
