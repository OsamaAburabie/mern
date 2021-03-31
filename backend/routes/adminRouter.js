const router = require("express").Router();
const auth = require("../middleware/auth");
const { admin_register } = require("../controllers/authController");
const {
  get_all_tickets_by_admin,
  change_ticket_status,
} = require("../controllers/manageTicketsController");

router.post("/register", auth, admin_register);

// router.post("/login", admin_login);

//getting all tickets for all customers
router.get("/allTickets", auth, get_all_tickets_by_admin);

router.put("/allTickets/:id", auth, change_ticket_status);
module.exports = router;
