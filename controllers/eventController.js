
const { insertEvent, getAllEventsWithCounts, getAllEventsWithUserId, updateEvent, removeEvent, updateEventDetails } = require('../models/eventModel');

const createEvents = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { title, description, background, banner, startDate, endDate, activities} = req.body;
  if (!title) {
    return res.status(400).json({ message: "Brand Id is required" });
  } else if (!description) {
    return res.status(400).json({ message: "Tittle is required" });
  } else if (!background) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!banner) {
    return res.status(400).json({ message: "tagline is required" });
  } else if (!startDate) {
    return res.status(400).json({ message: "Start Date is required" });
  } else if (!endDate) {
    return res.status(400).json({ message: "End Date is required" });
  } else if (!activities) {
    return res.status(400).json({ message: "Picture is required" });
  }
  
  try {
    await insertEvent(title, description, background, banner, startDate, endDate, activities);
    res.status(201).json({ message: "Deal is successfully created" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error creating brand",
        error: error.message,
        stack: error.stack,
      });
  }
}; 

const getAllEventsForAdmin = async (req, res) => {
  try {
    const events = await getAllEventsWithCounts(DealId);
    if (events.length === 0) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json({ message: "Events details", data: events });
  } catch (error) {
    res.status(500).json({ message: "Error to getting events details", error: error.message });
  }
};

const getAllEventsForUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({ error: "Request body is missing" });
  }
  const { userId} = req.body;
  if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  }
  try {
    const events = await getAllEventsWithUserId(userId);
    if (events.length === 0) {
      return res.status(404).json({ message: "Events not found" });
    }
    res.status(200).json({ message: "Events details", data: events });
  } catch (error) {
    res.status(500).json({ message: "Error to getting events details", error: error.message });
  }
};

const editEvents = async (req, res) => {
  const { id, title, description, background, banner, startDate, endDate, activities } = req.body;
  if(!id) {
    return res.status(400).json({ message: "Event Id is required" });
  } else if (!title) {
    return res.status(400).json({ message: "Title is required" });
  } else if (!description) {
    return res.status(400).json({ message: "Description is required" });
  } else if (!background) {
    return res.status(400).json({ message: "Background By is required" });
  } else if (!banner) {
    return res.status(400).json({ message: "Banner is required" });
  } else if (!startDate) {
    return res.status(400).json({ message: "Start Date is required" });
  } else if (!endDate) {
    return res.status(400).json({ message: "End Date is required" });
  } else if (!activities) {
    return res.status(400).json({ message: "Activities is required" });
  } 
  try {
    await updateEvent( id, title, description, background, banner, startDate, endDate, activities);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};
const editEventDetails = async (req, res) => {
  const { id, userId, eventId, liked, going } = req.body;
  if(!id) {
    return res.status(400).json({ message: "Id is required" });
  } else if (!userId) {
    return res.status(400).json({ message: "User Id is required" });
  } else if (!eventId) {
    return res.status(400).json({ message: "Event Id is required" });
  } else if (!liked === null) {
    return res.status(400).json({ message: "liked is required" });
  } else if (!going === null) {
    return res.status(400).json({ message: "going is required" });
  } 
  try {
    await updateEventDetails( id, userId, eventId, liked, going);
    res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error: error.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ message: "Event Id is required" });
  }
  try {
    await removeEvent(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting Event", error: error.message });
  }
};


module.exports = { deleteEvent, editEvents, editEventDetails ,getAllEventsForUser, getAllEventsForAdmin, createEvents }