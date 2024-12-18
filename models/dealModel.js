const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createDeal(brandId, title, description, tagline, startDate, endDate, Picture, Banner) {
  const uniqueId = uuidv4(); // Generate a new UUID for each brand
  try {
    await sql`INSERT INTO DEALS (id, brandId, title, description, tagline, startDate, endDate, Picture, Banner)
              VALUES (${uniqueId}, ${brandId}, ${title}, ${description}, ${tagline}, ${startDate}, ${endDate}, ${Picture}, ${Banner})`;
  } catch (error) {
    console.error("Error in createBrand function:", error.message);
    throw error; // Re-throw to propagate the error
  }
}

async function getBrandById(id) {
  try {
    const brand = await sql`SELECT * FROM BRANDS WHERE id = ${id}`;
    return brand;
  } catch (error) {
    console.error("Error in getBrandById function:", error.message);
    throw error;
  }
}

async function updateBrand(brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours ) {
  try {
    await sql`UPDATE BRANDS SET brandName = ${brandName}, category = ${category}, logoImage = ${logoImage}, createdBy = ${createdBy}, BrandWhatsAppNo = ${BrandWhatsAppNo}, Description = ${Description}, WorkingHours = ${WorkingHours}  WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateBrand function:", error.message);
    throw error;
  }
}

async function deleteBrand(id) {
  try {
    await sql`DELETE FROM BRANDS WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in deleteBrand function:", error.message);
    throw error;
  }
}

module.exports = {createBrand, getBrandById, updateBrand, deleteBrand}
