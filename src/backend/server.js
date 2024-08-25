import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csvParser from "csv-parser"; // To read CSV files easily

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// 1. Define a list of all names
const allNames = ["Sharon", "Nicholas", "Anton", "David", "Eve"];
const passwords = ["a", "b", "c", "d", "e"];

// 2. Create a new CSV file with the current date
const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
const csvFilePath = path.join(__dirname, `data_${today}.csv`);

// 3. Initialize the CSV file with all names and 0 hours when the server starts
if (!fs.existsSync(csvFilePath)) {
  const header = "name,hours\n";
  const rows = allNames.map((name) => `${name},0`).join("\n") + "\n";
  fs.writeFileSync(csvFilePath, header + rows, "utf8");
  console.log(`Initialized CSV file: ${csvFilePath}`);
}

// 4. Function to read the current state of the CSV file
const readCsvFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const rows = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on("data", (data) => rows.push(data))
      .on("end", () => resolve(rows))
      .on("error", (err) => reject(err));
  });
};


app.post("/check-credentials", (req, res) => {
  const { name, password } = req.body;
  let pass = false;
  for (let i = 0; i < allNames.length; i++) {
    if (name == allNames[i] && password == passwords[i]) {
      pass = true;
      break;
    }
  }
  if (pass) {
    res.status(200).json({ message: "Pass" });
  } else {
    res.status(401).json({ message: "Fail" });
  }
});

// 5. Handle POST requests to increment hours
app.post("/add-row", async (req, res) => {
  const { name, hours } = req.body;
  const hoursToAdd = parseFloat(hours);

  if (!name || isNaN(hoursToAdd)) {
    return res.status(400).json({ error: "Invalid request" });
  }

  try {
    // Read the current CSV file
    const rows = await readCsvFile(csvFilePath);

    // Find the name and update the hours
    let nameFound = false;
    const updatedRows = rows.map((row) => {
      if (row.name === name) {
        nameFound = true;
        const updatedHours = parseFloat(row.hours) + hoursToAdd;
        return { name: row.name, hours: updatedHours.toString() };
      }
      return row;
    });

    if (!nameFound) {
      return res.status(404).json({ error: "Name not found" });
    }

    // Write the updated rows back to the CSV file
    const csvData =
      "name,hours\n" +
      updatedRows.map((row) => `${row.name},${row.hours}`).join("\n");
    fs.writeFileSync(csvFilePath, csvData, "utf8");

    res.status(200).json({ message: "Hours updated successfully" });
  } catch (error) {
    console.error("Error updating CSV file", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 6. Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
