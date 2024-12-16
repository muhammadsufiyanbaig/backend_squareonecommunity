const { sql } = require("../utils/db");

// Function to create the "Persons" table
async function createUserTable() {
  try {
    await sql`
     CREATE TABLE IF NOT EXISTS Persons (
    id UUID PRIMARY KEY,
    whatsAppNo VARCHAR(20) NOT NULL,
    hashpassward TEXT NOT NULL,
    fullName VARCHAR(50),
    dateOfBirth VARCHAR(50),
    location TEXT,
    Gender VARCHAR(10),
    LastLogin TIMESTAMP,
    profileImage TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(whatsAppNo)
);

    `;
    console.log("Persons table created successfully or already exists.");
  } catch (error) {
    console.error("Error creating Persons table:", error.message);
  }
}

// Function to create the "Classes" table
async function createUserOtpTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS otp_persons (
    id UUID PRIMARY KEY,
    otp INT NOT NULL,
    whatsAppNo VARCHAR(20) NOT NULL REFERENCES Persons(whatsAppNo) ON DELETE CASCADE,
    sentAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expireAt TIMESTAMP
);
  `;
}

// Function to create the "Questions" table
async function createAdminTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS Admin (
    id UUID PRIMARY KEY,
    fullName VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    hashpassward TEXT NOT NULL
);
  `;
}

async function createBrandsTable() {
  await sql`
   CREATE TABLE IF NOT EXISTS BRANDS (
    id UUID PRIMARY KEY,
    brandName VARCHAR(50),
    category VARCHAR(50),
    logoImage TEXT,
    createdBy UUID REFERENCES Admin(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    BrandWhatsAppNo VARCHAR(20),
    Description TEXT,
    WorkingHours VARCHAR(100)
);
  `;
}

async function createDealsTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS DEALS (
    id UUID PRIMARY KEY,
    brandId UUID REFERENCES BRANDS(id),
    title TEXT,
    description TEXT,
    tagline TEXT,
    startDate TIMESTAMP,
    endDate TIMESTAMP,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Picture TEXT,
    Banner TEXT
);
  `;
}

async function createNotificationTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS Notification (
    id UUID PRIMARY KEY,
    title TEXT,
    description TEXT,
    identifier TEXT,
    data UUID REFERENCES DEALS(id)
);
  `;
}

async function createCodesTable() {
  await sql`
  CREATE TABLE IF NOT EXISTS codes (
    id UUID PRIMARY KEY,
    userId UUID REFERENCES Persons(id),
    BrandId UUID REFERENCES BRANDS(id),
    DealId UUID REFERENCES DEALS(id)
);
  `;
}

async function initializeDatabase() {
  try {
    await createUserTable();
    await createUserOtpTable();
    await createAdminTable();
    await createBrandsTable();
    await createDealsTable();
    await createNotificationTable();
    await createCodesTable();
    console.log("All tables created successfully!");
  } catch (error) {
    console.error("Error creating tables:", error.message);
  }
}

module.exports = { initializeDatabase };
