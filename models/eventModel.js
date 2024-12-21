const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function insertEvent(title, description, background, banner, start_date, end_date, activities) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO events (id, title, description, background, banner, start_date, end_date, activities)
              VALUES (${uniqueId}, ${title}, ${description}, ${background}, ${banner}, ${start_date}, ${end_date}, ${activities})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error; 
  }
}

async function getAllEvents() {
  try {
    const ads = await sql`SELECT * FROM events`;
    return ads;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}

async function updateEvent(id,title, description, background, banner, start_date, end_date, activities) {
  try {
    await sql`UPDATE events SET title = ${title}, description = ${description}, background = ${background}, banner = ${banner}, start_date = ${start_date}, end_date = ${end_date}, activities = ${activities}  WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateAd function:", error.message);
    throw error;
  }
}

async function removeEvent(id) {
  try {
    await sql`DELETE FROM events WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in removeAd function:", error.message);
    throw error;
  }
}

module.exports = {insertEvent, getAllEvents, updateEvent, removeEvent}