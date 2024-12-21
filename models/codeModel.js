const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function insertCode(code, userId, BrandId, DealId) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO codes (id, code, userId, BrandId, DealId)
              VALUES (${uniqueId}, ${code}, ${userId}, ${BrandId}, ${DealId})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error; 
  }
}

async function removeCode(id) {
  try {
    await sql`DELETE FROM codes WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in removeAd function:", error.message);
    throw error;
  }
}

module.exports = {insertCode, removeCode}
