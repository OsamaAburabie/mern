const Ticket = require("../models/ticketModel");

exports.get_all_tickets_by_admin = async function (req, res) {
  try {
    const user = await User.findById(req.user);
    //checking if this user is an admin
    if (user.role != "admin")
      return res.status(400).json({ msg: "Unauthorized" });
    //if the user is an admin return back all the tickets
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.change_ticket_status = async function (req, res) {
  try {
    const user = await User.findById(req.user);
    //checking if this user is an admin
    if (user.role != "admin")
      return res.status(400).json({ msg: "Unauthorized" });
    //if the user is an admin they can edit ticket status
    const ticket = await Ticket.findOne({
      _id: req.params.id,
    });
    if (!ticket) return res.status(400).json({ msg: "No ticket found" });
    const editedTickt = await ticket.updateOne({ status: req.body.status });
    const updated = await Ticket.findOne({
      _id: req.params.id,
    });
    res.json(updated.status);
  } catch (err) {
    res.status(404).json({ msg: "Not found 404" });
  }
};
