const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createDeal(brandId, title, description, tagline, startDate, endDate, Picture, Banner, type) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO DEALS (id, brandId, title, description, tagline, startDate, endDate, Picture, Banner, type )
              VALUES (${uniqueId}, ${brandId}, ${title}, ${description}, ${tagline}, ${startDate}, ${endDate}, ${Picture}, ${Banner}, ${type})`;
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

async function updateDeal(dealid, brandId, title, description, tagline, startDate, endDate, Picture, Banner, type) {
  try {
    // Using optional parameters for flexibility
    const result = await sql`
      UPDATE DEALS
      SET 
        brandId = COALESCE(${brandId}, brandId), 
        title = COALESCE(${title}, title), 
        description = COALESCE(${description}, description), 
        tagline = COALESCE(${tagline}, tagline), 
        startDate = COALESCE(${startDate}, startDate), 
        endDate = COALESCE(${endDate}, endDate), 
        Picture = COALESCE(${Picture}, Picture), 
        Banner = COALESCE(${Banner}, Banner),
        type = COALESCE(${type}, type)
      WHERE id = ${dealid};
    `;
    return result;
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
