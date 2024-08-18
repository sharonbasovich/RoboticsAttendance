import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());

// Path to the CSV file
const csvFilePath = path.join(__dirname, "data.csv");

// Append a new row to the CSV file
app.post("/add-row", (req, res) => {
  const { name, hours } = req.body;
  const newRow = `${name},${hours}\n`;

  fs.appendFile(csvFilePath, newRow, (err) => {
    if (err) {
      console.error("Error writing to CSV file", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json({ message: "Row added successfully" });
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
