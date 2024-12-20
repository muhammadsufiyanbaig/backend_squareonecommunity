const express = require("express");
const { deleteComplaint, editComplaints, createComplaints, getAllComplaints } = require("../controllers/supportController");
const router = express.Router();

router.post("/create", createComplaints);
router.get("/get", getAllComplaints);
router.put("/edit", editComplaints);
router.delete("/delete", deleteComplaint);

module.exports = router;