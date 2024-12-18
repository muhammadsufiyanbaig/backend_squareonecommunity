const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createDeal(brandId, title, description, tagline, startDate, endDate, Picture, Banner) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO DEALS (id, brandId, title, description, tagline, startDate, endDate, Picture, Banner)
              VALUES (${uniqueId}, ${brandId}, ${title}, ${description}, ${tagline}, ${startDate}, ${endDate}, ${Picture}, ${Banner})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error; 
  }
}

async function getDealById(id) {
  try {
    const brand = await sql`SELECT * FROM DEALS WHERE id = ${id}`;
    return brand;
  } catch (error) {
    console.error("Error in getDealById function:", error.message);
    throw error;
  }
}

async function updateDeal(id, title, description, tagline, startDate, endDate, Picture, Banner) {
  try {
    await sql`UPDATE DEALS SET title = ${title}, description = ${description}, tagline = ${tagline}, startDate = ${startDate}, endDate = ${endDate}, Picture = ${Picture}, Banner = ${Banner}  WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateDeal function:", error.message);
    throw error;
  }
}

async function removeDeal(id) {
  try {
    await sql`DELETE FROM DEALS WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in deleteDeal function:", error.message);
    throw error;
  }
}

module.exports = {createDeal, getDealById, updateDeal, removeDeal}
