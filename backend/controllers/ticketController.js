const Ticket = require("../models/ticketModel");

exports.add_ticket = async function (req, res) {
  try {
    const { title, body, email } = req.body;
    //validation
    if (!title || !body || !email)
      return res.status(400).json({ msg: "Please fill all the fields" });

    const newTicket = new Ticket({
      title,
      body,
      email,
      userId: req.user,
    });
    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_all_tickets = async function (req, res) {
  try {
    const tickets = await Ticket.find({ userId: req.user });
    res.json(tickets);
  } catch (err) {
    res.status(404).json({ msg: "Not found 404" });
  }
};
exports.get_specific_ticket = async function (req, res) {
  try {
    const tickets = await Ticket.findOne({
      userId: req.user,
      _id: req.params.id,
    });
    res.json(tickets);
  } catch (err) {
    res.status(404).json({ msg: "Not found 404" });
  }
};
exports.delete_specific_ticket = async function (req, res) {
  try {
    const ticket = await Ticket.findOne({
      userId: req.user,
      _id: req.params.id,
    });
    if (!ticket) return res.status(400).json({ msg: "No ticket found" });
    const deleteTicket = await Ticket.findByIdAndDelete(req.params.id);
    res.json(deleteTicket);
  } catch (err) {
    res.status(404).json({ msg: "Not found 404" });
  }
};
