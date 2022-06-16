const express = require("express");
const authRoutes = require("./routes/authRoutes");
require("./services/passport");

const PORT = process.env.PORT || 5002;

const app = express();
authRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
