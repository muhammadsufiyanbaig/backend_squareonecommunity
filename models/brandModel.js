const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createBrand(
  brandName,
  category,
  logoImage,
  createdBy,
  BrandWhatsAppNo,
  Description,
  WorkingHours
) {
  const uniqueId = uuidv4(); // Generate a new UUID for each brand
  try {
    await sql`INSERT INTO BRANDS (id, brandName, category, logoImage, createdBy, BrandWhatsAppNo, Description, WorkingHours)
              VALUES (${uniqueId}, ${brandName}, ${category}, ${logoImage}, ${createdBy}, ${BrandWhatsAppNo}, ${Description}, ${WorkingHours})`;
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

async function getAllBrandsWithDeals() {
  try {
    const brands = await sql`SELECT
    b.id AS "brandid",
    b."brandname",
    b."category",
    b."logoimage",
    b."createdby",
    b."createdat",
    b."brandwhatsappno",
    b."description",
    b."workinghours",
    json_agg(
        json_build_object(
            'dealid', d.id,
            'dealtitle', d.title,
            'dealdescription', d.description,
            'dealtagline', d.tagline,
            'startdate', d."startdate",
            'enddate', d."enddate",
            'createdat', d."createdat",
            'picture', d."picture",
            'banner', d."banner"
        )
    ) AS "deals"
FROM
    "brands" b
LEFT JOIN
    "deals" d
ON
    b.id = d."brandid"
GROUP BY
    b.id;
`;
    return brands;
  } catch (error) {
    console.error("Error in getAllBrandsWithDeals function:", error.message);
    throw error;
  }
}

async function updateBrand(
  id,
  brandName,
  category,
  logoImage,
  createdBy,
  BrandWhatsAppNo,
  Description,
  WorkingHours
) {
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

module.exports = { createBrand, getBrandById, getAllBrandsWithDeals ,updateBrand, deleteBrand };
