const router = require("express").Router();
const PaymentCtrl = require("../controllers/paymentCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
router
  .route("/payment")
  .get(auth, authAdmin, PaymentCtrl.getPayments)
  .post(auth, PaymentCtrl.createPayments);
module.exports = router;
