const { sql } = require('../utils/db'); 
const { v4: uuidv4 } = require("uuid");

async function createUser(fullName, whatsAppNo, hashedPassword, dateOfBirth, location, Gender, LastLogin, profileImage) {
  const uniqueId = uuidv4();
  try {
    await sql`INSERT INTO Persons (id, fullName, whatsAppNo, hashPassward, dateOfBirth, location, Gender, LastLogin, profileImage)
              VALUES (${uniqueId} ,${fullName}, ${whatsAppNo}, ${hashedPassword}, ${dateOfBirth}, ${location}, ${Gender}, ${LastLogin}, ${profileImage})`;
  } catch (error) {
    console.error("Error in createUser function:", error.message);
    throw error; 
  }
}


async function getUserByWhatsAppNo(whatsAppNo) {
  try {
    const user = await sql`SELECT * FROM Persons WHERE whatsAppNo = ${whatsAppNo}`;
    return user;
  } catch (error) {
    console.error("Error in getUserByWhatsAppNo function:", error.message);
    throw error; 
  }
}

async function getUserById(id) {
  try {
    const user = await sql`SELECT * FROM Persons WHERE id = ${id}`;
    return user;
  } catch (error) {
    console.error("Error in getUserById function:", error.message);
    throw error; 
  } 
}

async function updateUser(id, fullName, whatsAppNo, hashedPassword, dateOfBirth, location, Gender, LastLogin, profileImage) {
  try {
    await sql`UPDATE Persons SET fullName = ${fullName}, whatsAppNo = ${whatsAppNo}, hashedPassword = ${hashedPassword}, dateOfBirth = ${dateOfBirth}, location = ${location}, Gender = ${Gender}, LastLogin = ${LastLogin}, profileImage = ${profileImage} WHERE id = ${id}`;
    } catch (error) {   
    console.error("Error in updateUser function:", error.message);
    throw error;
    }
}   

async function deleteUser(id) {
  try {
    await sql`DELETE FROM Persons WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in deleteUser function:", error.message);
    throw error; 
  }
}

async function updatePassword(whatsAppNo, newPassword) {
  try {
    await sql`UPDATE Persons SET hashPassword = ${newPassword} WHERE whatsAppNo = ${whatsAppNo}`;
  } catch (error) {
    console.error("Error in updatePassword function:", error.message);
    throw error;
  }
}


async function updateProfile( id, fullName, dateOfBirth, location, Gender, profileImage) {
  try {
    await sql`UPDATE Persons SET fullName = ${fullName}, dateOfBirth = ${dateOfBirth}, location = ${location}, Gender = ${Gender}, profileImage = ${profileImage} WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in updateProfile function:", error.message);
    throw error;
  }
}

async function deleteProfileById(id) {
  try {
    await sql`DELETE FROM Persons WHERE id = ${id}`;
  } catch (error) {
    console.error("Error in deleteProfile function:", error.message);
    throw error;
  }
}

module.exports = { createUser, getUserByWhatsAppNo, getUserById, updateUser, deleteUser, updatePassword,  updateProfile, deleteProfileById };