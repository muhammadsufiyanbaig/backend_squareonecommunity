const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createComplaint(title, message, status, userId) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO support (id, title, message, status, userId)
              VALUES (${uniqueId}, ${title}, ${message}, ${status}, ${userId})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error; 
  }
}

async function getAllComplaint() {
  try {
    const complaint = await sql`SELECT 
    support.id,
    support.title,
    support.message,
    support.status,
    support.userId,
    persons.fullName,
    persons.whatsappNo
FROM 
    support
INNER JOIN 
    Persons
ON 
    support.userId = persons.id;
`;
    return complaint;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}

async function updateComplaint(id, status) {
  try {
    await sql`UPDATE support SET status = ${status} WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateAd function:", error.message);
    throw error;
  }
}

async function removeComplaint(id) {
  try {
    await sql`DELETE FROM support WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in removeAd function:", error.message);
    throw error;
  }
}

module.exports = {createComplaint, getAllComplaint, updateComplaint, removeComplaint}
