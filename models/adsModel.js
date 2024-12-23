const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function insertAd(Banner, CreatedBy, BrandId, DealId) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO Ads (id, Banner, CreatedBy, BrandId, DealId)
              VALUES (${uniqueId}, ${Banner}, ${CreatedBy}, ${BrandId}, ${DealId})`;
  } catch (error) {
    console.error("Error in createDeal function:", error.message);
    throw error; 
  }
}

async function getAds() {
  try {
    const ads = await sql`SELECT * FROM Ads`;
    return ads;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}

async function updateAd(id, Banner, CreatedBy, BrandId, DealId) {
  try {
    await sql`UPDATE Ads SET Banner = ${Banner}, CreatedBy = ${CreatedBy}, BrandId = ${BrandId}, DealId = ${DealId}  WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateAd function:", error.message);
    throw error;
  }
}

async function removeAd(id) {
  try {
    await sql`DELETE FROM Ads WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in removeAd function:", error.message);
    throw error;
  }
}

module.exports = {insertAd, getAds, updateAd, removeAd}
