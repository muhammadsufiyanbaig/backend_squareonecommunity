const express = require("express");
const { createEvents, getAllEventsForAdmin, getAllEventsForUser, editEvents, deleteEvent, editEventDetails } = require("../controllers/eventController");
const router = express.Router();

router.post("/create", createEvents);
router.get("/admin/get", getAllEventsForAdmin);
router.post("/user/get", getAllEventsForUser);
router.post("/eventstatus", editEventDetails);
router.put("/edit", editEvents);
router.delete("/delete", deleteEvent);

module.exports = router;