const express = require("express");
const Event = require("../models/Event");

const router = express.Router();

/* ======================================================
   GET ROUTES
   ====================================================== */

// Get all events
router.get("/", (req, res) => {
  Event.find()
    .then(events => res.status(200).json(events))
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

// Get staff for a specific event
router.get("/:id/staff", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json(event.staff);
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

// Get event by ID (keep BELOW specific GETs so it doesn't intercept)
router.get("/:id", (req, res) => {
  const { id } = req.params;

  Event.findById(id)
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

//  Create event
router.post("/", (req, res) => {
  const { generalInfo, staff, equipment, bar, food, feedback } = req.body;

  if (!generalInfo) {
    return res.status(400).json({
      message: "generalInfo is required",
    });
  }

  Event.create({ generalInfo, staff, equipment, bar, food, feedback })
    .then(event => res.status(201).json(event))
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

// Update general info
router.patch("/:id/general-info", (req, res) => {
  const { id } = req.params;
  const { generalInfo } = req.body;

  if (!generalInfo) {
    return res.status(400).json({
      message: "generalInfo is required",
    });
  }

  Event.findByIdAndUpdate(
    id,
    { $set: { generalInfo } },
    { new: true, runValidators: true },
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

// update food
router.patch("/:id/food", (req, res) => {
  const { id } = req.params;
  const { food } = req.body;

  if (!food) {
    return res.status(400).json({
      message: "food is required",
    });
  }

  Event.findByIdAndUpdate(
    id,
    { $set: { food } },
    { new: true, runValidators: true },
  )
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

// update feedback
router.patch("/:id/feedback", (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;

  if (feedback === undefined) {
    return res.status(400).json({
      message: "feedback is required",
    });
  }

  Event.findByIdAndUpdate(
    id,
    { $set: { feedback } },
    { new: true, runValidators: true },
  )
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

//Has to stay last or will intercept other patch  requests
router.patch("/:id", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndUpdate(
    id,
    { $push: req.body },
    { new: true, runValidators: true },
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

// Delete event
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Event.findByIdAndDelete(id)
    .then(event => {
      if (!event) {
        return res.status(404).json({ message: "Event not found" });
      }
      res.status(200).json({
        message: "Event deleted successfully",
        id: event._id,
      });
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    });
});

module.exports = router;
