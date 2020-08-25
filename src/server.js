const express = require("express");
const path = require("path");
const app = express();

// Initialise middlewares
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/generate", require("./routes/api/generate"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
