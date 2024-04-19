const express = require("express");
const cors = require("cors");
const rootRouter = require("./routes/index");
const { customCorsOptions } = require("./middleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.options("/*", (_, res) => {
  res.sendStatus(200);
});

app.use("/api/v1", rootRouter);

app.listen(3000);
