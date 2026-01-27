const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

//get all events
router.get("/", (req, res) => {
  Event.find()
    .then(events => {
      return res.status(200).json(events);
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    });
});

//add an event
// {
//     "generalInfo": {
//     "name":"Christmas Party Hollister",
//     "client":"Dan Hollister",
//     "location":"10 Newbury St, oston",
//     "guests":"75",
//     "type":"Holiday Party"
//     }
// }
router.post("/", (req, res) => {
  const { generalInfo, staff, equipment, bar, food, feedback } = req.body;

  if (!generalInfo) {
    return res.status(400).json({
      message: "generalInfo is required",
    });
  }

  Event.create({ generalInfo, staff, equipment, bar, food, feedback })
    .then(event => {
      res.status(201).json(event);
    })
    .catch(err => {
      console.error(err);

      if (err.name === "ValidationError") {
        return res.status(400).json({
          message: "Invalid event data",
          errors: err.errors,
        });
      }

      res.status(500).json({ message: "Server error" });
    });
});

//get event by id
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      res.status(200).json(event);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

//get staff for a specific
router.get("/:id/staff", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      res.status(200).json(event.staff);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

//update specific part of an event
router.patch("/:id", (req, res) => {
  console.log("PATCH /api/events/:id HIT");
  console.log("BODY:", req.body);
  const { id } = req.params;

  Event.findByIdAndUpdate(
    id,
    { $push: req.body }, //update only the part of the event we put in the body
    { new: true, runValidators: true }, //return the new event & make sure all the data we're trying to update is in the proper format
  )
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }

      res.status(200).json(event);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

//update staff example
// {
//   "staff": [
//     {"name":"jane doe", "start":"6am", "end":"6pm"}
//   ]
// }

module.exports = router;
