const { sql } = require("../utils/db");
const { v4: uuidv4 } = require("uuid");

async function createAdmin(fullName, email, hashedPassword) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO Admin (id, fullName, email, hashPassward)
              VALUES (${uniqueId} ,${fullName}, ${email}, ${hashedPassword})`;
  } catch (error) {
    console.error("Error in createAdmin function:", error.message);
    throw error; // Re-throw to propagate the error
  }
}

async function getAdminByEmail(email) {
  try {
    const user = await sql`SELECT * FROM Admin WHERE email = ${email}`;
    return user;
  } catch (error) {
    console.error("Error in getAdminByEmail function:", error.message);
    throw error;
  }
}

async function getAdminById(id) {
  try {
    const user = await sql`SELECT * FROM Admin WHERE id = ${id}`;
    return user;
  } catch (error) {
    console.error("Error in getAdminById function:", error.message);
    throw error;
  }
}

async function updateAdmin(fullName, email, hashedPassword) {
  try {
    await sql`UPDATE Admin SET fullName = ${fullName}, email = ${email}, hashPassword = ${hashedPassword} WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateUser function:", error.message);
    throw error;
  }
}

async function deleteAdmin(id) {
  try {
    await sql`DELETE FROM Admin WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in deleteUser function:", error.message);
    throw error;
  }
}


module.exports = { createAdmin, getAdminByEmail, getAdminById, updateAdmin, deleteAdmin}
