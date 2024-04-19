const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const { customCorsOptions } = require("./middleware");

const app = express();

const options = [
  cors({
    origin: "https://paytm-9f39.vercel.app/",
    methods: "*",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
];

app.use(options);
app.use(express.json());
app.use(express.static("public"));

app.use("/api/v1", rootRouter);

app.listen(3000);
