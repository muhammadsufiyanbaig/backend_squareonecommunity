const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function insertEvent(
  title,
  description,
  background,
  banner,
  start_date,
  end_date,
  activities
) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO events (id, title, description, background, banner, start_date, end_date, activities)
              VALUES (${uniqueId}, ${title}, ${description}, ${background}, ${banner}, ${start_date}, ${end_date}, ${activities})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error;
  }
}

async function getAllEventsWithCounts() {
  try {
    const evnets = await sql`SELECT 
    e.id,
    e.title,
    e.description,
    e.background,
    e.banner,
    e.start_date,
    e.end_date,
    e.activities,
    COUNT(CASE WHEN ed.liked THEN 1 END) AS liked,
    COUNT(CASE WHEN ed.going THEN 1 END) AS interested
FROM 
    events e
LEFT JOIN 
    eventdetails ed
ON 
    e.id = ed.eventId
GROUP BY 
    e.id, e.title, e.description, e.background, e.banner, e.start_date, e.end_date, e.activities;
`;
    return evnets;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}
async function getAllEventsWithUserId(userId) {
  try {
    const events = await sql`SELECT 
    e.id,
    e.title,
    e.description,
    e.background,
    e.banner,
    e.start_date,
    e.end_date,
    e.activities,
    ed.liked,
    ed.going
FROM 
    events e
LEFT JOIN 
    eventdetails ed
ON 
    e.id = ed.eventId
WHERE 
    ed.userId = ${userId};

`;
    return events;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}

async function updateEventDetails(id, userId, eventId, liked, going) {
  try {
    const result = await sql`
      UPDATE eventdetails
      SET 
        userId = COALESCE(${userId}, userId), 
        eventId = COALESCE(${eventId}, eventId), 
        liked = COALESCE(${liked}, liked), 
        going = COALESCE(${going}, going)
      WHERE id = ${id};
    `;
    return result;
  } catch (error) {
    console.error("Error in updateEventDetails function:", error.message);
    throw error;
  }
}


async function updateEvent(
  id,
  title,
  description,
  background,
  banner,
  start_date,
  end_date,
  activities
) {
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

module.exports = {
  insertEvent,
  getAllEventsWithCounts,
  getAllEventsWithUserId,
  updateEventDetails,
  updateEvent,
  removeEvent,
};
