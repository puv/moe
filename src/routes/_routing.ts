import app from "../index";

const authRoute = require("./auth");
const indexRoute = require("./index");

// Middleware Routes
app.use("/auth", authRoute);
app.use("/", indexRoute);