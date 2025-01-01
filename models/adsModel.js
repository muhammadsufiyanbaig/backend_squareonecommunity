const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

// Insert an ad with startAt and endAt
async function insertAd(Banner, CreatedBy, BrandId, DealId, startAt, endAt) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO Ads (id, Banner, CreatedBy, BrandId, DealId, startAt, endAt)
              VALUES (${uniqueId}, ${Banner}, ${CreatedBy}, ${BrandId}, ${DealId}, ${startAt}, ${endAt})`;
  } catch (error) {
    console.error("Error in insertAd function:", error.message);
    throw error;
  }
}

// Retrieve all ads
async function getAds() {
  try {
    const ads = await sql`SELECT * FROM Ads`;
    return ads;
  } catch (error) {
    console.error("Error in getAds function:", error.message);
    throw error;
  }
}

// Update an ad with startAt and endAt
async function updateAd(id, Banner, CreatedBy, BrandId, DealId, startAt, endAt) {
  try {
    await sql`
      UPDATE Ads 
      SET 
        Banner = COALESCE(${Banner}, Banner), 
        CreatedBy = COALESCE(${CreatedBy}, CreatedBy), 
        BrandId = COALESCE(${BrandId}, BrandId), 
        DealId = COALESCE(${DealId}, DealId), 
        startAt = COALESCE(${startAt}, startAt), 
        endAt = COALESCE(${endAt}, endAt)
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error("Error in updateAd function:", error.message);
    throw error;
  }
}

// Remove an ad by ID
async function removeAd(id) {
  try {
    await sql`DELETE FROM Ads WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in removeAd function:", error.message);
    throw error;
  }
}

// Retrieve ads that are running today
async function getRunningAdsToday() {
  try {
    const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
    const ads = await sql`
      SELECT * FROM Ads 
      WHERE startAt <= ${today}::DATE AND endAt >= ${today}::DATE`;
    return ads;
  } catch (error) {
    console.error("Error in getRunningAdsToday function:", error.message);
    throw error;
  }
}

module.exports = { insertAd, getAds, updateAd, removeAd, getRunningAdsToday };
